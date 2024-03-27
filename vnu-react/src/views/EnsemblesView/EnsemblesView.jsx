import {useLocation} from 'react-router-dom';
import React, {useContext, useEffect} from 'react';
import {useEnsemblesViewQuery} from '../../services/api';
import MetaTags from '../../components/Common/MetaTags';
import ReadMore from '../ReadMore/ReadMore';
import useLanguagePrefix from '../../services/languagePrefix';
import {LoadingContext} from '../../context/loading-context';
import './EnsemblesView.scss';
import ImageComponent from '../../components/Image/ImageComponent';
import SanitizedHtml from "../../components/Common/SanitizedHtml.jsx";

export default function EnsemblesView() {
    const {data: ensembles, isFetching} = useEnsemblesViewQuery();
    const location = useLocation();
    const languagePrefix = useLanguagePrefix();
    const currentPath = location.pathname;
    const {setLoadingValue} = useContext(LoadingContext);
    useEffect(() => {
        if (!isFetching) {
            setLoadingValue({EnsemblesView: true});
        } else {
            setLoadingValue({EnsemblesView: false});
        }
    }, [isFetching]);
    return (
        <>
            <MetaTags type="view" data={ensembles} viewUrl={currentPath}/>
            <h1 className="ensembles-view__title">
                {(languagePrefix === 'en' && 'Ensembles') || 'Творчі колективи'}
            </h1>
            <div className="ensembles-view container">
                {ensembles?.data?.map((item, index) => (
                    <div className="ensembles-view__item" key={index}>
                        <div className="ensembles-view__item-left">
                            <h2 className="ensembles-view__item-title">{item?.title}</h2>
                            <ImageComponent
                                alt="item?.title"
                                url={item?.field_image.meta?.drupal_internal__target_id}
                                imagestyle="250x250"
                            />
                        </div>
                        <div className="ensembles-view__item-right">
                            <div className="ensembles-view__item-text">
                                <SanitizedHtml
                                    htmlString={item?.field_description.processed}
                                />
                            </div>
                            <ReadMore
                                link={`/${languagePrefix}${item.path.alias}`}
                                img={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="31"
                                        height="6"
                                        viewBox="0 0 31 6"
                                        fill="none"
                                    >
                                        <path
                                            d="M21.9515 5.91895L20.5071 5.42152L26.6352 3.31115L0 3.31115L0 3.31113L0 2.60767L0 2.60765L26.635 2.60765L20.5071 0.497348L21.9515 -7.67708e-05L30.5455 2.95943L21.9515 5.91895Z"
                                            fill="#561111"
                                        />
                                    </svg>
                                }
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
