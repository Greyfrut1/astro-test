import PropTypes from 'prop-types';
import {useContext, useEffect} from 'react';
import {useFileQuery} from '../../services/api';
import {LoadingContext} from '../../context/loading-context';

export default function ImageComponent({url, imagestyle, alt}) {
    const {data: fileData, isFetching} = useFileQuery({endpoint: `${url}`});
    const imageSource = imagestyle
        ? fileData?.image_style_uri?.[0]?.[imagestyle]
        : `${fileData?.uri?.[0]?.url}`;
    const {setLoadingValue} = useContext(LoadingContext);
    useEffect(() => {
        if (!isFetching) {
            setLoadingValue({[`ImageComponent${url}`]: true});
        } else {
            setLoadingValue({[`ImageComponent${url}`]: false});
        }
    }, [isFetching]);
    return <>{url && imageSource && <img src={imageSource} alt={alt}/>}</>;
}

ImageComponent.propTypes = {
    url: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imagestyle: PropTypes.string,
    alt: PropTypes.string,
};
