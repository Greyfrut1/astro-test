import Slider from 'react-slick';
import { useMainSliderQuery } from '../../services/api';
import ReadMore from '../../views/ReadMore/ReadMore';
import './MainSlider.scss';
import React, { useContext, useEffect, useState } from 'react';
import { LoadingContext } from '../../context/loading-context';
import languagePrefix from '../../services/languagePrefix';

export default function MainSlider() {
  const { data, isFetching } = useMainSliderQuery();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const langPrefix = languagePrefix();
  const { setLoadingValue } = useContext(LoadingContext);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isFetching) {
      setLoadingValue({ MainSlider: true });
    } else {
      setLoadingValue({ MainSlider: false });
    }
  }, [isFetching]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    useTransform: false,
  };

  return (
      <Slider {...settings} className="main-slider">
        {data?.data?.map((slide, index) => (
            <div key={index} className="main-slider__item">
              <img
                  src={slide?.field_image?.image_style_uri?.wide}
                  alt={slide?.field_image?.meta?.alt}
              />
              <div className="main-slider__overlay" />
              <div className="main-slider__item-content container">
                <h3 className="main-slider__title">{slide?.info}</h3>
                <div className="main-slider__line" />
                <div className="main-slider__description">
                  {slide?.field_description?.value.replace(/(<([^>]+)>)/gi, '')}
                </div>
                {windowWidth < 977 ? (

                    <a
                        href={`${langPrefix}${slide?.field_link?.path?.alias}`}
                        className="main-slider__full-link"
                    >
                    </a>
                ) : (
                    <p className="main-slider__link">
                      <ReadMore link={`${langPrefix}${slide?.field_link?.path?.alias}`}/>
                    </p>
                )}
              </div>
            </div>
        ))}
      </Slider>
  );
}