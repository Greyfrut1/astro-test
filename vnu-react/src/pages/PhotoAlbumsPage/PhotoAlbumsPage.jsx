import {useParams} from 'react-router-dom';
import LightBox from '../../components/Image/LightBox';
import MetaTags from '../../components/Common/MetaTags';
import './PhotoalbumsPage.scss';
import {usePhotoAlbumsPageQuery} from '../../services/api';
import {useContext, useEffect} from 'react';
import {LoadingContext} from '../../context/loading-context';
import {AliasContext} from '../../context/alias';

function PhotoAlbumsPage() {
    const {alias} = useParams();
    const {data: albumsNodeData, isFetching} = usePhotoAlbumsPageQuery({page: `${alias}`});
    const {setLoadingValue} = useContext(LoadingContext);
    const {updateAlias} = useContext(AliasContext);
    useEffect(() => {
        if (!isFetching) {
            updateAlias(albumsNodeData?.title?.[0]?.value);
            setLoadingValue({PhotoAlbumsPage: true});
        } else {
            setLoadingValue({PhotoAlbumsPage: false});
        }
    }, [isFetching]);

    return (
        <>
            <MetaTags type="content" data={albumsNodeData}/>
            <div className="albums container">
                <h1 className="albums-title">{albumsNodeData?.title?.[0]?.value}</h1>
                <LightBox data={albumsNodeData}/>
            </div>
        </>
    );
}

export default PhotoAlbumsPage;
