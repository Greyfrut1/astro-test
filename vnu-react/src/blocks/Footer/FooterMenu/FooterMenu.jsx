import { useFooterMenuQuery } from '../../../services/api';
import './FooterMenu.scss';
import { useEffect, useState } from 'react';

export default function FooterMenu() {
  const { data: footerMenuData } = useFooterMenuQuery();
  const [showDropdown, setShowDropdown] = useState(true);
  const [activeItem, setActiveItem] = useState(null);

  const handleToggleDropdown = (item) => {
    setActiveItem((activeItem !== item && item) || null);
  };

  const handleClick = (item) => {
    setActiveItem((activeItem !== item && item) || null);
  };

  return (
    <nav className={`footer-menu${showDropdown ? ' show-dropdown' : ''}`}>
      {footerMenuData?.map((item) => (
        <ul key={item?.link?.meta_data?.entity_id} className="menu-list">
          <li className={`level-one${item?.has_children ? ' with-children' : ''}`}>
            <span className="level-one__link" onClick={() => handleToggleDropdown(item)}>
              {item?.link?.title}
              {item?.has_children && (
                <span className={`arrow-icon ${activeItem === item ? 'active' : ''}`}>
                  {item?.has_children && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 main-menu__chevron"
                      onClick={() => handleClick(item)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  )}
                </span>
              )}
            </span>
            {item?.has_children && (
              <div className={`second-level ${showDropdown && activeItem === item ? 'show' : ''}`}>
                {item?.subtree?.map((item2) => (
                  <ul key={item2?.link?.meta_data?.entity_id} className="sub-menu-list">
                    {item2?.link?.url ? (
                      item2?.link?.options ? (
                        <li>
                          <a
                            target={item2?.link?.options?.attributes?.target}
                            className="second-level__link"
                            href={item2?.link?.url}
                          >
                            {item2?.link?.title}
                          </a>
                        </li>
                      ) : (
                        <li>
                          <a className="second-level__link" href={item2?.link?.url}>
                            {item2?.link?.title}
                          </a>
                        </li>
                      )
                    ) : (
                      <li>
                        <span className="second-level__link">{item2?.link?.title}</span>
                      </li>
                    )}
                  </ul>
                ))}
              </div>
            )}
          </li>
        </ul>
      ))}
    </nav>
  );
}
