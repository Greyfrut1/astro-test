import PropTypes from 'prop-types';
import { useTaxonomyTypeInfoQuery } from '../../services/api';
import useLanguagePrefix from '../../services/languagePrefix';
import './TypeFilterButtons.scss';

export default function TypeFilterButtons({ handleTypeInformation }) {
  const { data: typeData } = useTaxonomyTypeInfoQuery();
  const langPrefix = useLanguagePrefix();

  return (
    <select className="type-filter__select" onChange={(e) => handleTypeInformation(e.target.value)}>
      <option value="All">{(langPrefix === 'en' && 'Category') || 'Категорії'}</option>
      {typeData?.data?.map((item, index) => (
        <option key={index} value={item.attributes.drupal_internal__tid}>
          {item.attributes.name}
        </option>
      ))}
    </select>
  );
}

TypeFilterButtons.propTypes = {
  handleTypeInformation: PropTypes.func.isRequired,
};
