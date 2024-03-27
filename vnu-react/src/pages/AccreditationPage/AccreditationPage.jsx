import {useLocation} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import MetaTags from '../../components/Common/MetaTags';
import {useAccreditationQuery, usePublicInfoViewQuery} from '../../services/api';
import {LoadingContext} from '../../context/loading-context';
import useLanguagePrefix from '../../services/languagePrefix';
import ReadMore from '../../views/ReadMore/ReadMore';
import './AccreditationPage.scss';
import Pager from "../../components/Pager/Pager.jsx";

function AccreditationPage() {
    const [currentPage, setCurrentPage] = useState(0);
    const {
        data: accreditationView,
        isFetching: accreditationFetch
    } = useAccreditationQuery({page: `page=${currentPage}`});
    const {data: accreditationTitle, isFetching: publicInfoFetch} = usePublicInfoViewQuery({
        endpoint: 'block_2',
    });
    const handlePage = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }
    const {setLoadingValue} = useContext(LoadingContext);
    useEffect(() => {
        if (!publicInfoFetch || !accreditationFetch) {
            setLoadingValue({AccreditationPage: true});
        } else {
            setLoadingValue({AccreditationPage: false});
        }
    }, [publicInfoFetch, accreditationFetch]);
    const location = useLocation();
    const currentPath = location.pathname;
    const langPrefix = useLanguagePrefix();
    return (
        <>
            {accreditationTitle && currentPath && (
                <MetaTags type="view" data={accreditationTitle} viewUrl={currentPath}/>
            )}
            <div className="accreditation-page__container container">
                <h1 className="accreditation-page__title">
                    {(langPrefix === 'uk' && 'Акредитація ОП') || 'Accreditation of EP'}
                </h1>
                <div className="accreditation-page__items-block">
                    {(accreditationView?.rows?.length > 0 &&
                        accreditationView?.rows?.map((item, index) => (
                            <div className="accreditation-page__item" key={index}>
                                <h3
                                    className="accreditation-page__item-title"
                                    dangerouslySetInnerHTML={{__html: item?.title}}
                                />
                                <div className="accreditation-page__link-block">
                                    <ReadMore link={item.view_node}/>
                                </div>
                            </div>
                        ))) || (
                        <p className="accreditation-page__no-accreditations-text">
                            {langPrefix === 'uk'
                                ? 'Акредитаційні програми відсутні.'
                                : 'No accredited programs available.'}
                        </p>
                    )}
                    {accreditationView?.pager?.total_pages > 1 &&
                        <Pager totalPages={accreditationView?.pager?.total_pages} onPageChange={handlePage}/>}
                </div>
            </div>
        </>
    );
}

export default AccreditationPage;
