import {useFooterInfoBlockQuery} from '../../../services/api';
import {Link} from 'react-router-dom';
import './FooterInfoBlock.scss';
import {Icon} from '@iconify/react';
import React, {useEffect, useState} from 'react';
import MapComponent from '../../../components/Common/MapComponent';

export default function FooterInfoBlock() {
    const {data} = useFooterInfoBlockQuery();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
        <>
            {isMobile ? (
                <>
                    <div className="footer-map">
                        <MapComponent
                            urlSuffix={data?.data?.field_location}
                            zoom={'15'}
                        />
                    </div>
                    <div className="footer-info">
                        <div className="footer-info__logo">
                            <img
                                src={data?.data?.field_image?.image_style_uri?.logo_imagestyle}
                                alt={data?.data?.field_image?.meta?.alt}
                            />
                            <div className="footer-info__logo-title">
                                <span className="footer-info__logo-text">{data?.data?.field_main_text}</span>
                                <br/>
                                <span className="footer-info__logo-second">{data?.data?.field_second_text}</span>
                            </div>
                        </div>
                        <div className="footer-info__contact">
              <span className="footer-info__contact-address">
                <Icon icon="formkit:email"/>
                <Link to={`mailto: ${data?.data?.field_email}`}>{data?.data?.field_email}</Link>
              </span>
                            <span className="footer-info__contact-address">
                <Icon icon="la:phone"/>
                <Link to={`tel:${data?.data?.field_phone}`}>{data?.data?.field_phone} </Link>
              </span>
                        </div>
                    </div>
                </>
            ) : (
                <div className="footer-info">
                    <div className="footer-info__logo">
                        <img
                            src={data?.data?.field_image?.image_style_uri?.logo_imagestyle}
                            alt={data?.data?.field_image?.meta?.alt}
                        />
                        <div className="footer-info__logo-title">
                            <span className="footer-info__logo-text">{data?.data?.field_main_text}</span>
                            <br/>
                            <span className="footer-info__logo-second">{data?.data?.field_second_text}</span>
                        </div>
                    </div>
                    <div className="footer-info__contact">
            <span className="footer-info__contact-address">
              <Icon icon="formkit:email"/>
              <Link to={`mailto: ${data?.data?.field_email}`}>{data?.data?.field_email}</Link>
            </span>
                        <span className="footer-info__contact-address">
              <Icon icon="la:phone"/>
              <Link to={`tel:${data?.data?.field_phone}`}>{data?.data?.field_phone} </Link>
            </span>
                    </div>
                    <div className="footer-info__map">
                        <MapComponent
                            urlSuffix={data?.data?.field_location}
                            zoom={'15'}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
