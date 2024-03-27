import './ActualNewsBlock.scss';

export default function ActualNewsBlock({data}) {
    return (
        <div className="actual-news">
            <div className="actual-news__block container">
                {data?.data?.map((article, index) => (
                    <a href={`/uk${article?.path?.alias}`} key={index} className="actual-news__item">
                        <img src={article?.field_image?.image_style_uri?.['actual_news']}
                             alt={article?.field_image?.meta.alt}/>
                        <div className="actual-news__item-content">
                            <a href={`/uk${article?.path?.alias}`}>{article?.title}</a>
                            <hr/>
                            <p className="actual-news__item-summary">{article?.field_description?.summary}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
