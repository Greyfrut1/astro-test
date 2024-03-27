import React, {useContext, useEffect} from 'react';
import Slider from 'react-slick';
import {useLastNewsBlockQuery} from '../../services/api';
import useLanguagePrefix from '../../services/languagePrefix';
import ReadMore from '../../views/ReadMore/ReadMore';
import {LoadingContext} from '../../context/loading-context';
import Popup from '../../components/Popup/Popup';
import Subscriber from '../Subscriber/Subscriber';
import './LastNewsBlock.scss';

export default function LastNewsBlock() {
    const {data, isFetching} = useLastNewsBlockQuery({endpoint: 'block_1'});
    const {data: generalBlock} = useLastNewsBlockQuery({endpoint: 'block_2'});
    const langPrefix = useLanguagePrefix();
    const {setLoadingValue} = useContext(LoadingContext);
    useEffect(() => {
        if (!isFetching) {
            setLoadingValue({LastNewsSlider: true});
        } else {
            setLoadingValue({LastNewsSlider: false});
        }
    }, [isFetching]);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 3,
        arrows: false,
        variableWidth: false,
        responsive: [
            {
                breakpoint: 976,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: false,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false,
                    infinite: true,
                },
            },
        ],
    };
    return (
        <div className="last-news">
            <div className="container">
                <div className="last-news__header">
                    <h3 className="last-news__header-title">
                        {(langPrefix === 'en' && 'Recent news') || (langPrefix === 'uk' && 'Останні новини')}
                    </h3>
                    <div className="last-news__header-right">
                        <Popup
                            activationButton={
                                <button type="submit">
                                    {(langPrefix === 'en' && 'Subscribe') || (langPrefix === 'uk' && 'Підписатись')}
                                </button>
                            }
                            content={<Subscriber/>}
                        />

                        <a className="last-news__header-link" href={`${langPrefix}/news`}>
                            {(langPrefix === 'en' && 'All news') || (langPrefix === 'uk' && 'Всі новини')}
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
                        </a>
                    </div>
                </div>

                <div className="last-news__main">
                    <div className="last-news__main-top">
                        <img
                            src={generalBlock?.data?.[0]?.field_image?.image_style_uri?.['924x430']}
                            alt={generalBlock?.data?.[0]?.field_image?.meta?.alt}
                        />
                        <div className="last-news__main-top__content">
                            <div className="last-news__main-title">
                                <a href={`/${langPrefix}${generalBlock?.data?.[0]?.path?.alias}`}>
                                    {generalBlock?.data?.[0]?.title}
                                </a>
                            </div>
                            <div className="last-news__main-summary">
                                {generalBlock?.data?.[0]?.field_description?.summary}
                            </div>
                            <ReadMore
                                link={`/${langPrefix}${generalBlock?.data?.[0]?.path?.alias}`}
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

                    <Slider className="last-news__main-bottom" {...settings}>
                        {data?.data?.map((news) => (
                            <div key={news.id} className="last-news__main-bottom__item">
                                <img
                                    src={news?.field_image?.image_style_uri?.['453x290']}
                                    alt={news?.field_image?.meta?.alt}
                                />
                                <div className="last-news__main-title">
                                    <a href={`/${langPrefix}${news?.path?.alias}`}>{news?.title}</a>
                                </div>
                                <ReadMore
                                    link={`/${langPrefix}${news?.path?.alias}`}
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
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}
