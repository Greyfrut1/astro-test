import {useParams} from 'react-router-dom';
import React, {useContext, useEffect} from 'react';
import MetaTags from '../../components/Common/MetaTags';
import { useEnsemblesPageQuery } from '../../services/api';
import { LoadingContext } from '../../context/loading-context';
import { AliasContext } from '../../context/alias';
import SanitizedHtml from '../../components/Common/SanitizedHtml';
import ImageComponent from "../../components/Image/ImageComponent.jsx";
import './EmsemblesPage.scss';

export default function EnsemblesPage() {
    const {alias} = useParams();
    const {data: ensembles, isFetching} = useEnsemblesPageQuery({page: `${alias}`});
    const {setLoadingValue} = useContext(LoadingContext);
    const {updateAlias} = useContext(AliasContext);
    useEffect(() => {
        if (!isFetching) {
            updateAlias(ensembles?.title?.[0]?.value);
            setLoadingValue({EnsemblesPage: true});
        } else {
            setLoadingValue({EnsemblesPage: false});
        }
    }, [isFetching]);
    return (
        <>
            <MetaTags type="content" data={ensembles} />
            {/* 280X280 */}
            <div className={'container'}>
                {ensembles?.field_image?.[0]?.target_id && <ImageComponent url={ensembles?.field_image?.[0]?.target_id} imagestyle={'280x280'} alt={ensembles?.field_image?.[0]?.alt} />}
                <div>
                    {ensembles?.field_description?.[0]?.processed && <SanitizedHtml htmlString={ensembles?.field_description?.[0]?.processed} />}
                </div>
            </div>
        </>
    );
}
