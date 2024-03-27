import PropTypes from 'prop-types';
import React from 'react';
import {useFileQuery} from "../services/api.js";

export default function FileComponent({url, title}) {
    const {data} = useFileQuery({endpoint: `${url}`});
    return (
        <a href={data?.uri?.[0].url} target="_blank">
            {title}
        </a>
    );
}

FileComponent.propTypes = {
    url: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
