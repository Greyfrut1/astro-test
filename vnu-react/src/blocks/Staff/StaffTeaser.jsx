import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useNodeQuery } from '../../services/api.js';
import ImageComponent from '../../components/Image/ImageComponent.jsx';
import { LoadingContext } from '../../context/loading-context.jsx';
import ContactInformation from '../../components/ContactInformation/ContactInformation.jsx';

function StaffTeaser({ staff_id }) {
  const { data: staffCard, isFetching } = useNodeQuery({ nid: `${staff_id}` });
  const { setLoadingValue } = useContext(LoadingContext);
  useEffect(() => {
    if (!isFetching) {
      setLoadingValue({ StaffTeaser: true });
    } else {
      setLoadingValue({ StaffTeaser: false });
    }
  }, [isFetching]);
  return (
    <div className="staff-teaser">
      <div className="staff-teaser__img">
        {staffCard?.field_image?.length > 0 && (
          <ImageComponent
            alt={staffCard?.field_image?.[0]?.alt}
            imagestyle="125x165"
            url={staffCard?.field_image?.[0]?.target_id}
          />
        )}
      </div>
      <div className="staff-teaser__information">
        <div className="staff-teaser__name">{staffCard?.title?.[0]?.value}</div>
        <div className="staff-teaser__position">
          {staffCard?.field_position_and_rank?.[0].value}
        </div>
        <ContactInformation data={staffCard} type="node" />
      </div>
    </div>
  );
}

StaffTeaser.propTypes = {
  staff_id: PropTypes.number.isRequired,
};
export default StaffTeaser;
