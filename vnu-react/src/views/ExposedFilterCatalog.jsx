import {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useEducationsQuery} from '../services/api';
import useLanguagePrefix from '../services/languagePrefix';
import {LoadingContext} from '../context/loading-context';

export default function ExposedFilterCatalog({onFilterChange}) {
    const {data: educationsViewData, isFetching} = useEducationsQuery();
    const [formValues, setFormValues] = useState({
        title: '',
        field_form_educations_value: 'All',
        field_educational_level_target_id: 'All',
        field_validity_value: 'All',
        field_faculty_target_id: 'All',
    });
    const handleInputChange = (fieldName, value) => {
        setFormValues((prevValues) => ({...prevValues, [fieldName]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(formValues);
    };

    const {setLoadingValue} = useContext(LoadingContext);
    useEffect(() => {
        if (!isFetching) {
            setLoadingValue({ExposedFilterCatalog: true});
        } else {
            setLoadingValue({ExposedFilterCatalog: false});
        }
    }, [isFetching]);
    const langPrefix = useLanguagePrefix();
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    {(langPrefix === 'en' && 'Search by name') || 'Пошук за назвою'}
                    <input type="text" onChange={(e) => handleInputChange('title', e.target.value)}/>
                </label>
                <label>
                    {(langPrefix === 'en' && 'Form Educations') || 'Форма навчання'}
                    <select
                        onChange={(e) => handleInputChange('field_form_educations_value', e.target.value)}
                    >
                        <option value="All">{(langPrefix === 'en' && 'All') || 'Усі'}</option>
                        {educationsViewData?.exposed_filters?.[1]?.options &&
                            Object.entries(educationsViewData?.exposed_filters?.[1]?.options).map(
                                ([key, value]) => (
                                    <option key={key} value={key}>
                                        {value}
                                    </option>
                                ),
                            )}
                    </select>
                </label>

                <label>
                    {(langPrefix === 'en' && 'Educational Level') || 'Освітній рівень'}
                    <select
                        onChange={(e) => handleInputChange('field_educational_level_target_id', e.target.value)}
                    >
                        <option value="All">{(langPrefix === 'en' && 'All') || 'Усі'}</option>
                        {educationsViewData?.exposed_filters?.[4]?.options &&
                            Object.entries(educationsViewData?.exposed_filters?.[4]?.options).map(
                                ([key, value]) => (
                                    <option key={key} value={key}>
                                        {value}
                                    </option>
                                ),
                            )}
                    </select>
                </label>

                <label>
                    {(langPrefix === 'en' && 'Validity') || 'Чинність'}
                    <select onChange={(e) => handleInputChange('field_validity_value', e.target.value)}>
                        <option value="All">{(langPrefix === 'en' && 'All') || 'Усі'}</option>
                        {educationsViewData?.exposed_filters?.[3]?.options &&
                            Object.entries(educationsViewData?.exposed_filters?.[3]?.options).map(
                                ([key, value]) => (
                                    <option key={key} value={key}>
                                        {value}
                                    </option>
                                ),
                            )}
                    </select>
                </label>

                <label className="filter-faculty">
                    {(langPrefix === 'en' && 'Faculty') || 'Факультет'}
                    <select onChange={(e) => handleInputChange('field_faculty_target_id', e.target.value)}>
                        <option value="All">{(langPrefix === 'en' && 'All') || 'Усі'}</option>
                        {educationsViewData?.exposed_filters?.[2]?.options &&
                            Object.entries(educationsViewData.exposed_filters[2].options).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                    </select>
                </label>

                <button type="submit">{(langPrefix === 'en' && 'Search') || 'Пошук'}</button>
            </form>
        </div>
    );
}

ExposedFilterCatalog.propTypes = {
    onFilterChange: PropTypes.func,
};
