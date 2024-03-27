import { useLocation } from 'react-router-dom';
import useLanguagePrefix from '../../services/languagePrefix';
import ContactInformation from '../../components/ContactInformation/ContactInformation';
import MetaTags from '../../components/Common/MetaTags';
import './BranchesView.scss';
import React from 'react';

export default function BranchesView({ data }) {
  const languagePrefix = useLanguagePrefix();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <>
      <MetaTags type="view" data={data} viewUrl={currentPath} />
      <div className="branches container">
        <div className="branches-view">
          {data?.data?.map((item, index) => (
            <div key={index} className="branches-item">
                <img src={item?.field_image?.uri?.url} alt={item?.field_image?.meta?.alt}/>
                <h2 className="branches-item__title">
                    <a href={`/${languagePrefix}${item?.path?.alias}`}>{item.title}</a>
              </h2>
              <ContactInformation data={item} type="views" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
