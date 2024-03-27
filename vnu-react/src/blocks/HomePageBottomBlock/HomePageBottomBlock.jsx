import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PollsBlock from '../PollsBlock/PollsBlock';
import PhotoAlbumSlider from '../../sliders/PhotoAlbumSlider/PhotoAlbumSlider';
import FacebookBlock from '../FacebookBlock/FacebookBlock';
import YoutubeBlock from '../YoutubeBlock/YoutubeBlock';
import './HomePageBottomBlock.scss';

export default function HomePageBottomBlock() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    useTransform: false,
    responsive: [
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 2,
          arrows: false,
          dots: true,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
          infinite: true,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="homepage-bottom container">
      <YoutubeBlock />
      <div className="homepage-bottom__block">
        <Slider {...settings}>
          <div className="homepage-bottom__block-item">
            <PollsBlock />
          </div>
          <div className="homepage-bottom__block-item">
            <FacebookBlock />
          </div>
          <div className="homepage-bottom__block-item">
            <PhotoAlbumSlider />
          </div>
        </Slider>
      </div>
    </div>
  );
}
