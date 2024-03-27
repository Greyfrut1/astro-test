import PropTypes from 'prop-types';
import {useDepartmentViewQuery} from '../services/api.js';
import useLanguagePrefix from '../services/languagePrefix.jsx';
import ContactInformation from './ContactInformation/ContactInformation.jsx';

export default function Departments({id_departments}) {
    // Input head of department
    const languagePrefix = useLanguagePrefix();
    const {data: department} = useDepartmentViewQuery({id_departments: `${id_departments}`});
    return (
        <div className="departments-view">
            {department?.data?.map((item, index) => (
                <div className="departments-view__item" key={index}>
                    <a
                        className="departments-view__item-title"
                        href={`/${languagePrefix}${item?.path?.alias}`}
                    >
                        {item?.title}
                    </a>
                    <div className="departments-view__item-block">
                        <div className="departments-view__item-image-block">
                            <img
                                className="departments-view__item-image"
                                src={item?.field_image?.image_style_uri?.['210x296']}
                                alt={item?.field_image?.meta?.alt}
                            />
                        </div>
                        <div className="departments-view__item-info">
                            {item?.field_head_of_department?.title && (
                                <a
                                    href={`/${languagePrefix}${item?.field_head_of_department?.path?.alias}`}
                                    className="departments-view__item-head-name"
                                >
                                    {item?.field_head_of_department?.title}
                                </a>
                            )}
                            {item?.field_head_of_department?.field_position_and_rank && (
                                <div className="departments-view__item-head-position">
                                    {item?.field_head_of_department?.field_position_and_rank}
                                </div>
                            )}
                            <ContactInformation type="view" data={item}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
Departments.propTypes = {
    id_departments: PropTypes.number.isRequired,
};
