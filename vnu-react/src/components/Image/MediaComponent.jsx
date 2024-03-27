import React, { useContext, useEffect } from 'react';
import { useMediaQuery } from '../../services/api';
import ImageComponent from './ImageComponent';
import { LoadingContext } from '../../context/loading-context';

/**
 * MediaComponent is a React component used for rendering media items such as files, photos, and videos.
 */
export default function MediaComponent({ imagestyle, alt, target_id }) {
  const { data: mediaData, isFetching } = useMediaQuery({ endpoint: `${target_id}` });
  const { setLoadingValue } = useContext(LoadingContext);
  useEffect(() => {
    if (!isFetching) {
      setLoadingValue({ MediaComponent: true });
    } else {
      setLoadingValue({ MediaComponent: false });
    }
  }, [isFetching]);
  return (
    <ImageComponent
      alt={alt}
      imagestyle={imagestyle}
      url={mediaData?.field_media_image?.[0]?.target_id}
    />
  );
}
