import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { useNodeQuery } from '../../services/api';
import useLanguagePrefix from '../../services/languagePrefix';
import { LoadingContext } from '../../context/loading-context';

export default function StaffTitlePosition({ staff_id }) {
  const languagePrefix = useLanguagePrefix();
  const { data: position, isFetching } = useNodeQuery({ nid: `${staff_id}` });
  const { setLoadingValue } = useContext(LoadingContext);
  useEffect(() => {
    if (!isFetching) {
      setLoadingValue({ StaffTitlePosition: true });
    } else {
      setLoadingValue({ StaffTitlePosition: false });
    }
  }, [isFetching]);
  return (
    <>
      <a href={`/${languagePrefix}${position?.path?.[0]?.alias}`}>{position?.title?.[0]?.value}</a>
      <span>{position?.field_position_and_rank?.[0]?.value}</span>
    </>
  );
}

StaffTitlePosition.propTypes = {
  staff_id: PropTypes.number.isRequired,
};
