import { useContext, useEffect, useState } from 'react';
import { useBranchesQuery } from '../services/api';
import BranchesView from '../views/BranchesView/BranchesView';
import { LoadingContext } from '../context/loading-context';
import useTotalPages from '../services/pager.jsx';
import Pager from '../components/Pager/Pager.jsx';

export default function MuseumsPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isFetching } = useBranchesQuery({ endpoint: `page_2?page=${currentPage}` });
  const { setLoadingValue } = useContext(LoadingContext);
  const totalPages = useTotalPages(
    data?.meta?.pager?.count,
    data?.meta?.pager?.configurations?.items_per_page,
  );
  const handlePage = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    if (!isFetching) {
      setLoadingValue({ MuseumsPage: true });
    } else {
      setLoadingValue({ MuseumsPage: false });
    }
  }, [isFetching]);
  return (
    <>
      <BranchesView data={data} />
      {totalPages > 1 && <Pager totalPages={totalPages} onPageChange={handlePage} />}
    </>
  );
}
