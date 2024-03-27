import {useLocation} from 'react-router-dom';
import React, {useContext, useEffect, useState} from 'react';
import {format} from 'date-fns';
import {uk} from 'date-fns/locale';
import useLanguagePrefix from '../../services/languagePrefix';
import MetaTags from '../../components/Common/MetaTags';
import {useAdvertisementViewQuery} from '../../services/api';
import {LoadingContext} from '../../context/loading-context';
import ReadMore from '../ReadMore/ReadMore';
import './AdvertisementView.scss';
import SanitizedHtml from "../../components/Common/SanitizedHtml.jsx";
import Pager from "../../components/Pager/Pager.jsx";
import useTotalPages from "../../services/pager.jsx";

export default function AdvertisementView() {
    const [currentPage, setCurrentPage] = useState(0);
    const languagePrefix = useLanguagePrefix();
    const {data, isFetching} = useAdvertisementViewQuery({page: `page_1?page=${currentPage}`});
    const totalPages = useTotalPages(
        data?.meta?.pager?.count,
        data?.meta?.pager?.configurations?.items_per_page,
    );
    const {setLoadingValue} = useContext(LoadingContext);
    const handlePage = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        if (!isFetching) {
            setLoadingValue({AdvertisementView: true});
        } else {
            setLoadingValue({AdvertisementView: false});
        }
    }, [isFetching]);
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <div className="container">
            <MetaTags type="view" data={data} viewUrl={currentPath}/>
            <h2 className="advertisement-title">
                {(languagePrefix === 'en' && 'Announcements') || 'Оголошення'}
            </h2>
            <div className="advertisement-view">
                {data?.data?.map((item, index) => (
                    <div key={index} className="advertisement-view__item">
                        <a
                            className="advertisement-view__item-title"
                            href={`/${languagePrefix}${item?.path?.alias}`}
                        >
                            {item.title}
                        </a>
                        {item?.field_content?.map((items) => (
                            <p className="advertisement-view__item-description">
                                <SanitizedHtml htmlString={items?.field_body?.processed}/>
                            </p>
                        ))}
                        <div className="advertisement-view__item-date">
                            {(languagePrefix === 'en' && 'Date of posting the announcement: ') ||
                                'Дата розміщення оголошення: '}
                            <span>
                {languagePrefix === 'uk' && (
                    <div className="date_field">
                        {format(new Date(item.created), 'dd MMMM, yyyy', {
                            locale: uk,
                        })}
                    </div>
                )}
                                {languagePrefix === 'en' && (
                                    <div className="date_field">
                                        {format(new Date(item.created), 'dd MMMM, yyyy')}
                                    </div>
                                )}
              </span>
                        </div>
                        <a
                            className="advertisement-view__item-link"
                            href={`/${languagePrefix}${item?.path?.alias}`}
                        >
                            <ReadMore/>
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
                                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                                />
                            </svg>
                        </a>
                    </div>
                ))}
            </div>
            {totalPages > 1 &&
                <Pager totalPages={totalPages} onPageChange={handlePage}/>}
        </div>
    );
}
