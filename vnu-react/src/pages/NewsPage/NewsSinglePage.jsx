import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShareButtonComponent from '../../components/ShareButtonComponent';
import { useNewsPageQuery } from '../../services/api';
import { LoadingContext } from '../../context/loading-context';
import './NewsSinglePage.scss';
import SanitizedHtml from '../../components/Common/SanitizedHtml';
import OtherNewsSlider from '../../sliders/OtherNewsSlider/OtherNewsSlider';
import CounterComponent from '../../components/CounterComponent';
import { AliasContext } from '../../context/alias';
import ImageComponent from '../../components/Image/ImageComponent';
import MetaTags from "../../components/Common/MetaTags";

export default function NewsSinglePage() {
  const { alias } = useParams();
  const { data, isFetching } = useNewsPageQuery({ page: `${alias}` });
  const { setLoadingValue } = useContext(LoadingContext);
  const { updateAlias } = useContext(AliasContext);
  useEffect(() => {
    if (!isFetching) {
      updateAlias(data?.title?.[0]?.value);
      setLoadingValue({ NewsPage: true });
    } else {
      setLoadingValue({ NewsPage: false });
    }
  }, [isFetching]);
  return (
      <>
        <MetaTags type="content" data={data}/>
        <div className="news container">
          <div className="news-info">
            <h3 className="news-info__title">{data?.title?.[0]?.value}</h3>
            {data?.field_image?.[0]?.target_id && (
                <div className="news-info__img">
                  <ImageComponent
                      alt={data?.field_image?.[0]?.alt}
                      url={data?.field_image?.[0]?.target_id}
                  />
                </div>
            )}
            {data?.field_description?.map((item, index) => (
                <div key={index}>
                  <p className="news-info__description">
                    <SanitizedHtml htmlString={item?.processed}/>
                  </p>
                </div>
            ))}
            {data?.field_news_file?.map((item) => (
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
            <div className="news-info__bottom">
              <CounterComponent/>
              <ShareButtonComponent data={data}/>
            </div>
          </div>
          {data?.nid?.[0]?.value && <OtherNewsSlider id={data?.nid?.[0]?.value}/>}
        </div>
      </>
  );
}
