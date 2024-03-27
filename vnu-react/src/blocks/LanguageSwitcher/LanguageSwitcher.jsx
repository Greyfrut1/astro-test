import { useEffect, useState } from 'react';
import axios from 'axios';
import './LanguageSwitcher.scss';

const baseURL = import.meta.env.VITE_BACKEND_URL;

export default function LanguageSwitcher() {
  const currentLang = window.location.pathname.split('/')[1];
  const currentUrl = window.location.pathname;
  const urlParts = currentUrl.split('/');
  const type = window.location.pathname.split('/')[2];
  const alias = window.location.pathname.split('/')[3];
  const slicedUrl = urlParts.slice(2).join('/');

  // State variables for data, loading state, and switching language
  const [data, setData1] = useState(null);
  const [error, setError] = useState(null);

  // Effect to fetch data based on the current language and URL
  useEffect(() => {
    const fetchData1 = async () => {
      try {
        if (type !== 'simplenews' && type !== 'search' && slicedUrl) {
          const response = await axios.get(`${baseURL}/${currentLang}/${slicedUrl}?_format=json`);
          setData1(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData1();
  }, []);

  // Switching the language
  let switchLang;
  if (currentLang === 'uk') {
    switchLang = 'en';
  } else if (currentLang === 'en') {
    switchLang = 'uk';
  }

  // State variables for another set of data and loading state
  const [data2, setData2] = useState(null);

  // Effect to fetch data based on the switched language and alias
  useEffect(() => {
    const fetchData2 = async () => {
      try {
        if (data && alias) {
          const response = await axios.get(
            `${baseURL}/${switchLang}/node/${data?.nid?.[0].value}?_format=json`,
          );
          setData2(response.data);
          if (response.data.langcode[0].value !== switchLang) {
            setError(true);
          }
        }
      } catch (error2) {
        console.error('Error fetching data:', error2);
      }
    };

    fetchData2();
  }, [data]);

  // Rendering the language switcher based on conditions.
  return (
    <div className="language-switcher">
      {currentLang === 'uk' && (
        <a className="active" href={`${currentUrl}`}>
          UA
        </a>
      )}
      {(alias && !error && (
        <>
          {(data2?.path?.[0].alias && (
            <a href={`/${switchLang}${data2?.path?.[0].alias}`}>
              {(currentLang === 'en' && 'UA') || 'EN'}
            </a>
          )) || (
            <a href={`/${switchLang}/${slicedUrl}`}>{(currentLang === 'en' && 'UA') || 'EN'}</a>
          )}
        </>
      )) ||
        (!alias && slicedUrl && (
          <a href={`/${switchLang}/${slicedUrl}`}>{(currentLang === 'en' && 'UA') || 'EN'}</a>
        )) ||
        (!alias && !slicedUrl && (
          <a href={`/${switchLang}`}>{(currentLang === 'en' && 'UA') || 'EN'}</a>
        ))}
      {currentLang === 'en' && (
        <a className="active" href={`${currentUrl}`}>
          EN
        </a>
      )}
    </div>
  );
}
