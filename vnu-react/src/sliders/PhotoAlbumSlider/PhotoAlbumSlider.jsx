import React, { useContext, useEffect } from 'react';
import Slider from 'react-slick';
import useLanguagePrefix from '../../services/languagePrefix';
import { usePhotoAlbumsQuery } from '../../services/api';
import './PhotoAlbumSlider.scss';
import { LoadingContext } from '../../context/loading-context';

export default function PhotoAlbumSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    useTransform: false,
  };
  const langPrefix = useLanguagePrefix();
  const { data, isFetching } = usePhotoAlbumsQuery({ page: 0 });
  const { setLoadingValue } = useContext(LoadingContext);
  useEffect(() => {
    if (!isFetching) {
      setLoadingValue({ PhotoAlbumSlider: true });
    } else {
      setLoadingValue({ PhotoAlbumSlider: false });
    }
  }, [isFetching]);
  return (
    <div className="photoalbums-block">
      <div className="title">
        <h3>
          <a href={`/${langPrefix}/photoalbums`}>{data?.meta?.title}</a>
        </h3>
      </div>
      <Slider {...settings} className="photoalbums-block__slider">
        {data?.data?.map((slide) => (
          <div key={slide?.id} className="photoalbums-block__slider__item">
            <img
              className="photoalbums-block__slider__image"
              src={slide?.field_image?.image_style_uri?.['453x491']}
              alt={slide?.field_image?.meta?.alt}
            />
            <div className="photoalbums-block__slider__title">
              <div className="photoalbums-block__slider__title__cut">
                <a href={`/${langPrefix}${slide?.path?.alias}`}>{slide?.title}</a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
