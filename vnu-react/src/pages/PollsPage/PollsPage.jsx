import React, { useContext, useEffect, useState } from 'react';
import { usePollsPageQuery } from '../../services/api';
import Polls from '../../components/Polls/Polls';
import './PollsPage.scss';
import { LoadingContext } from '../../context/loading-context';
import useLanguagePrefix from '../../services/languagePrefix';
import Pager from "../../components/Pager/Pager.jsx";
import useTotalPages from "../../services/pager.jsx";

export default function PollsPage() {
    const { setLoadingValue } = useContext(LoadingContext);
    const [currentPage, setCurrentPage] = useState(0);
    const { data: pollBlockData, isFetching: blockFetch } = usePollsPageQuery({ page: `page_1?page=${currentPage}` });
    const totalPages = useTotalPages(
        pollBlockData?.meta?.pager?.count,
        pollBlockData?.meta?.pager?.configurations?.items_per_page,
    );
    const handlePage = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }
    const langPrefix = useLanguagePrefix();
    useEffect(() => {
        if (!blockFetch) {
            setLoadingValue({ PollsPage: true });
        } else {
            setLoadingValue({ PollsPage: false });
        }
    }, [blockFetch]);

    return (
        <div className="polls-page container">
            <h3 className="polls-page__title">
                {langPrefix === 'en' && <>Our polls</>}
                {langPrefix === 'uk' && <>Наші опитування</>}
            </h3>
            {pollBlockData?.data?.length > 0 ? (
                <>
                    <div className="polls-page__list">
                        <Polls pollData={pollBlockData} />
                    </div>
                    {totalPages > 1 && <Pager totalPages={totalPages} onPageChange={handlePage} />}
                </>
            ) : (
                <div className="no-polls-message">
                    {langPrefix === 'en' && <h3>No polls available.</h3>}
                    {langPrefix === 'uk' && <h3>Немає доступних опитувань.</h3>}
                </div>
            )}
        </div>
    );
}