import { useOtherNewsSliderQuery } from '../../services/api';
import useLanguagePrefix from '../../services/languagePrefix';
import React, { useContext, useEffect } from 'react';
import { LoadingContext } from '../../context/loading-context';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './OtherNewsSlider.scss';
import Slider from 'react-slick';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import SanitizedHtml from '../../components/Common/SanitizedHtml';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export default function OtherNewsSlider({ id }) {
  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 3,
    arrows: false,
    infinite: false,
    slidesToScroll: 3,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  const { data, isFetching } = useOtherNewsSliderQuery({ id: `${id}` });

  const langPrefix = useLanguagePrefix();
  const { setLoadingValue } = useContext(LoadingContext);
  useEffect(() => {
    if (!isFetching) {
      setLoadingValue({ OtherNewsSlider: true });
    } else {
      setLoadingValue({ OtherNewsSlider: false });
    }
  }, [isFetching]);

  return (
    <div className="other-news">
      <h2 className="other-news__title">
        {(langPrefix === 'en' && 'Last news') || 'Останні новини'}
      </h2>
      <Slider {...settings} className="other-news__slider">
        {data?.map((item, index) => (
          <div key={index} className="other-news__slider-item">
            <img src={`${item?.field_image}`} alt="event" />
            {item?.news_date && (
              <p className="other-news__slider-item__date">
                {langPrefix === 'uk' && (
                  <>{format(new Date(item?.news_date), 'dd MMMM ', { locale: uk })}</>
                )}
                {langPrefix === 'en' && <>{format(new Date(item?.news_date), 'dd MMMM')}</>}
              </p>
            )}
            <a className="other-news__slider-item__title" href={item?.link}>
              <SanitizedHtml htmlString={item?.title} />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
}
