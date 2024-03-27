import { FacebookProvider, Page } from 'react-facebook';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFacebookBlockQuery } from '../../services/api';
import './FacebookBlock.scss';
import { LoadingContext } from '../../context/loading-context';

export default function FacebookBlock() {
  const { data: facebookBlockData, isFetching } = useFacebookBlockQuery();
  const { setLoadingValue } = useContext(LoadingContext);
  useEffect(() => {
    if (!isFetching) {
      setLoadingValue({ FacebookBlock: true });
    } else {
      setLoadingValue({ FacebookBlock: false });
    }
  }, [isFetching]);
  return (
    <>
      {facebookBlockData?.data?.attributes?.field_link_to?.uri && (
        <div className="facebook-block">
          <div className="title">
            <h3>
              <Link to={facebookBlockData?.data?.attributes?.field_link_to?.uri}>
                {facebookBlockData?.data?.attributes?.info}
              </Link>
            </h3>
          </div>
          <FacebookProvider appId="1453142571919005">
            <Page
              width="461px"
              href={facebookBlockData?.data?.attributes?.field_link_to?.uri}
              tabs="timeline"
            />
          </FacebookProvider>
        </div>
      )}
    </>
  );
}
