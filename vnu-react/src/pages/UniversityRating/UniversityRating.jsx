import './UniversityRating.scss';
import {Link} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import {useUniversityRatingViewQuery} from '../../services/api';
import {LoadingContext} from '../../context/loading-context';
import useTotalPages from "../../services/pager.jsx";
import Pager from "../../components/Pager/Pager.jsx";

export default function UniversityRating() {
    const [currentPage, setCurrentPage] = useState(0);
    const {data: ratingView, isFetching} = useUniversityRatingViewQuery({page: `page_1?page=${currentPage}`});
    const {setLoadingValue} = useContext(LoadingContext);
    const totalPages = useTotalPages(
        ratingView?.meta?.pager?.count,
        ratingView?.meta?.pager?.configurations?.items_per_page,
    );
    const handlePage = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        if (!isFetching) {
            setLoadingValue({UniversityRating: true});
        } else {
            setLoadingValue({UniversityRating: false});
        }
    }, [isFetching]);
    return (
        <div className="rating container">
            <div className="rating-view">
                {ratingView?.data?.map((item, index) => (
                    <div key={index}>
                        <Link to={item?.field_link?.full_url} className="rating-item">
                            <img
                                src={item?.field_image?.image_style_uri?.photoalbums_}
                                alt={item?.field_image?.meta?.alt}
                            />
                            <h1 className="rating-item__title">{item?.title}</h1>
                            <p className="rating-item__top-description">{item?.field_top_description}</p>
                            <p className="rating-item__bottom-description">{item?.field_bottom_description}</p>
                        </Link>
                    </div>
                ))}
                {totalPages > 1 && <Pager totalPages={totalPages} onPageChange={handlePage}/>}
            </div>
        </div>
    );
}
