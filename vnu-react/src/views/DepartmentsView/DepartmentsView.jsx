import {useLocation} from 'react-router-dom';
import MetaTags from '../../components/Common/MetaTags.jsx';
import {useDepartmentsViewQuery} from '../../services/api.js';
import useLanguagePrefix from '../../services/languagePrefix.jsx';
import './DepartmentsView.scss';
import {useContext, useEffect, useState} from 'react';
import {LoadingContext} from '../../context/loading-context.jsx';
import Pager from "../../components/Pager/Pager.jsx";

export default function DepartmentsView() {
    const [filterValues, setFilterValues] = useState({
        title: '',
        page: '',
        field_faculty_target_id: 'All',
    });
    const {data: departmentsViewData, isFetching} = useDepartmentsViewQuery({
        title: `${filterValues.title}`,
        page: `${filterValues.page}`,
        faculty: `${filterValues.field_faculty_target_id}`,
    });
    const location = useLocation();
    const currentPath = location.pathname;
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const searchInputValue = event.target.elements.searchInput.value;
        const selectValue = event.target.elements.facultiesFilter.value;
        setFilterValues({title: searchInputValue, field_faculty_target_id: selectValue});
    };
    const languagePrefix = useLanguagePrefix();
    const {setLoadingValue} = useContext(LoadingContext);
    const handlePage = (currentPage) => {
        setFilterValues({
            page: currentPage,
            title: filterValues.title,
            field_faculty_target_id: filterValues.field_faculty_target_id
        });
        window.scrollTo(0, 0);
    };
    useEffect(() => {
        if (!isFetching) {
            setLoadingValue({EducationalProgramsView: true});
        } else {
            setLoadingValue({EducationalProgramsView: false});
        }
    }, [isFetching]);
    return (
        <div className="departments-page">
            <MetaTags type="view" data={departmentsViewData} viewUrl={currentPath}/>
            <div className="departments-page__header">
                <div className="container">
                    <h1 className="departments-page__title">
                        {(languagePrefix === 'en' && 'Departments') || 'Кафедри'}
                    </h1>
                    <form className="departments-page__filter-form" onSubmit={handleSearchSubmit}>
                        <label className="departments-page__faculties-filter">
                            <select name="facultiesFilter">
                                <option value={`All`}>{(languagePrefix === 'en' && 'All') || 'Всі'}</option>

                                {departmentsViewData?.exposed_filters?.[0]?.options &&
                                    Object.entries(departmentsViewData.exposed_filters[0].options).map(
                                        ([key, value]) => (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        ),
                                    )}
                            </select>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="46"
                                height="37"
                                viewBox="0 0 46 37"
                                fill="none"
                            >
                                <path
                                    d="M37.0444 13.7119C36.3647 13.0953 35.3451 13.0953 34.6654 13.7119L28.7179 19.1078L22.7704 13.7119C22.0907 13.0953 21.0711 13.0953 20.3914 13.7119C19.7117 14.3286 19.7117 15.2536 20.3914 15.8703L27.5284 22.3453C27.8682 22.6536 28.2081 22.8078 28.7179 22.8078C29.2277 22.8078 29.5675 22.6536 29.9074 22.3453L37.0444 15.8703C37.7241 15.2536 37.7241 14.3286 37.0444 13.7119Z"
                                    fill="#561111"
                                />
                            </svg>
                        </label>
                        <label className="departments-page__search">
                            <input
                                name="searchInput"
                                placeholder={(languagePrefix === 'en' && 'Search') || 'Пошук'}
                                type="text"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="35"
                                height="28"
                                viewBox="0 0 50 50"
                                fill="currentColor"
                            >
                                <path
                                    d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/>
                            </svg>
                            <button type="submit">{(languagePrefix === 'en' && 'Search') || 'Пошук'}</button>
                        </label>
                    </form>
                </div>
            </div>
            <div className="departments-page__result-container container">
                {(departmentsViewData?.rows?.length > 0 &&
                        departmentsViewData?.rows?.map((item, index) => (
                            <div className="departments-page__result-item" key={index}>
                                <div className="departments-page__result-title">{item?.title}</div>
                                <div className="departments-page__result-faculty">{item?.title_2}</div>
                                <a className="departments-page__result-link" href={item?.view_node}>
                                    {(languagePrefix === 'en' && 'Read more') || 'Детальніше'}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="10"
                                        viewBox="0 0 32 10"
                                        fill="none"
                                    >
                                        <path
                                            d="M22.7921 9.90829L21.2923 9.08333L27.6551 5.58332L0 5.58332L0 5.58329L0 4.41662L0 4.41658L27.6549 4.41658L21.2923 0.916688L22.7921 0.0917196L31.7151 5.00001L22.7921 9.90829Z"
                                            fill="#561111"
                                        />
                                    </svg>
                                </a>
                            </div>
                        ))) ||
                    'No results'}
            </div>
            {departmentsViewData?.pager?.total_pages > 1 &&
                <Pager totalPages={departmentsViewData?.pager?.total_pages} onPageChange={handlePage}/>}
        </div>
    );
}
