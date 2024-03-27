import { useLocation } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import MetaTags from '../../components/Common/MetaTags';
import { usePublicInfoViewQuery } from '../../services/api';
import { LoadingContext } from '../../context/loading-context';
import './PublicInformationPage.scss';
import ReadMore from '../../views/ReadMore/ReadMore';
import useLanguagePrefix from '../../services/languagePrefix';
import Pager from "../../components/Pager/Pager.jsx";
import SanitizedHtml from "../../components/Common/SanitizedHtml.jsx";
import useTotalPages from "../../services/pager.jsx";

export default function PublicInformationPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const { data: publicInformationTitle, isFetching: publicInfoViewFetch } = usePublicInfoViewQuery({
        endpoint: `block_1?page=${currentPage}`,
    });
    const location = useLocation();
    const langPrefix = useLanguagePrefix();
    const currentPath = location.pathname;
    const { setLoadingValue } = useContext(LoadingContext);
    useEffect(() => {
        if (!publicInfoViewFetch) {
            setLoadingValue({ InfrastructureBlock: true });
        } else {
            setLoadingValue({ InfrastructureBlock: false });
        }
    }, [publicInfoViewFetch]);
    const totalPages = useTotalPages(
        publicInformationTitle?.meta?.pager?.count,
        publicInformationTitle?.meta?.pager?.configurations?.items_per_page,
    );
    const handlePage = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }

    return (
        <div className="public-information">
            {publicInformationTitle && currentPath && (
                <MetaTags type="view" data={publicInformationTitle} viewUrl={currentPath} />
            )}
            <div className="information-view container">
                {publicInformationTitle?.data?.length > 0 ? (
                    publicInformationTitle?.data?.map((item, index) => (
                        <div className="information-view__items" key={index}>
                            <h2 className="information-view__items-title"><SanitizedHtml htmlString={item?.attributes?.title} /></h2>
                            <p className="information-view__items-body"><SanitizedHtml htmlString={item?.attributes?.field_body} /></p>
                            <p className="information-view__items-button">
                                <ReadMore link={`${item.attributes?.path?.alias}`} />
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="no-data-message">
                        {langPrefix === 'en' && <h3>No public information available.</h3>}
                        {langPrefix === 'uk' && <h3>Немає доступної публічної інформації.</h3>}
                    </div>
                )}
                {totalPages > 1 && <Pager totalPages={totalPages} onPageChange={handlePage} />}
            </div>
        </div>
    );
}