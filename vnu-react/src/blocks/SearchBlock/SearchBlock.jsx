import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLanguagePrefix from '../../services/languagePrefix';
import './SearchBlock.scss';
import { usePopularRequestsQuery } from '../../services/api';

export default function SearchBlock() {
  const [input, setInput] = useState('');
  const langPrefix = useLanguagePrefix();
  const [showSearch, setShowSearch] = useState(false);
  const [expandedLinks, setExpandedLinks] = useState({});
  const [isMobile, setIsMobile] = useState(true); // Initially set to true

  const { data } = usePopularRequestsQuery();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 775);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/${langPrefix}/search/${input}`;
    setInput('');
    setShowSearch(false);
  };

  const toggleLinks = (index) => {
    setExpandedLinks((prevExpandedLinks) => ({
      ...prevExpandedLinks,
      [index]: !prevExpandedLinks[index],
    }));
  };

  return (
    <div
      style={{ display: isMobile && showSearch ? 'block' : 'none' }}
      className="search-form-dialog"
    >
      <div className="search-form-dialog__block">
        <div className="search-form-block__title">
          {(langPrefix === 'en' && 'What are you interested in?') || 'Що вас цікавить?'}
        </div>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            placeholder={(langPrefix === 'en' && 'Search') || 'Пошук'}
            required
            className="search-input"
            type="text"
            value={input}
            onChange={handleInputChange}
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="42"
              viewBox="0 0 40 42"
              fill="none"
            >
              <path
                d="M15.7143 0C24.393 0 31.4286 7.2961 31.4286 16.2963C31.4286 20.2631 30.0619 23.8988 27.7902 26.7248L39.5816 38.9524C40.1395 39.531 40.1395 40.469 39.5816 41.0476C39.0857 41.5618 38.3159 41.619 37.7591 41.219L37.5613 41.0476L25.7703 28.8194C23.0453 31.1753 19.5394 32.5926 15.7143 32.5926C7.03553 32.5926 0 25.2965 0 16.2963C0 7.2961 7.03553 0 15.7143 0ZM15.7143 2.96296C8.61348 2.96296 2.85714 8.9325 2.85714 16.2963C2.85714 23.6601 8.61348 29.6296 15.7143 29.6296C22.8151 29.6296 28.5714 23.6601 28.5714 16.2963C28.5714 8.9325 22.8151 2.96296 15.7143 2.96296Z"
                fill="#561111"
              />
            </svg>
          </button>
        </form>
        <div className="search-form-dialog__menu-block">
          <div className="search-form-dialog__menu-block_title">
            {(langPrefix === 'en' && 'Popular requests') || 'Популярні запити'}
          </div>
          <div className="popular-request-block">
            {data?.map((item, index) => (
              <div
                key={index}
                className="popular-request-column"
                onClick={() => toggleLinks(index)}
              >
                <div className="popular-request-title">
                  {item?.link?.title}
                  {isMobile && (
                    <svg
                      style={{
                        transform: expandedLinks[index]
                          ? ' translateY(-60%) translateX(-3px)'
                          : ' translateY(-45%) rotate(-90deg)',
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="21"
                      viewBox="0 0 24 21"
                      fill="none"
                    >
                      <path
                        d="M19.3275 7.78252C18.9729 7.43252 18.441 7.43252 18.0863 7.78252L14.9833 10.845L11.8802 7.78252C11.5256 7.43252 10.9937 7.43252 10.639 7.78252C10.2844 8.13252 10.2844 8.65752 10.639 9.00752L14.3627 12.6825C14.54 12.8575 14.7173 12.945 14.9833 12.945C15.2493 12.945 15.4266 12.8575 15.6039 12.6825L19.3275 9.00752C19.6822 8.65752 19.6822 8.13252 19.3275 7.78252Z"
                        fill="white"
                      />
                    </svg>
                  )}
                </div>
                <div
                  className="popular-request-links"
                  style={{ display: expandedLinks[index] || !isMobile ? 'block' : 'none' }}
                >
                  {item?.subtree?.map((subItem, subIndex) => (
                    <div key={subIndex} className="popular-request-link">
                      <a href={subItem?.link?.url}>{subItem?.link?.title}</a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
