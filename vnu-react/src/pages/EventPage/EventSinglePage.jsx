import React, {useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {format} from 'date-fns';
import {uk} from 'date-fns/locale';
import ImageComponent from '../../components/Image/ImageComponent';
import ShareButtonComponent from '../../components/ShareButtonComponent';
import {useEventPageQuery} from '../../services/api';
import {LoadingContext} from '../../context/loading-context';
import './EventsSinglePage.scss';
import useLanguagePrefix from '../../services/languagePrefix';
import MapComponent from '../../components/Common/MapComponent';
import SanitizedHtml from '../../components/Common/SanitizedHtml';
import {AliasContext} from '../../context/alias';

export default function EventSinglePage() {
    const {alias} = useParams();
    const {data, isFetching} = useEventPageQuery({page: `${alias}`});
    const {setLoadingValue} = useContext(LoadingContext);
    const {updateAlias} = useContext(AliasContext);
    useEffect(() => {
        if (!isFetching) {
            updateAlias(data?.title?.[0]?.value);
            setLoadingValue({NewsPage: true});
        } else {
            setLoadingValue({NewsPage: false});
        }
    }, [isFetching]);
    const langPrefix = useLanguagePrefix();
    return (
        <div className="event container">
            <h3 className="event-title">{data?.title?.[0]?.value}</h3>
            <div className="event-block">
                <div className="event-share">
                    <ShareButtonComponent data={data}/>
                </div>
                <div className="event-main">
                    {data?.field_image?.map((item, index) => (
                        <>
                            {item?.target_id && (
                                <ImageComponent
                                    className="event-main__img"
                                    url={item?.target_id}
                                    imagestyle="events_node_imgstyle"
                                    alt={item?.alt}
                                />
                            )}
                        </>
                    ))}
                    {data?.field_description?.map((item) => (
                        <p className="event-main__description">
                            <SanitizedHtml htmlString={item?.processed}/>
                        </p>
                    ))}
                    {data?.field_events_file?.map((item) => (
                        <p className="event-main__file">
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
                                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                />
                            </svg>
                            <a href={item?.url}>{item.description}</a>
                        </p>
                    ))}
                </div>
                <div className="event-info">
                    {data?.field_duration_event?.[0]?.value && (
                        <div className="event-info__point">
                            <h3>{(langPrefix === 'en' && 'Start date') || 'Час початку'}</h3>
                            <p>
                                {langPrefix === 'uk' && (
                                    <>
                                        {format(
                                            new Date(data?.field_duration_event?.[0]?.value),
                                            'd MMMM yyyy, HH:mm',
                                            {locale: uk},
                                        )}
                                    </>
                                )}
                                {langPrefix === 'en' && (
                                    <>
                                        {format(new Date(data?.field_duration_event?.[0]?.value), 'd MMMM yyyy, HH:mm')}
                                    </>
                                )}
                            </p>
                        </div>
                    )}
                    {data?.field_duration_event?.[0]?.end_value && (
                        <div className="event-info__point">
                            <h3>{(langPrefix === 'en' && 'End time') || 'Час завершення'}</h3>
                            <p>
                                {langPrefix === 'uk' && (
                                    <>
                                        {format(
                                            new Date(data?.field_duration_event?.[0]?.end_value),
                                            'd MMMM yyyy, HH:mm',
                                            {locale: uk},
                                        )}
                                    </>
                                )}
                                {langPrefix === 'en' && (
                                    <>
                                        {format(
                                            new Date(data?.field_duration_event?.[0]?.end_value),
                                            'd MMMM yyyy, HH:mm',
                                        )}
                                    </>
                                )}
                            </p>
                        </div>
                    )}
                    {data?.field_location?.[0]?.value && (
                        <div className="event-info__point">
                            <h3>{(langPrefix === 'en' && 'Location') || 'Локація'}</h3>
                            <p>
                                <a
                                    target="_blank"
                                    href={`https://www.google.com.ua/maps/search/${data?.field_location?.[0]?.value}`}
                                    rel="noreferrer"
                                >
                                    {data?.field_location?.[0]?.value}
                                </a>
                            </p>
                        </div>
                    )}
                    <div className="event-info__map">
                        <MapComponent
                            urlSuffix={data?.field_location?.[0]?.value}
                            zoom={'15'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
