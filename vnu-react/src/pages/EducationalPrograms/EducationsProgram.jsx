import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useEducationCatalogPageQuery} from '../../services/api';
import useLanguagePrefix from '../../services/languagePrefix';
import {LoadingContext} from '../../context/loading-context';
import {AliasContext} from '../../context/alias';
import MetaTags from '../../components/Common/MetaTags';
import EntityTitle from '../../components/EntityTitle';
import './EducationsProgram.scss';
import SanitizedHtml from '../../components/Common/SanitizedHtml';
import Paragraph from '../../components/Paragraph/Paragraph';
import Disciplines from '../../components/Disciplines/Disciplines.jsx';
import FileComponent from "../../components/FileComponent.jsx";

export default function EducationsProgram() {
    const {alias} = useParams();
    const {data: educationalProgramData, isFetching} = useEducationCatalogPageQuery({
        page: `${alias}`,
    });
    const langPrefix = useLanguagePrefix();
    const {setLoadingValue} = useContext(LoadingContext);
    const {updateAlias} = useContext(AliasContext);
    useEffect(() => {
        if (!isFetching) {
            updateAlias(educationalProgramData?.title?.[0]?.value);
            setLoadingValue({EducationalProgramsPage: true});
        } else {
            setLoadingValue({EducationalProgramsPage: false});
        }
    }, [isFetching]);
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    return (
        <div className="educations-program container">
            <MetaTags type="view" data={educationalProgramData}/>
            <h2 className="educations-program__title">{educationalProgramData?.title?.[0]?.value}</h2>
            <div className="educations-program__main">
                <div className="educations-program__main-left">
                    <div className="section-wrapper">
                        <div onClick={handleClick} className={`section ${isActive ? 'open' : ''}`}>
                            <div className="plus"/>
                            <div className="section-title">{langPrefix === 'en' ? 'Curriculum' : 'Перелік нормативних освітніх компонентів'}</div>
                        </div>
                        <div className={`subsection-wrapper ${isActive ? 'subsection-wrapper-active' : ''}`}>
                            <div className="subsection-item">
                                <SanitizedHtml htmlString={educationalProgramData?.field_regulatory_disciplines?.[0]?.processed}/>
                            </div>
                        </div>
                    </div>
                    {educationalProgramData?.field_content?.[0]?.target_id && (
                        <div className="paragraphs">
                            {educationalProgramData?.field_content?.map((item, index) => (
                                <Paragraph key={index} target_uuid={item?.target_uuid}
                                           target_revision_id={item?.target_revision_id} target_id={item?.target_id}/>
                            ))}
                        </div>
                    )}
                    <Disciplines
                        titleSection={langPrefix === 'en' ? 'Actual disciplines' : 'Актуальні дисципліни'}
                        typeDisplay={'actual'}
                        idNode={educationalProgramData?.nid?.[0]?.value}
                    />
                    <Disciplines
                        titleSection={langPrefix === 'en' ? 'Archive disciplines' : 'Архів дисциплін'}
                        typeDisplay={'old'}
                        idNode={educationalProgramData?.nid?.[0]?.value}
                    />
                </div>

                <div className="educations-program__main-right">
                    <h3 className="educations-program__main-right__title">
                        {(langPrefix === 'en' && 'Profile of the educational program') ||
                            'Профіль освітньої програми'}
                    </h3>
                    {educationalProgramData?.field_validity?.[0]?.value && (
                        <div className="educations-program__main-right__point">
                            <h4>{(langPrefix === 'en' && 'Validity') || 'Чинність'}</h4>
                            <hr/>
                            <p>{educationalProgramData.field_validity?.[0].value}</p>
                        </div>
                    )}
                    {educationalProgramData?.field_document_programs?.[0]?.url && (
                        <div className="educations-program__main-right__point">
                            {educationalProgramData?.field_document_programs?.map((item) => (
                                <div className="file">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                        />
                                    </svg>

                                    <FileComponent url={item?.target_id} title={item?.description}/>
                                </div>
                            ))}
                        </div>
                    )}
                    {educationalProgramData?.field_course_of_study?.[0]?.value && (
                        <div className="educations-program__main-right__point">
                            <h4>{(langPrefix === 'en' && 'Course of study') || 'Курс навчання'}</h4>
                            <hr/>
                            <SanitizedHtml
                                htmlString={educationalProgramData.field_course_of_study?.[0].processed}
                            />
                        </div>
                    )}
                    {educationalProgramData?.field_field_of_knowledge?.[0]?.value && (
                        <div className="educations-program__main-right__point">
                            <h4>{(langPrefix === 'en' && 'Field of knowledge') || 'Галузь знань'}</h4>
                            <hr/>
                            <p>{educationalProgramData?.field_field_of_knowledge?.[0]?.value}</p>
                        </div>
                    )}
                    {educationalProgramData?.field_description?.[0]?.value && (
                        <div className="educations-program__main-right__point">
                            <h4>{(langPrefix === 'en' && 'Qualifications') || 'Кваліфікація'}</h4>
                            <hr/>
                            <SanitizedHtml htmlString={educationalProgramData.field_description?.[0].processed}/>
                        </div>
                    )}
                    {educationalProgramData?.field_form_educations?.[0]?.value && (
                        <div className="educations-program__main-right__point">
                            <h4>{(langPrefix === 'en' && 'Form education') || 'Форма навчання'}</h4>
                            <hr/>
                            <p>{educationalProgramData.field_form_educations?.[0]?.value}</p>
                        </div>
                    )}
                    {educationalProgramData?.field_educational_level?.[0]?.target_uuid && (
                        <div className="educations-program__main-right__point">
                            <h4>{(langPrefix === 'en' && 'Level') || 'Рівень'}</h4>
                            <hr/>
                            {educationalProgramData.field_educational_level?.[0].target_uuid && (
                                <p>
                                    <EntityTitle
                                        endpoint={`taxonomy_term/educational_level/${educationalProgramData?.field_educational_level?.[0]?.target_uuid}`}
                                    />
                                </p>
                            )}
                        </div>
                    )}
                    {educationalProgramData?.field_number_of_credits?.[0]?.value && (
                        <div className="educations-program__main-right__point">
                            <h4>{(langPrefix === 'en' && 'Number of credits') || 'Кількість кредитів'}</h4>
                            <hr/>
                            <SanitizedHtml
                                htmlString={educationalProgramData.field_number_of_credits?.[0].processed}
                            />
                        </div>
                    )}
                    {educationalProgramData?.field_special_qualification_lvl?.[0]?.value && (
                        <div className="educations-program__main-right__point">
                            <h4>
                                {(langPrefix === 'en' && 'Special qualification level') ||
                                    'Рівень кваліфікації відповідно до Національної рамки кваліфікацій, Європейської рамки кваліфікацій для навчання впродовж життя'}
                            </h4>
                            <hr/>
                            <SanitizedHtml
                                htmlString={educationalProgramData.field_special_qualification_lvl?.[0].processed}
                            />
                        </div>
                    )}
                    {educationalProgramData?.field_specialty?.[0]?.value && (
                        <div className="educations-program__main-right__point">
                            <h4>{(langPrefix === 'en' && 'Specialty') || 'Спеціальність'}</h4>
                            <hr/>
                            <SanitizedHtml htmlString={educationalProgramData.field_specialty?.[0].processed}/>
                        </div>
                    )}
                    {educationalProgramData?.field_employment_opportunities?.[0]?.value && (
                        <div className="educations-program__main-right__point">
                            <h4>
                                {(langPrefix === 'en' && 'Employment opportunities') ||
                                    'Можливість працевлаштування'}
                            </h4>
                            <hr/>
                            <SanitizedHtml
                                htmlString={educationalProgramData.field_employment_opportunities?.[0].processed}
                            />
                        </div>
                    )}
                    {educationalProgramData?.field_uniqueness_and_specificity?.[0]?.value && (
                        <div className="educations-program__main-right__point">
                            <h4>
                                {(langPrefix === 'en' && 'Uniqueness and specificity') ||
                                    'Унікальність і регіональна специфіка'}
                            </h4>
                            <hr/>
                            <SanitizedHtml
                                htmlString={educationalProgramData.field_uniqueness_and_specificity?.[0].processed}
                            />
                        </div>
                    )}
                    {educationalProgramData?.field_accreditation_status?.[0]?.value && (
                        <div className="educations-program__main-right__point">
                            <h4>
                                {(langPrefix === 'en' && 'Accredited (educational program/specialty)') ||
                                    'Акредитована (освітня програма/спеціальність)'}
                            </h4>
                            <hr/>
                            <SanitizedHtml
                                htmlString={educationalProgramData.field_accreditation_status?.[0].processed}
                            />
                        </div>
                    )}
                    {educationalProgramData?.field_faculty?.[0]?.target_uuid && (
                        <div className="educations-program__main-right__point">
                            <h4>{(langPrefix === 'en' && 'Faculty') || 'Факультет'}</h4>
                            <hr/>
                            <p>
                                {educationalProgramData?.field_faculty?.[0]?.target_uuid && (
                                    <EntityTitle
                                        endpoint={`node/faculty/${educationalProgramData?.field_faculty?.[0]?.target_uuid}`}
                                    />
                                )}
                            </p>
                        </div>
                    )}
                    {educationalProgramData?.field_guarantor?.[0]?.target_uuid && (
                        <div className="educations-program__main-right__point">
                            <h4>
                                {(langPrefix === 'en' &&
                                        'Guarantor of the educational programme, contact person') ||
                                    'Гарант освітньої програми, контактна особа'}
                            </h4>
                            <hr/>
                            <p>
                                {educationalProgramData?.field_guarantor?.[0]?.target_uuid && (
                                    <EntityTitle
                                        endpoint={`node/staff/${educationalProgramData?.field_guarantor?.[0]?.target_uuid}`}
                                    />
                                )}
                            </p>
                        </div>
                    )}
                    {educationalProgramData?.field_questionnaire_for_proposal?.[0]?.value && (
                        <div className="educations-program__main-right__point">
                            <h4>
                                {(langPrefix === 'en' && 'Comments and suggestions from stakeholders') ||
                                    'Зауваження та пропозиції стейкхолдерів'}
                            </h4>
                            <hr/>
                            <a
                                href={`mailto:${educationalProgramData.field_questionnaire_for_proposal?.[0]?.value}`}
                            >
                                {educationalProgramData.field_questionnaire_for_proposal?.[0]?.value}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
