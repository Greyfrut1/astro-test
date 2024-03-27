import React, {useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useEducationCatalogViewQuery, useEducationViewQuery} from '../services/api';
import ExposedFilterCatalog from './ExposedFilterCatalog';
import useLanguagePrefix from '../services/languagePrefix';
import MetaTags from '../components/Common/MetaTags';
import '../pages/EducationalPrograms/EducationalProgramsPage.scss';
import {LoadingContext} from '../context/loading-context';
import Pager from "../components/Pager/Pager.jsx";

export default function EducationalProgramsView() {
    const [filterValues, setFilterValues] = useState({
        title: '',
        page: '',
        field_form_educations_value: 'All',
        field_educational_level_target_id: 'All',
        field_validity_value: 'All',
        field_faculty_target_id: 'All',
    });
    const languagePrefix = useLanguagePrefix();
    const [submitClicked, setSubmitClicked] = useState(false);
    const {title} = filterValues;
    const {page} = filterValues;
    const {field_form_educations_value} = filterValues;
    const {field_educational_level_target_id} = filterValues;
    const {field_validity_value} = filterValues;
    const {field_faculty_target_id} = filterValues;
    const {
        data: educationalProgramsData,
        fetchData,
        isFetching,
    } = useEducationViewQuery({
        title: `${title}`,
        page: `${page}`,
        field_form_educations_value: `${field_form_educations_value}`,
        field_educational_level_target_id: `${field_educational_level_target_id}`,
        field_validity_value: `${field_validity_value}`,
        field_faculty_target_id: `${field_faculty_target_id}`,
    });
    useEffect(() => {
        if (submitClicked) {
            fetchData();
            setSubmitClicked(false);
        }
    }, [educationalProgramsData, submitClicked, fetchData]);

    const handleFilterChange = (filter) => {
        setFilterValues(filter);
    };
    const {data: educationalProgramsTitle} = useEducationCatalogViewQuery();
    const location = useLocation();
    const currentPath = location.pathname;
    const {setLoadingValue} = useContext(LoadingContext);
    const handlePage = (currentPage) => {
        setFilterValues({
            title: `${title}`,
            page: `${currentPage}`,
            field_form_educations_value: `${field_form_educations_value}`,
            field_educational_level_target_id: `${field_educational_level_target_id}`,
            field_validity_value: `${field_validity_value}`,
            field_faculty_target_id: `${field_faculty_target_id}`,
        });
        window.scrollTo(0, 0);
    };
    useEffect(() => {
        if (!isFetching) {
            setLoadingValue({EducationalProgramsView: true});
        } else {
            setLoadingValue({EducationalProgramsView: false});
        }
    }, [isFetching]);
    return (
        <div className="education-catalog-page container">
            <MetaTags type="view" data={educationalProgramsTitle} viewUrl={currentPath}/>
            <h2 className="education-catalog-page__title">
                {(languagePrefix === 'en' &&
                        'Educational Programs Catalog and Selective Educational Components Catalog') ||
                    'Каталог освітніх програм та вибіркових освітніх компонентів'}
            </h2>
            <div className="education-catalog-filter">
                <ExposedFilterCatalog onFilterChange={handleFilterChange}/>
            </div>
            <table className="education-catalog-table">
                <thead className="education-catalog-table__head">
                <tr>
                    <th className="w-2/6">
                        {(languagePrefix === 'en' && 'Title') || 'Назва освітньої програми'}
                    </th>
                    <th className="w-2/12">
                        {(languagePrefix === 'en' && 'Form of study') || 'Форма навчання'}
                    </th>
                    <th className="w-3/12">
                        {(languagePrefix === 'en' && 'Qualification level') || 'Рівень кваліфікації'}
                    </th>
                    <th className="w-3/12">{(languagePrefix === 'en' && 'Faculty') || 'Факультет'}</th>
                </tr>
                </thead>
                <tbody className="education-catalog-table__body">
                {(educationalProgramsData?.rows?.length > 0 &&
                    educationalProgramsData?.rows?.map((item, index) => (
                        <tr key={index} className="education-catalog-table__body-row">
                            <td dangerouslySetInnerHTML={{__html: item?.title}}/>
                            <td>{item?.field_form_educations}</td>
                            <td dangerouslySetInnerHTML={{__html: item?.field_educational_level}}/>
                            <td dangerouslySetInnerHTML={{__html: item?.field_faculty}}/>
                        </tr>
                    ))) || (
                    <tr>
                        <td>{(languagePrefix === 'en' && 'No results') || 'Немає результатів'}</td>
                    </tr>
                )}
                </tbody>
            </table>
            {educationalProgramsData?.pager?.total_pages > 1 &&
                <Pager totalPages={educationalProgramsData?.pager?.total_pages} onPageChange={handlePage}/>}
        </div>
    );
}
