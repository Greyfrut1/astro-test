import {OpenInNew} from '@mui/icons-material';
import {useLocation} from 'react-router-dom';
import MetaTags from '../../components/Common/MetaTags';
import './UkraineAboveAll.scss';
import {useUkraineAboveAllViewQuery} from '../../services/api';
import {useContext, useEffect, useState} from 'react';
import {LoadingContext} from '../../context/loading-context';
import useLanguagePrefix from '../../services/languagePrefix.jsx';
import Pager from "../../components/Pager/Pager.jsx";
import useTotalPages from "../../services/pager.jsx";

export default function UkraineAboveAll() {
    const [currentPage, setCurrentPage] = useState(0);
    const {data, isFetching} = useUkraineAboveAllViewQuery({page: `page_1?page=${currentPage}`});
    const location = useLocation();
    const languagePrefix = useLanguagePrefix();
    const currentPath = location.pathname;
    const {setLoadingValue} = useContext(LoadingContext);
    useEffect(() => {
        if (!isFetching) {
            setLoadingValue({UkraineAboveAll: true});
        } else {
            setLoadingValue({UkraineAboveAll: false});
        }
    }, [isFetching]);
    const totalPages = useTotalPages(
        data?.meta?.pager?.count,
        data?.meta?.pager?.configurations?.items_per_page,
    );
    const handlePage = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }
    return (
        <div className="ukraine-above-all container">
            <MetaTags type="view" data={data} viewUrl={currentPath}/>
            <h2 className="ukraine-above-all__title">
                {' '}
                {(languagePrefix === 'en' && 'OUR HEROES: YESTERDAY, TODAY, TOMORROW') ||
                    'НАШІ ГЕРОЇ: ВЧОРА, СЬОГОДНІ, ЗАВТРА'}{' '}
            </h2>
            <div className="ukraine-above-all__view">
                {data?.data?.map((item) => (
                    <div key={item?.id} className="ukraine-above-all__item">
                        <a href={`/${languagePrefix}${item?.path?.alias}`} className="ukraine-above-all__link">
                            <OpenInNew className="ukraine-above-all__item-icon"/>
                            <img
                                className="albums-card__img"
                                src={item?.field_image?.image_style_uri?.news_440x232}
                                alt={item?.field_image?.meta?.alt}
                            />
                            <div className="ukraine-above-all__item-title">{item?.title}</div>
                        </a>
                    </div>
                ))}
            </div>
            {totalPages > 1 && <Pager totalPages={totalPages} onPageChange={handlePage}/>}
        </div>
    );
}
