import { useLocation } from 'react-router-dom';
import { useFacultiesViewQuery } from '../../services/api';
import useLanguagePrefix from '../../services/languagePrefix';
import ContactInformation from '../../components/ContactInformation/ContactInformation.jsx';
import MetaTags from '../../components/Common/MetaTags';
import './FacultyView.scss';
import { useContext, useEffect } from 'react';
import { LoadingContext } from '../../context/loading-context';

export default function FacultyView() {
  const languagePrefix = useLanguagePrefix();
  const { data: facultyData, isFetching } = useFacultiesViewQuery();
  const location = useLocation();
  const currentPath = location.pathname;
  const { setLoadingValue } = useContext(LoadingContext);
  useEffect(() => {
    if (!isFetching) {
      setLoadingValue({ FacultyView: true });
    } else {
      setLoadingValue({ FacultyView: false });
    }
  }, [isFetching]);
  return (
    <>
      <MetaTags type="view" data={facultyData} viewUrl={currentPath} />
      <div className="faculty-view container">
        {facultyData?.data?.map((item, index) => (
          <div className="faculty-view__item" key={index}>
            <a
              className="faculty-view__item-img-link"
              href={`/${languagePrefix}${item?.path?.alias}`}
            >
              <img
                src={item?.field_image?.image_style_uri?.['122x122']}
                alt={item?.field_image?.meta?.alt}
              />
            </a>
            <div className="faculty-view__item-right">
              <a
                className="faculty-view__item-title"
                href={`/${languagePrefix}${item?.path?.alias}`}
              >
                {item?.title}
              </a>
              <ContactInformation data={item} type="views" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
