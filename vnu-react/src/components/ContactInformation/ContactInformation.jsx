import PropTypes from 'prop-types';
import './Contactnformation.scss';

export default function ContactInformation({data, type}) {
    return (
        <div className="contacts">
            {data?.field_location?.length > 0 && (
                <div className="contacts-item">
          <span className="contacts-item__location">
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
            <span className="contacts-item__location-link">
              <a
                  href={`https://www.google.com.ua/maps/search/${type === 'node' ? data?.field_location?.[0]?.value : data?.field_location}`}
              >
              {type === 'node' ? data?.field_location?.[0]?.value : data?.field_location}
            </a>
            </span>
          </span>
                </div>
            )}
            {data?.field_phone?.length > 0 && (
                <div className="contacts-item">
          <span className="contacts-item__phone">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
            >
              <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clipRule="evenodd"
              />
            </svg>
            <span className="contacts-item__phone-link">
              {data?.field_phone?.map((item, index) => (
                  <a key={index} href={`tel:${type === 'node' ? item.value : item}`}>
                      {type === 'node' ? item.value : item}
                  </a>
              ))}
            </span>
          </span>
                </div>
            )}
            {data?.field_email?.length > 0 && (
                <div className="contacts-item">
          <span className="contacts-item__mail">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
              <path
                  d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
            </svg>
            <span className="contacts-item__mail-link">
              {data?.field_email?.map((item, index) => (
                  <a key={index} href={`mailto:${type === 'node' ? item.value : item}`}>
                      {type === 'node' ? item?.value : item}
                  </a>
              ))}
            </span>
          </span>
                </div>
            )}
            {data?.field_wiki && (
                <div className="contacts-item">
          <span className="contacts-item__wiki">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
            <span className="contacts-item__wiki-link">
              <a
                  href={type === 'node' ? data?.field_wiki?.[0]?.full_url : data?.field_wiki?.full_url}
              >
              WIKI
            </a>
            </span>
          </span>
                </div>
            )}
        </div>
    );
}

ContactInformation.propTypes = {
    data: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.array.isRequired]),
    type: PropTypes.string.isRequired,
};
