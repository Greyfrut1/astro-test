import React, {useRef, useState} from 'react';
import {format} from 'date-fns';
import {uk} from 'date-fns/locale';
import {useWindowSize} from 'react-use';
import NewsBannerBlock from '../../blocks/NewsBannerBlock/NewsBannerBlock';
import TypeFilterButtons from '../../views/TypeFilterButtons/TypeFilterButtons';
import CalendarFilter from '../../views/Calendar/CalendarFilter';
import {useNewsViewBlockQuery} from '../../services/api';
import useLanguagePrefix from '../../services/languagePrefix';
import './NewsPage.scss';
import MetaTags from '../../components/Common/MetaTags';
import useTotalPages from "../../services/pager.jsx";
import Pager from "../../components/Pager/Pager.jsx";
import {ColorRing} from 'react-loader-spinner'


export default function NewsPage() {
    const {width} = useWindowSize();

    const langPrefix = useLanguagePrefix();

    const currentPath = location.pathname;

    const [typeInformation, setTypeInformation] = useState('All');
    const [selectedDate, setSelectedDate] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    // Function to format a date into a long format (YYYY-MM-DD).
    const formatLongDate = (locale, date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleTypeInformation = (type) => {
        setTypeInformation(type);
    };
    const handleDateChange = (date) => {
        const formattedDate = date ? formatLongDate(uk, date) : null;
        setSelectedDate(formattedDate);
    };

    const handleClear = () => {
        setTypeInformation('All');
        setSelectedDate('');
    };
    const container = useRef(null);
    const executeScroll = () => container.current.scrollIntoView();
    const handlePage = (page) => {
        setCurrentPage(page);

        if (container) {
            executeScroll();
        }
    };

    const {data, isFetching} = useNewsViewBlockQuery({
        currentPage: `${currentPage}`,
        category: `${typeInformation}`,
        date: `${selectedDate}`,
    });
    const totalPages = useTotalPages(
        data?.meta?.pager?.count,
        data?.meta?.pager?.configurations?.items_per_page,
    );
    return (
        <>
            <MetaTags type="view" data={data} viewUrl={currentPath}/>
            <div className="news">
                <NewsBannerBlock/>
                <div className="container" ref={container}>
                    <div className="menu-dynamic-data-blocks">
                        <h1 className="menu-dynamic-data-blocks__title">
                            {(langPrefix === 'en' && 'All news') || 'Усі новини'}
                        </h1>
                        <div className="menu-dynamic-data-blocks__left">
                            <TypeFilterButtons handleTypeInformation={handleTypeInformation}/>
                            <CalendarFilter selectedDate={selectedDate} onDateChange={handleDateChange}/>
                            <button className="button-clear" onClick={() => handleClear()}>
                                <span>{(langPrefix === 'en' && 'Clear') || 'Очистити'}</span>
                            </button>
                        </div>
                    </div>
                    <div className="dynamic-data-blocks view-content">
                        {isFetching && <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#561111', '#561111', '#561111', '#561111', '#561111']}
                        />}
                        {!isFetching && data?.data?.length && (
                            <>
                                {data?.data?.map((item, index) => (
                                    <div className="news-card" key={index}>
                                        <div className="news-card-top">
                                            <img
                                                src={
                                                    width < 600
                                                        ? item?.field_image?.image_style_uri?.main_news_adaptive
                                                        : item?.field_image?.image_style_uri?.newsblockcard
                                                }
                                                alt={item?.field_image?.meta?.alt}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="news-card-bottom">
                                            {langPrefix === 'uk' && (
                                                <div className="date_field">
                                                    {format(new Date(item?.created), 'dd MMMM, yyyy', {locale: uk})}
                                                </div>
                                            )}
                                            {langPrefix === 'en' && (
                                                <div className="date_field">
                                                    {format(new Date(item?.created), 'dd MMMM, yyyy')}
                                                </div>
                                            )}
                                            <div className="teaser_title">
                                                <a href={`/${langPrefix}${item?.path?.alias}`}>{item.title}</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) || (!isFetching &&
                            <div className="empty-dynamic-container">
                                {langPrefix === 'en' && <h3>No news found with the selected filters.</h3>}
                                {langPrefix === 'uk' && <h3>За вибраними фільтрами новин не знайдено.</h3>}
                            </div>
                        )}
                    </div>
                    {totalPages > 0 && <Pager totalPages={totalPages} onPageChange={handlePage}/>}
                </div>
            </div>
        </>
    );
}
