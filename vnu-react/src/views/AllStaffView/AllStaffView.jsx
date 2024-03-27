import {useLocation} from 'react-router-dom';
import React, {useContext, useEffect, useState} from 'react';
import MetaTags from '../../components/Common/MetaTags';
import {useStaffViewQuery} from '../../services/api';
import ContactInformation from '../../components/ContactInformation/ContactInformation.jsx';
import useLanguagePrefix from '../../services/languagePrefix';
import {LoadingContext} from '../../context/loading-context';
import './AllStaffView.scss';
import useTotalPages from "../../services/pager.jsx";
import Pager from "../../components/Pager/Pager.jsx";
import defaultUserImage from "../../assets/default-user.jpg";
import {ColorRing} from "react-loader-spinner";

export default function AllStaffView() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const {data: staffViewsFilterData, isFetching} = useStaffViewQuery({name: searchQuery, page: currentPage});
    const location = useLocation();
    const currentPath = location.pathname;
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.elements.search.value);
    };
    const languagePrefix = useLanguagePrefix();
    const {setLoadingValue} = useContext(LoadingContext);

    const handlePage = (page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        if (!isFetching) {
            setLoadingValue({AllStaffView: true});
        }
    }, [isFetching]);
    const totalPages = useTotalPages(
        staffViewsFilterData?.meta?.pager?.count,
        staffViewsFilterData?.meta?.pager?.configurations?.items_per_page,
    );
    return (
        <>
            <MetaTags type="view" data={staffViewsFilterData} viewUrl={currentPath}/>
            <div className="staff-page-view container">
                <form className="staff-search-form" onSubmit={handleSubmit}>
                    <input
                        placeholder={(languagePrefix === 'en' && 'Search') || 'Пошук'}
                        className="enter"
                        type="text"
                        name="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="35"
                        height="28"
                        viewBox="0 0 50 50"
                        fill="currentColor"
                    >
                        <path
                            d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/>
                    </svg>
                </form>
                <div className="staff-view md:gap-10 sm:grid-cols-1">
                    {isFetching && <ColorRing
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#561111', '#561111', '#561111', '#561111', '#561111']}
                    />}
                    {!isFetching && staffViewsFilterData?.data?.length > 0 ? (
                        staffViewsFilterData.data.map((item, index) => (
                            <div className="staff-item flex flex-col" key={index}>
                                <img
                                    src={
                                        typeof item?.field_image?.image_style_uri?.small_large_photoalbums_134_172_ !== 'undefined'
                                            ? item?.field_image?.image_style_uri?.small_large_photoalbums_134_172_
                                            : defaultUserImage
                                    }
                                    alt={item?.field_image?.meta?.alt}
                                />
                                <h2 className="staff-item__title">
                                    <a href={`/${languagePrefix}${item?.path?.alias}`}>{item?.title}</a>
                                </h2>
                                <p className="staff-item__position">{item?.field_position_and_rank}</p>
                                <ContactInformation data={item} type="views"/>
                            </div>
                        ))
                    ) : (!isFetching &&
                        <p className="no-result">
                            {(languagePrefix === 'en' && 'No results found') || 'Немає результатів пошуку'}
                        </p>
                    )}
                </div>
                {totalPages > 0 && <Pager totalPages={totalPages} onPageChange={handlePage}/>}
            </div>
        </>
    );
}
