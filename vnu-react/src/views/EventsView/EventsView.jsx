import './EventsView.scss';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import useLanguagePrefix from '../../services/languagePrefix';

export default function EventsView({ data }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const langPrefix = useLanguagePrefix();
    return (
        <>
            {data?.rows?.length > 0 ? (
                <>
                    {isMobile
                        ? data?.rows?.map((item, index) => (
                            <div key={index} className="events-item">
                                <div className="events-item__start">
                                    {item?.field_start_date && (
                                        <>
                                            {langPrefix === 'uk' && (
                                                <>
                                                    {format(new Date(item?.field_start_date), 'MMMM', {locale: uk})}
                                                    <p className="events-item__start-date">
                                                        {format(new Date(item?.field_start_date), 'dd,', {locale: uk})}
                                                    </p>
                                                    {format(new Date(item?.field_start_date), 'HH:mm', {locale: uk})}
                                                </>
                                            )}
                                            {langPrefix === 'en' && (
                                                <>
                                                    {format(new Date(item?.field_start_date), 'MMMM')}
                                                    <p className="events-item__start-date">
                                                        {format(new Date(item?.field_start_date), 'dd,')}
                                                    </p>
                                                    {format(new Date(item?.field_start_date), 'HH:mm')}
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                                <div className="events-item__info">
                                    <a className="events-item__info-title" href={item?.view_node}>
                                        <p dangerouslySetInnerHTML={{__html: item?.title}}/>
                                    </a>
                                    <p className="events-item__info-description">{item?.field_description}</p>
                                    {item?.field_location && (
                                        <span className="events-item__info-location">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6"
                                    >
                                            <path
                                                fillRule="evenodd"
                                                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                       <a
                                           target="_blank"
                                           href={`https://www.google.com.ua/maps/search/${item?.field_location}`}
                                           rel="noreferrer"
                                       >
                                         {item?.field_location}
                                    </a>
                                    </span>
                                    )}
                                </div>
                            </div>
                        ))
                        : data?.rows?.map((item, index) => (
                            <div key={index} className="events-item">
                                <div className="events-item__start">
                                    <div className="events-item__start-month">
                                        {item?.field_start_date && (
                                            <>
                                                {langPrefix === 'uk' && (
                                                    <>{format(new Date(item?.field_start_date), 'MMMM', {locale: uk})}</>
                                                )}
                                                {langPrefix === 'en' && (
                                                    <>{format(new Date(item?.field_start_date), 'MMMM')}</>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    {item?.field_start_date && (
                                        <p className="events-item__start-date">
                                            {format(new Date(item?.field_start_date), 'dd')}
                                        </p>
                                    )}
                                </div>
                                <div className="events-item__info">
                                    <a className="events-item__info-title" href={item?.view_node}>
                                        <p dangerouslySetInnerHTML={{__html: item?.title}}/>
                                    </a>
                                    <p className="events-item__info-description">{item?.field_description}</p>
                                    {item?.field_location && (
                                        <span className="events-item__info-location">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6"
                                    >
                                            <path
                                                fillRule="evenodd"
                                                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                       <a
                                           target="_blank"
                                           href={`https://www.google.com.ua/maps/search/${item?.field_location}`}
                                           rel="noreferrer"
                                       >
                                         {item?.field_location}
                                    </a>
                                    </span>
                                    )}
                                </div>
                                {item?.field_start_date && (
                                    <p className="events-item__time">
                                        {format(new Date(item?.field_start_date), 'HH:mm')}
                                    </p>
                                )}
                            </div>
                        ))}
                </>
            ) : (
                <p className="event-no-results">
                    {(langPrefix === 'en' && 'At the moment, there are no scheduled events') ||
                        'На даний момент немає запланованих подій'}
                </p>
            )}
        </>
    );
}
