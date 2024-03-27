import React, { useEffect, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import PropTypes from 'prop-types';
import { useNewsLetterSubscriberQuery } from '../../services/api';
import './Popup.scss';

const Popup = React.memo(({ activationButton, content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useNewsLetterSubscriberQuery();
  const background = data?.data?.field_image?.image_style_uri?.width_862;

  const openModal = () => {
    setIsModalOpen(true);
    disableBodyScroll(document.body);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    enableBodyScroll(document.body);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        // 27 - code Esc
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <>
      <div className="modal-button" onClick={openModal}>
        {activationButton}
      </div>
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={closeModal}>
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundImage: background ? `url(${background})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <button
            className="modal-content__close"
            aria-label="close"
            type="button"
            onClick={closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {content}
        </div>
      </div>
    </>
  );
});

Popup.propTypes = {
  activationButton: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default Popup;
