import ContactInformation from '../../components/ContactInformation/ContactInformation.jsx';
import MapComponent from '../../components/Common/MapComponent';
import './InfrastructureView.scss';
import {useInfrastructureQuery} from '../../services/api';
import useLanguagePrefix from '../../services/languagePrefix';
import React, {useContext, useEffect, useState} from 'react';
import {LoadingContext} from '../../context/loading-context';
import useTotalPages from "../../services/pager.jsx";
import Pager from "../../components/Pager/Pager.jsx";

export default function InfrastructureView() {
    const [currentPage, setCurrentPage] = useState(0);
    const {data, isFetching} = useInfrastructureQuery({endpoint: `page_1?page=${currentPage}`});
    const languagePrefix = useLanguagePrefix();
    const {setLoadingValue} = useContext(LoadingContext);
    const totalPages = useTotalPages(
        data?.meta?.pager?.count,
        data?.meta?.pager?.configurations?.items_per_page,
    );
    const handlePage = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        if (!isFetching) {
            setLoadingValue({InfrastructureView: true});
        } else {
            setLoadingValue({InfrastructureView: false});
        }
    }, [isFetching]);
    return (
        <div className="container">
            <div className="infrastructure">
                <h3 className="infrastructure__title">{data?.meta?.title}</h3>
                <div className="infrastructure-view md:gap-10 gap-20">
                    {data?.data?.map((item, index) => (
                        <div key={index} className="infrastructure-item">
                            <div className="infrastructure-item__map">
                                <MapComponent
                                    urlSuffix={item?.attributes?.field_location}
                                    zoom={'15'}
                                />
                            </div>
                            <div className="infrastructure-item__info">
                                <h2 className="infrastructure-item__info-title">
                                    <a href={`/${languagePrefix}${item?.attributes?.path?.alias}`}>
                                        {item?.attributes?.title}
                                    </a>
                                </h2>
                                <ContactInformation data={item.attributes} type="views"/>
                            </div>
                        </div>
                    ))}
                </div>
                <Pager totalPages={totalPages} onPageChange={handlePage}/>
            </div>
        </div>
    );
}
