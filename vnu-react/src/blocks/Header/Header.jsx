import {useState} from 'react';
import {useHeaderLogoQuery} from '../../services/api';
import useLanguagePrefix from '../../services/languagePrefix';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import Menu from '../HeaderMenu/HeaderMenu';
import TopHeaderMenu from '../TopHeaderMenu/TopHeaderMenu';
import './Header.scss';
import SearchBlock from '../SearchBlock/SearchBlock';

export default function Header() {
    const {data: headerLogoBlockData} = useHeaderLogoQuery();
    const [showMenuDialog, setShowMenuDialog] = useState(false);
    const langPrefix = useLanguagePrefix();
    const [showSearch, setShowSearch] = useState(false);
    const toggleMenuDialog = () => {
        setShowMenuDialog(!showMenuDialog);
        if (showMenuDialog) {
            document.body.style.overflow = 'unset';
        } else {
            document.body.style.overflow = 'hidden';
            if (showSearch) {
                setShowSearch(!showSearch);
            }
            document.querySelector('.search-form-dialog').style.display = 'none';
            document.querySelector('header').style.backgroundColor = '#561111';
            document.querySelector('header').style.zIndex = 'unset';
        }
    };
    const handleSearch = () => {
        setShowSearch(!showSearch);
        if (!showSearch) {
            document.querySelector('.search-form-dialog').style.display = 'flex';
            document.querySelector('header').style.zIndex = '1500';
            document.querySelector('header').style.backgroundColor = 'transparent';
            document.body.style.overflow = 'hidden';
            setShowMenuDialog(false);
        } else {
            document.querySelector('.search-form-dialog').style.display = 'none';
            document.querySelector('header').style.backgroundColor = '#561111';
            document.querySelector('header').style.zIndex = 'unset';
            document.body.style.overflow = 'unset';
            setShowMenuDialog(false);
        }
    };
    return (
        <>
            <div className="header-block">
                <header className="header">
                    <div
                        className={`header__burger-bar ${showMenuDialog ? 'show' : ''}`}
                        onClick={toggleMenuDialog}
                    >
                        <div/>
                        <div/>
                        <div/>
                    </div>
                    <div className="header__logo-block">
                        <a href={`/${langPrefix}`}>
                            <img
                                src={headerLogoBlockData?.data?.field_image.image_style_uri?.thumbnail}
                                alt={headerLogoBlockData?.data?.field_image.meta.alt}
                            />
                            <div className="header__logo-text">
                                <span>{headerLogoBlockData?.data?.field_main_text}</span>
                                <br/>
                                <span className="header__logo-second-text">
                  {headerLogoBlockData?.data?.field_second_text}
                </span>
                            </div>
                        </a>
                    </div>
                    <div className="header__right-block">
                        <LanguageSwitcher/>
                        {!showSearch && (
                            <svg
                                onClick={handleSearch}
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="35"
                                height="28"
                                viewBox="0 0 50 50"
                                fill="currentColor"
                            >
                                <path
                                    d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/>
                            </svg>
                        )}
                        {showSearch && (
                            <svg
                                onClick={handleSearch}
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                viewBox="0 0 40 40"
                                fill="none"
                            >
                                <path
                                    d="M26.75 12.8884L24.8616 11L17.375 18.4866L9.88839 11L8 12.8884L15.4866 20.375L8 27.8616L9.88839 29.75L17.375 22.2634L24.8616 29.75L26.75 27.8616L19.2634 20.375L26.75 12.8884Z"
                                    fill="white"
                                />
                            </svg>
                        )}
                    </div>
                </header>
                <SearchBlock/>
            </div>
            <div className={`menu-dialog ${showMenuDialog ? 'show' : ''}`}>
                <div className="menu-dialog-header">
                    <div className={`menu-cross ${showMenuDialog ? 'show' : ''}`} onClick={toggleMenuDialog}>
                        <div/>
                        <div/>
                    </div>
                </div>
                <div className="menu_container">
                    <Menu/>
                </div>
                <TopHeaderMenu/>
            </div>
        </>
    );
}
