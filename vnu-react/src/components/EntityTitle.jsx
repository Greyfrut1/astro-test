import PropTypes from 'prop-types';
import {useEntityDataQuery} from '../services/api';
import useLanguagePrefix from "../services/languagePrefix.jsx";

export default function EntityTitle({endpoint}) {
    const {data} = useEntityDataQuery({endpoint: `${endpoint}`});
    const langPrefix = useLanguagePrefix();
    return (
        <a href={`/${langPrefix}${data?.data?.attributes?.path?.alias}`}>
            {data?.data?.type === 'node--faculty' && <>{data?.data?.attributes?.title}</>}
            {data?.data?.type === 'node--staff' && <>{data?.data?.attributes?.title}</>}
            {(data?.data?.type === 'taxonomy_term--educational_level' ||
                data?.data?.type === 'taxonomy_term--specialty' ||
                data?.data?.type === 'taxonomy_term--main_disciplines') && (
                <>{data?.data?.attributes?.name}</>
            )}
        </a>
    );
}

EntityTitle.propTypes = {
    endpoint: PropTypes.string.isRequired,
};
