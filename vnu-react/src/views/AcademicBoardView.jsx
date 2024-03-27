import { useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import StaffView from './StaffView/StaffView';
import MetaTags from '../components/Common/MetaTags';
import { useStaffQuery } from '../services/api';
import { LoadingContext } from '../context/loading-context';

export default function AcademicBoardView() {
  const { data: academicBoardViewsData, isFetching } = useStaffQuery({ endpoint: `page_2` });
  const location = useLocation();
  const currentPath = location.pathname;
  const { setLoadingValue } = useContext(LoadingContext);
  useEffect(() => {
    if (!isFetching) {
      setLoadingValue({ Rectorate: true });
    } else {
      setLoadingValue({ Rectorate: false });
    }
  }, [isFetching]);
  return (
    <>
      <MetaTags type="view" data={academicBoardViewsData} viewUrl={currentPath} />
      <StaffView data={academicBoardViewsData} />
    </>
  );
}
