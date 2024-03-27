import PropTypes from 'prop-types';
import useLanguagePrefix from '../../services/languagePrefix';
import ContactInformation from '../../components/ContactInformation/ContactInformation';
import './StaffView.scss';
import ImageComponent from "../../components/Image/ImageComponent.jsx";

export default function StaffView({data}) {
    const languagePrefix = useLanguagePrefix();
    return (
        <div className="container">
            <div className="staff-view">
                {data?.data?.map((item, index) => (
                    <div key={index} className="staff-item">
                        <ImageComponent url={item?.field_image?.meta?.drupal_internal__target_id} alt={item?.field_image?.meta?.alt} imagestyle={"small_large_photoalbums_134_172_"} />
                        <a className="staff-item__title" href={`/${languagePrefix}${item?.path?.alias}`}>
                            {item?.title}
                        </a>
                        <p className="staff-item__position">{item?.field_position_and_rank}</p>
                        <ContactInformation data={item} type="views"/>
                    </div>
                ))}
            </div>
        </div>
    );
}

StaffView.propTypes = {
    data: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.array.isRequired]),
};
