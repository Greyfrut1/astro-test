import React from 'react';
import PropTypes from 'prop-types';

export default function YoutubeEmbed({ embedId }) {
  const videoCode = embedId.split('v=')[1];

  return (
    <div className="video-responsive">
      <iframe
        src={`https://www.youtube.com/embed/${videoCode}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};
