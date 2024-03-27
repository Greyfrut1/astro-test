import {useLocation} from 'react-router-dom';
import React, {useContext, useEffect, useState} from 'react';
import StaffView from './StaffView/StaffView';
import MetaTags from '../components/Common/MetaTags';
import {useStaffQuery} from '../services/api';
import {LoadingContext} from '../context/loading-context';
import useTotalPages from "../services/pager.jsx";
import Pager from "../components/Pager/Pager.jsx";

export default function RectorateView() {
    const [currentPage, setCurrentPage] = useState(0);
    const {data: rectorateViewsData, isFetching} = useStaffQuery({endpoint: `page_1?page=${currentPage}`});
    const totalPages = useTotalPages(
        rectorateViewsData?.meta?.pager?.count,
        rectorateViewsData?.meta?.pager?.configurations?.items_per_page,
    );
    const location = useLocation();
    const currentPath = location.pathname;
    const {setLoadingValue} = useContext(LoadingContext);
    const handlePage = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        if (!isFetching) {
            setLoadingValue({RectorateView: true});
        } else {
            setLoadingValue({RectorateView: false});
        }
    }, [isFetching]);
    return (
        <>
            <MetaTags type="view" data={rectorateViewsData} viewUrl={currentPath}/>
            <StaffView data={rectorateViewsData}/>
            {totalPages > 1 &&
                <Pager totalPages={totalPages} onPageChange={handlePage}/>}
        </>
    );
}
