import React, {useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import useLanguagePrefix from '../../services/languagePrefix';
import MetaTags from '../../components/Common/MetaTags';
import './PhotoAlbumsView.scss';
import {usePhotoAlbumsQuery} from '../../services/api';
import {LoadingContext} from '../../context/loading-context';
import Pager from "../../components/Pager/Pager";
import useTotalPages from "../../services/pager";

export default function PhotoAlbumsView() {
    const [currentPage, setCurrentPage] = useState(0);
    const {data: albumsData, isFetching} = usePhotoAlbumsQuery({page: currentPage});
    const languagePrefix = useLanguagePrefix();
    const {setLoadingValue} = useContext(LoadingContext);
    const totalPages = useTotalPages(
        albumsData?.meta?.pager?.count,
        albumsData?.meta?.pager?.configurations?.items_per_page,
    );
    const handlePage = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        if (!isFetching) {
            setLoadingValue({PhotoAlbumsView: true});
        } else {
            setLoadingValue({PhotoAlbumsView: false});
        }
    }, [isFetching]);
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <>
            <MetaTags type="view" data={albumsData} viewUrl={currentPath}/>
            <div className="albums container">
                <div className="albums-view">
                    {albumsData?.data?.map((item, index) => (
                        <div className="albums-card" key={index}>
                            <a className="albums-card__title" href={`/${languagePrefix}${item?.path?.alias}`}>
                                {item?.title}
                            </a>
                            <img
                                className="albums-card__img"
                                src={item?.field_image?.image_style_uri?.small_large_photoalbums_134_172_}
                                alt={item?.field_image?.meta?.alt}
                            />
                        </div>
                    ))}
                </div>
                {totalPages > 1 && <Pager totalPages={totalPages} onPageChange={handlePage}/>}
            </div>
        </>
    );
}
