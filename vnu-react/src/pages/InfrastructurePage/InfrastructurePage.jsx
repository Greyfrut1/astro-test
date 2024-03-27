import {useParams} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import Paragraph from '../../components/Paragraph/Paragraph';
import MapComponent from '../../components/Common/MapComponent';
import {useInfrastructurePageQuery} from '../../services/api';
import MetaTags from '../../components/Common/MetaTags';
import {LoadingContext} from '../../context/loading-context';
import {AliasContext} from '../../context/alias';

export default function InfrastructurePage() {
    const {alias} = useParams();
    const {data: infrastructure, isFetching} = useInfrastructurePageQuery({page: `${alias}`});
    const {setLoadingValue} = useContext(LoadingContext);
    const {updateAlias} = useContext(AliasContext);
    useEffect(() => {
        if (!isFetching) {
            updateAlias(infrastructure?.title?.[0]?.value);
            setLoadingValue({InfrastructurePage: true});
        } else {
            setLoadingValue({InfrastructurePage: false});
        }
    }, [isFetching]);
    return (
        <>
            <MetaTags type="content" data={infrastructure}/>
            <div className="container">
                <div className="infrastructure">
                    {infrastructure?.field_infrastructure_info?.[0]?.target_id && (
                        <div className="paragraphs">
                            {infrastructure?.field_infrastructure_info?.map((item, index) => (
                                <Paragraph key={index} target_uuid={item?.target_uuid} target_revision_id={item?.target_revision_id}/>
                            ))}
                        </div>
                    )}
                    {infrastructure?.field_description?.[0]?.value && (
                        <div
                            className="infrastructure__description"
                            dangerouslySetInnerHTML={{__html: infrastructure?.field_description?.[0].value}}
                        />
                    )}
                    {infrastructure?.field_location?.[0]?.value && (
                        <div className="infrastructure__map">
                            <MapComponent
                                urlSuffix={infrastructure?.field_location?.[0].value}
                                zoom={'15'}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
