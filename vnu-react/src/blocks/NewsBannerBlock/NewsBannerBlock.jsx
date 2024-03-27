import {useNewsViewQuery} from '../../services/api';
import useLanguagePrefix from '../../services/languagePrefix';
import './NewsBannerBlock.scss';
import {format} from 'date-fns';
import {uk} from 'date-fns/locale';
import {useContext, useEffect} from 'react';
import {useWindowSize} from 'react-use';
import Slider from 'react-slick';
import {LoadingContext} from '../../context/loading-context';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function NewsBannerBlock() {
    const {width} = useWindowSize();
    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
        responsive: [
            {
                breakpoint: 850,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const {data: mainNews, isFetching} = useNewsViewQuery({endpoint: `block_2`});
    const langPrefix = useLanguagePrefix();
    const {setLoadingValue} = useContext(LoadingContext);
    useEffect(() => {
        if (!isFetching) {
            setLoadingValue({NewsBannerBlock: true});
        } else {
            setLoadingValue({NewsBannerBlock: false});
        }
    }, [isFetching]);
    return (
        <div className={`main-news ${window.innerWidth < 1200 ? '' : 'container'}`}>
            {width < 1200 ? (
                <Slider {...settings}>
                    <div className="sliderItemContainer">
                        <img
                            className="sliderImageContainer"
                            src={
                                width < 850
                                    ? mainNews?.data?.[0]?.field_image?.image_style_uri?.main_news_adaptive
                                    : mainNews?.data?.[0]?.field_image?.image_style_uri?.main_news_first_item
                            }
                            alt={mainNews?.data?.[0]?.field_image?.meta?.alt}
                        />
                        <div className="sliderDateContainer">
                            {mainNews?.data?.[0]?.created && (
                                <>
                                    {langPrefix === 'uk' && (
                                        <div className="date_field">
                                            {format(new Date(mainNews?.data?.[0]?.created), 'dd MMMM, yyyy', {
                                                locale: uk,
                                            })}
                                        </div>
                                    )}
                                    {langPrefix === 'en' && (
                                        <div className="date_field">
                                            {format(new Date(mainNews?.data?.[0]?.created), 'dd MMMM, yyyy')}
                                        </div>
                                    )}
                                </>
                            )}
                            <div className="teaser_title">
                                <a href={`/${langPrefix}${mainNews?.data?.[0]?.path?.alias}`}>
                                    {mainNews?.data?.[0]?.title}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="sliderItemContainer">
                        <img
                            className="sliderImageContainer"
                            src={
                                width < 850
                                    ? mainNews?.data?.[1]?.field_image?.image_style_uri?.main_news_adaptive
                                    : mainNews?.data?.[1]?.field_image?.image_style_uri?.main_news_first_item
                            }
                            alt={mainNews?.data?.[1]?.field_image?.meta?.alt}
                        />
                        <div className="sliderDateContainer">
                            {mainNews?.data?.[1]?.created && (
                                <>
                                    {langPrefix === 'uk' && (
                                        <div className="date_field">
                                            {format(new Date(mainNews?.data?.[1]?.created), 'dd MMMM, yyyy', {
                                                locale: uk,
                                            })}
                                        </div>
                                    )}
                                    {langPrefix === 'en' && (
                                        <div className="date_field">
                                            {format(new Date(mainNews?.data?.[1]?.created), 'dd MMMM, yyyy')}
                                        </div>
                                    )}
                                </>
                            )}
                            <div className="teaser_title">
                                <a href={`/${langPrefix}${mainNews?.data?.[1]?.path?.alias}`}>
                                    {mainNews?.data?.[1]?.title}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="sliderItemContainer">
                        <img
                            className="sliderImageContainer"
                            src={
                                width < 850
                                    ? mainNews?.data?.[2]?.field_image?.image_style_uri?.main_news_adaptive
                                    : mainNews?.data?.[2]?.field_image?.image_style_uri?.main_news_first_item
                            }
                            alt={mainNews?.data?.[2]?.field_image?.meta?.alt}
                        />
                        <div className="sliderDateContainer">
                            {mainNews?.data?.[2]?.created && (
                                <>
                                    {langPrefix === 'uk' && (
                                        <div className="date_field">
                                            {format(new Date(mainNews?.data?.[2]?.created), 'dd MMMM, yyyy', {
                                                locale: uk,
                                            })}
                                        </div>
                                    )}
                                    {langPrefix === 'en' && (
                                        <div className="date_field">
                                            {format(new Date(mainNews?.data?.[2]?.created), 'dd MMMM, yyyy')}
                                        </div>
                                    )}
                                </>
                            )}
                            <div className="teaser_title">
                                <a href={`/${langPrefix}${mainNews?.data?.[2]?.path?.alias}`}>
                                    {mainNews?.data?.[2]?.title}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="sliderItemContainer">
                        <img
                            className="sliderImageContainer"
                            src={
                                width < 850
                                    ? mainNews?.data?.[3]?.field_image?.image_style_uri?.main_news_adaptive
                                    : mainNews?.data?.[3]?.field_image?.image_style_uri?.main_news_first_item
                            }
                            alt={mainNews?.data?.[3]?.field_image?.meta?.alt}
                        />
                        <div className="sliderDateContainer">
                            {mainNews?.data?.[3]?.created && (
                                <>
                                    {langPrefix === 'uk' && (
                                        <div className="date_field">
                                            {format(new Date(mainNews?.data?.[3]?.created), 'dd MMMM, yyyy', {
                                                locale: uk,
                                            })}
                                        </div>
                                    )}
                                    {langPrefix === 'en' && (
                                        <div className="date_field">
                                            {format(new Date(mainNews?.data?.[3]?.created), 'dd MMMM, yyyy')}
                                        </div>
                                    )}
                                </>
                            )}
                            <div className="teaser_title">
                                <a href={`/${langPrefix}${mainNews?.data?.[3]?.path?.alias}`}>
                                    {mainNews?.data?.[3]?.title}
                                </a>
                            </div>
                        </div>
                    </div>
                </Slider>
            ) : (
                <>
                    <div className="main-news__left">
                        <div className="main-news__first main-news__item">
                            <div className="cover-text">
                                {mainNews?.data?.[0]?.created && (
                                    <>
                                        {langPrefix === 'uk' && (
                                            <div className="date_field">
                                                {format(new Date(mainNews?.data?.[0]?.created), 'dd MMMM, yyyy', {
                                                    locale: uk,
                                                })}
                                            </div>
                                        )}
                                        {langPrefix === 'en' && (
                                            <div className="date_field">
                                                {format(new Date(mainNews?.data?.[0]?.created), 'dd MMMM, yyyy')}
                                            </div>
                                        )}
                                    </>
                                )}
                                <a
                                    className="teaser_title"
                                    href={`/${langPrefix}${mainNews?.data?.[0]?.path?.alias}`}
                                >
                                    {mainNews?.data?.[0]?.title}
                                </a>
                            </div>
                            <img
                                src={mainNews?.data?.[0]?.field_image?.image_style_uri?.main_news_first_item}
                                alt={mainNews?.data?.[0]?.field_image?.meta?.alt}
                            />
                        </div>
                    </div>
                    <div className="main-news__right">
                        <div className="top">
                            <div className="main-news__second main-news__item">
                                <div className="cover-text">
                                    {mainNews?.data?.[1]?.created && (
                                        <>
                                            {langPrefix === 'uk' && (
                                                <div className="date_field">
                                                    {format(new Date(mainNews?.data?.[1]?.created), 'dd MMMM, yyyy', {
                                                        locale: uk,
                                                    })}
                                                </div>
                                            )}
                                            {langPrefix === 'en' && (
                                                <div className="date_field">
                                                    {format(new Date(mainNews?.data?.[1]?.created), 'dd MMMM, yyyy')}
                                                </div>
                                            )}
                                        </>
                                    )}
                                    <a
                                        className="teaser_title"
                                        href={`/${langPrefix}${mainNews?.data?.[1]?.path?.alias}`}
                                    >
                                        {mainNews?.data?.[1]?.title}
                                    </a>
                                </div>
                                <img
                                    src={
                                        mainNews?.data?.[1]?.field_image?.image_style_uri?.main_news_second_third_items
                                    }
                                    alt={mainNews?.data?.[1]?.field_image?.meta?.alt}
                                />
                            </div>
                            <div className="main-news__third main-news__item">
                                <div className="cover-text">
                                    {mainNews?.data?.[2]?.created && (
                                        <>
                                            {langPrefix === 'uk' && (
                                                <div className="date_field">
                                                    {format(new Date(mainNews?.data?.[2]?.created), 'dd MMMM, yyyy', {
                                                        locale: uk,
                                                    })}
                                                </div>
                                            )}
                                            {langPrefix === 'en' && (
                                                <div className="date_field">
                                                    {format(new Date(mainNews?.data?.[2]?.created), 'dd MMMM, yyyy')}
                                                </div>
                                            )}
                                        </>
                                    )}
                                    <a
                                        className="teaser_title"
                                        href={`/${langPrefix}${mainNews?.data?.[2]?.path?.alias}`}
                                    >
                                        {mainNews?.data?.[2]?.title}{' '}
                                    </a>
                                </div>
                                <img
                                    src={
                                        mainNews?.data?.[2]?.field_image?.image_style_uri?.main_news_second_third_items
                                    }
                                    alt={mainNews?.data?.[2]?.field_image?.meta?.alt}
                                />
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="main-news__fourth main-news__item">
                                <div className="cover-text">
                                    {mainNews?.data?.[3]?.created && (
                                        <>
                                            {langPrefix === 'uk' && (
                                                <div className="date_field">
                                                    {format(new Date(mainNews?.data?.[3]?.created), 'dd MMMM, yyyy', {
                                                        locale: uk,
                                                    })}
                                                </div>
                                            )}
                                            {langPrefix === 'en' && (
                                                <div className="date_field">
                                                    {format(new Date(mainNews?.data?.[3]?.created), 'dd MMMM, yyyy')}
                                                </div>
                                            )}
                                        </>
                                    )}
                                    <a
                                        className="teaser_title"
                                        href={`/${langPrefix}${mainNews?.data?.[3]?.path?.alias}`}
                                    >
                                        {mainNews?.data?.[3]?.title}
                                    </a>
                                </div>
                                <img
                                    src={mainNews?.data?.[3]?.field_image?.image_style_uri?.main_news_fourth_item}
                                    alt={mainNews?.data?.[3]?.field_image?.meta?.alt}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
