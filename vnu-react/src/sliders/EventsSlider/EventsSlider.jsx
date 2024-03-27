import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import Slider from 'react-slick';
import arrow from '../../assets/long-arrow-right.png';
import useLanguagePrefix from '../../services/languagePrefix';
import './EventsSlider.scss';
import { useEventViewBlockQuery } from '../../services/api';
import React, { useContext, useEffect } from 'react';
import { LoadingContext } from '../../context/loading-context';
import SanitizedHtml from '../../components/Common/SanitizedHtml';
import defaultEventImage from '../../assets/white-background.jpg';


const baseUrl = import.meta.env.VITE_BACKEND_URL;

function truncateText(text, maxLength) {
  if (text && text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`;
  }
  return text;
}

export default function EventsSlider() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    arrows: false,
    variableWidth: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          initialSlide: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: false,
        },
      },
    ],
  };
  const { data, isFetching } = useEventViewBlockQuery({ endpoint: 'coming-soon' });
  const { data: pastEventData, isFetching: isFetchingPastEventData } = useEventViewBlockQuery({
    endpoint: 'past-event-home',
  });

  const langPrefix = useLanguagePrefix();
  if (data?.data && data.data.length > 3) {
    settings.slidesToShow = 3;
  } else if (data?.data) {
    settings.slidesToShow = data.data.length;
  }

  const { setLoadingValue } = useContext(LoadingContext);
  useEffect(() => {
    if (!isFetching) {
      setLoadingValue({ EventsSlider: true });
    } else {
      setLoadingValue({ EventsSlider: false });
    }
  }, [isFetching]);
  return (
    <div className="events-slider">
      <div className="events-slider__overlay" />
      <div className="container">
        <div className="events-slider__head">
          <h2 className="events-slider__title">
            {data?.rows?.length > 0 ? (
              <a href={`/${langPrefix}/events`}>
                {(langPrefix === 'en' && 'Coming soon') || 'Незабаром'}
              </a>
            ) : (
              <a href={`/${langPrefix}/events`}>
                {(langPrefix === 'en' && 'Recent events') || 'Останні події'}
              </a>
            )}
          </h2>
          <a className="events-slider__calendar-link" href={`/${langPrefix}/events-calendar`}>
            {(langPrefix === 'en' && 'Events calendar') || 'Календар подій'}
            <svg
              width="38"
              height="6"
              viewBox="0 0 38 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.2502 5.91895L25.4571 5.42152L33.0644 3.31115L0 3.31115L0 3.31113L0 2.60767L0 2.60765L33.0641 2.60765L25.4571 0.497348L27.2502 -7.67708e-05L37.9185 2.95943L27.2502 5.91895Z"
                fill="white"
              />
            </svg>
          </a>
        </div>
        {data?.rows?.length > 0 ? (
          <Slider {...settings}>
            {data?.rows?.map((event, index) => (
              <div key={index} className="events-slider__item">
                <div className="events-slider__top">
                  <div className="events-slider__top-date">
                    {event?.field_start_date && (
                        <>
                          {langPrefix === 'uk' && (
                              <>
                                <div>
                                  {format(new Date(event?.field_start_date), 'dd MMMM HH:mm', {
                                    locale: uk,
                                  })}
                                </div>
                                <div>
                                  {format(new Date(event?.field_end_date), 'dd MMMM HH:mm', {
                                    locale: uk,
                                  })}
                                </div>
                              </>
                          )}
                          {langPrefix === 'en' && (
                              <>
                                <div>{format(new Date(event?.field_start_date), 'dd MMMM HH:mm')}</div>
                                <div>{format(new Date(event?.field_end_date), 'dd MMMM HH:mm')}</div>
                              </>
                          )}
                        </>
                    )}
                  </div>
                  <img src={`${event?.field_image}` || defaultEventImage} alt="event"/>
                  <h3 className="events-slider__top-title">
                    <SanitizedHtml htmlString={event?.title}/>
                  </h3>
                </div>
                <div className="events-slider__bottom">
                <h3 className="events-slider__bottom-title">
                    <SanitizedHtml htmlString={event?.title} />
                  </h3>
                  <p
                    className="events-slider__bottom-summary"
                    dangerouslySetInnerHTML={{
                      __html: truncateText(event?.field_description, 150),
                    }}
                  />
                  <div className="events-slider__bottom-link">
                    <a href={event?.view_node}>
                      <img src={arrow} alt="link" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <>
            {pastEventData?.rows && (
              <Slider {...settings}>
                {pastEventData?.rows?.map((event, index) => (
                  <div key={index} className="events-slider__item">
                    <div className="events-slider__top">
                      <div className="events-slider__top-date">
                        {event?.field_start_date && (
                            <>
                              {langPrefix === 'uk' && (
                                  <>
                                    <div>
                                      {format(new Date(event?.field_start_date), 'dd MMMM HH:mm', {
                                        locale: uk,
                                      })}
                                    </div>
                                    <div>
                                      {format(new Date(event?.field_end_date), 'dd MMMM HH:mm', {
                                        locale: uk,
                                      })}
                                    </div>
                                  </>
                              )}
                              {langPrefix === 'en' && (
                                  <>
                                    <div>
                                      {format(new Date(event?.field_start_date), 'dd MMMM HH:mm')}
                                    </div>
                                    <div>
                                      {format(new Date(event?.field_end_date), 'dd MMMM HH:mm')}
                                    </div>
                                  </>
                              )}
                            </>
                        )}
                      </div>
                      <img src={`${event?.field_image}` || defaultEventImage} alt="event"/>
                      <h3 className="events-slider__top-title">
                        <SanitizedHtml htmlString={event?.title}/>
                      </h3>
                    </div>
                    <div className="events-slider__bottom">
                      <h3 className="events-slider__bottom-title">
                        <SanitizedHtml htmlString={event?.title} />
                      </h3>
                      <p
                        className="events-slider__bottom-summary"
                        dangerouslySetInnerHTML={{
                          __html: truncateText(event?.field_description, 150),
                        }}
                      />
                      <div className="events-slider__bottom-link">
                        <a href={event?.view_node}>
                          <img src={arrow} alt="link" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </>
        )}
      </div>
    </div>
  );
}
