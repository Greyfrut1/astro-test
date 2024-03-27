import './NotFoundPage.scss';
import {useContext, useEffect} from 'react';
import useLanguagePrefix from '../../services/languagePrefix';
import {LoadingContext} from '../../context/loading-context';

export default function NotFoundPage() {
    const langPrefix = useLanguagePrefix();
    const {setLoadingValue} = useContext(LoadingContext);
    useEffect(() => {
        setLoadingValue({NotFoundPage: true});
    }, []);
    return (
        <div className="not-found container">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__description">
                {(langPrefix === 'en' && 'The page you are looking for can’t be found') ||
                    'Сторінку, яку ви шукаєте, не знайдено '}
            </p>
        </div>
    );
}
