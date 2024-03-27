import React, {useRef, useState} from 'react';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
import './LightBox.scss';
import ImageComponent from "./ImageComponent.jsx";

export default function LightBox({data}) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const bodyRef = useRef(document.body);
    const openLightbox = (index) => {
        setSelectedImageIndex(index);
        setLightboxOpen(true);
        disableBodyScroll(bodyRef.current);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        enableBodyScroll(bodyRef.current);
    };

    const handlePrev = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === 0 ? data.field_photos.length - 1 : prevIndex - 1,
        );
    };

    const handleNext = () => {
        setSelectedImageIndex((prevIndex) =>
            prevIndex === data.field_photos.length - 1 ? 0 : prevIndex + 1,
        );
    };

    return (
        <>
            <div className="gallery">
                {data?.field_photos?.map((item, index) => (
                    <div className="gallery__img" key={index} onClick={() => openLightbox(index)}>
                        {item?.target_id && (
                            <ImageComponent
                                alt={item?.alt}
                                imagestyle="small_large_photoalbums_134_172_"
                                url={item?.target_id}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="lightbox">
                    <div className="lightbox-content flex sm:justify-center justify-between">
                        <div className="lightbox-left">
                            <button onClick={handlePrev} className="button-prev">
                                &#8249;
                            </button>
                        </div>
                        <div className="lightbox-center">
                            <ImageComponent
                                alt={data?.field_photos[selectedImageIndex]?.alt}
                                imagestyle="453x491"
                                url={data?.field_photos[selectedImageIndex]?.target_id}
                            />
                        </div>
                        <div className="lightbox-right">
                            <button onClick={closeLightbox} className="button-close">
                                &#10005;
                            </button>
                            <button onClick={handleNext} className="button-next">
                                &#8250;
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
