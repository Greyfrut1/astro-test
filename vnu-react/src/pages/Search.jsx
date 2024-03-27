import {useNavigate, useParams} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import parse from 'html-react-parser';
import {useSearchQuery} from '../services/api';
import useLanguagePrefix from '../services/languagePrefix';
import {LoadingContext} from '../context/loading-context';

export default function Search() {
    const {result} = useParams();
    const navigate = useNavigate();
    const [inputValue2, setInputValue2] = useState(result);

    useEffect(() => {
        setInputValue2(result);
    }, [result]);

    const {data: search, isFetching} = useSearchQuery({result: `${result}`});

    const langPrefix = useLanguagePrefix();
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/${langPrefix}/search/${inputValue2}`);
    };

    const handleInputChange = (event) => {
        setInputValue2(event.target.value);
    };
    const {setLoadingValue} = useContext(LoadingContext);
    useEffect(() => {
        if (!isFetching) {
            setLoadingValue({Search: true});
        } else {
            setLoadingValue({Search: false});
        }
    }, [isFetching]);
    return (
        <div className="search-page container">
            <h1 className="search-page__title">
                {(langPrefix === 'en' && 'Search results') || 'Результати пошуку'}
            </h1>
            <form className="search-page__form" onSubmit={handleSubmit}>
                <input
                    placeholder={(langPrefix === 'en' && 'Search') || 'Пошук'}
                    className="enter"
                    type="text"
                    required
                    value={inputValue2}
                    onChange={handleInputChange}
                />
                <button type="submit">{(langPrefix === 'en' && 'Search') || 'Пошук'}</button>
            </form>
            <div className="search-page__result-block">
                {search?.rows?.length > 0 && search?.rows?.map((item, index) => (
                    <div className="search-page__result" key={index}>
                        <div className="search-page__result-title">{parse(item?.title).props.children}</div>
                        <a className="search-page__result-link" href={parse(item?.title).props.href}>
                            {(langPrefix === 'en' && 'Read more') || 'Докладніше'}
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
                )) || <span>{langPrefix === 'en' && 'No results' || 'Немає результатів пошуку'}</span>}
            </div>
        </div>
    );
}
