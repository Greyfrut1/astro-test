import { useEffect, useState } from 'react';
import axios from 'axios';
import useLanguagePrefix from '../../../services/languagePrefix';
import './FooterBottom.scss';
import SocialLinks from '../../../components/SocialLinks';
import { useLocation } from 'react-router-dom';
import Subscriber from '../../Subscriber/Subscriber';
import Popup from '../../../components/Popup/Popup';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

const baseURL = import.meta.env.VITE_BACKEND_URL;

export default function FooterBottom() {
  // State for storing the current date and time.
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [activeUsersData, setActiveUsersData] = useState(null);

  const fetchActiveUsersData = async () => {
    try {
      const response = await axios.get(`${baseURL}/google-analytics-data`);
      setActiveUsersData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const langPrefix = useLanguagePrefix();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedTime = currentDateTime.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  useEffect(() => {
    fetchActiveUsersData();
    const intervalId = setInterval(() => {
      fetchActiveUsersData();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const location = useLocation();
  const isUnsubscribePage = location.pathname.startsWith('/simplenews/remove/');
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
  return (
    <div className="footer-bottom">
      <div className="footer-bottom__block container">
        {isMobile ? (
          <SocialLinks />
        ) : (
          <>
            <div className="footer-bottom__block-time">
              <span>
                {(langPrefix === 'en' && 'Date: ') || 'Дата: '}
                {langPrefix === 'uk' && (
                  <>{format(new Date(formattedDate), 'MMMM dd, yyyy', { locale: uk })}</>
                )}
                {langPrefix === 'en' && <>{format(new Date(formattedDate), 'MMMM dd, yyyy')}</>}
              </span>
              <span className="time">
                {(langPrefix === 'en' && 'Time: ') || 'Час: '}
                {formattedTime}
              </span>
              <span className="online">
                {activeUsersData?.active_users !== '0' && (
                  <>
                    {(langPrefix === 'en' && 'Online: ') || 'Онлайн: '}
                    {activeUsersData?.active_users}
                  </>
                )}
              </span>
            </div>
            <SocialLinks />
            {!isUnsubscribePage && (
              <Popup
                activationButton={
                  <button type="submit">
                    {(langPrefix === 'en' && 'Subscribe') || (langPrefix === 'uk' && 'Підписатися')}
                  </button>
                }
                content={<Subscriber />}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
