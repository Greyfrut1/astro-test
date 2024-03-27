import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
import {useParagraphQuery} from '../../services/api';
import YoutubeEmbed from '../Common/YoutubeEmbed';
import './Paragraph.scss';
import {LoadingContext} from '../../context/loading-context';
import FilePreview from "../Common/FilePreview.jsx";

export default function Paragraph({target_id, target_revision_id, target_uuid}) {
    const {data: paragraph, isFetching} = useParagraphQuery({
        targetUuid: `${target_uuid}`,
        targetRevisionId: target_revision_id
    });
    const {setLoadingValue} = useContext(LoadingContext);
    useEffect(() => {
        if (!isFetching) {
            setLoadingValue({[`Paragraph${paragraph?.id?.[0]?.value}`]: true});
        } else if (paragraph) {
            setLoadingValue({[`Paragraph${paragraph?.id?.[0]?.value}`]: false});
        }
    }, [isFetching, paragraph]);
    const [isActive, setIsActive] = useState(false);

    const [isActiveDropdown, setisActiveDropdown] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    const handleClickDropdown = () => {
        setisActiveDropdown(!isActiveDropdown);
    };
    return (
        <>
            {paragraph?.data?.relationships?.paragraph_type?.data?.meta?.drupal_internal__target_id === 'section' && paragraph?.data?.attributes?.field_title && (
                <div className="section-wrapper">
                    <div onClick={handleClick} className={`section ${isActive ? 'open' : ''}`}>
                        <div className="plus"/>
                        <div className="section-title">{paragraph?.data?.attributes?.field_title}</div>
                    </div>
                    {paragraph?.data?.relationships?.field_subsection?.data?.length > 0 && (
                        <div className={`subsection-wrapper ${isActive ? 'subsection-wrapper-active' : ''}`}>
                            {paragraph?.data?.relationships?.field_subsection?.data?.map((item, index) => (
                                <div key={index} className="subsection-item">
                                    <Paragraph target_uuid={item?.id}
                                               target_revision_id={item?.meta?.target_revision_id} target_id={item?.target_id}/>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {paragraph?.data?.relationships?.paragraph_type?.data?.meta?.drupal_internal__target_id == 'dropdown' && paragraph?.data?.attributes?.field_title_dropdown && (
                <>
                    <div onClick={handleClickDropdown} className="dropdown">
                        <div className={`dropdown-arrow ${isActiveDropdown ? 'dropdown-arrow-active' : ''}`}>
                        </div>
                        <div className="dropdown-title">{paragraph?.data?.attributes?.field_title_dropdown}</div>
                    </div>
                    {paragraph?.data?.relationships?.field_dropdown_info?.data?.map((item, index) => (
                        <div
                            key={index}
                            className={`dropdown_info ${isActiveDropdown ? 'dropdown_info-active' : ''}`}
                        >
                            <Paragraph target_uuid={item?.id} target_revision_id={item?.meta?.target_revision_id} target_id={item?.target_id}/>
                        </div>
                    ))}
                </>
            )}
            {paragraph?.data?.relationships?.paragraph_type?.data?.meta?.drupal_internal__target_id == 'document_body' && (
                <div className="clearfix-document_body">
                    <div className="document_body">
                        <p
                            className="full-project__description"
                            dangerouslySetInnerHTML={{
                                __html: paragraph?.data?.attributes?.field_body?.processed,
                            }}
                        />

                    </div>
                </div>
            )}
            {paragraph?.data?.relationships?.paragraph_type?.data?.meta?.drupal_internal__target_id == 'link' && (
                <>
                    {paragraph?.data?.attributes?.field_link.map((link, index) => (
                        <div className="dropdown-item" key={index}>
                            <div className="dropdown-arrow">
                            </div>
                            <a href={link.full_url} target="_blank">
                                {link.title}
                            </a>
                        </div>
                    ))}
                </>
            )}
            {paragraph?.data?.relationships?.paragraph_type?.data?.meta?.drupal_internal__target_id == 'youtube_link' && (
                <div className="paragraphs-video">
                    {paragraph?.data?.attributes?.field_youtube_link?.map((link) => (
                        <YoutubeEmbed embedId={link?.uri}/>
                    ))}
                </div>
            )}
            {paragraph?.data?.relationships?.paragraph_type?.data?.meta?.drupal_internal__target_id == 'image_link' && (
                <a href={paragraph?.data?.attributes?.field_link_to_partner?.uri} target="_blank">
                    <img src={paragraph?.data?.attributes?.field_image?.url} alt={paragraph?.field_image?.alt}/>
                </a>
            )}
            {paragraph?.data?.relationships?.paragraph_type?.data?.meta?.drupal_internal__target_id == 'file_preview' && (
                <>
                    <FilePreview uuid={paragraph?.data?.id} />
                </>
            )}
        </>
    );
}

Paragraph.propTypes = {
    target_id: PropTypes.number.isRequired,
};
