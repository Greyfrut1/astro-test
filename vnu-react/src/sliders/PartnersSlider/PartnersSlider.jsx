import Slider from 'react-slick';
import { useFooterPartnersBlockQuery } from '../../services/api';
import ImageComponent from '../../components/Image/ImageComponent';
import './PartnersSlider.scss';
import { useContext, useEffect } from 'react';
import { LoadingContext } from '../../context/loading-context';

export default function PartnersSlider() {
  const { data, isFetching } = useFooterPartnersBlockQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: false,
    useTransform: false,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          arrows: false,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          arrows: false,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  const { setLoadingValue } = useContext(LoadingContext);
  useEffect(() => {
    if (!isFetching) {
      setLoadingValue({ PartnersSlider: true });
    } else {
      setLoadingValue({ PartnersSlider: false });
    }
  }, [isFetching]);
  return (
    <div className="parther-block">
      <Slider {...settings} className="partner-slider container">
        {data?.data?.field_partner?.map((slide, index) => (
          <a key={index} className="partner-slider__item" href={slide.field_link_to_partner.uri}>
            <ImageComponent
              alt={slide?.field_image?.alt}
              imagestyle="parther_slider"
              url={slide?.field_image?.meta?.drupal_internal__target_id}
            />
          </a>
        ))}
      </Slider>
    </div>
  );
}
