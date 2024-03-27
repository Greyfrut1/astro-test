import {Link, useParams} from 'react-router-dom';
import React, {useContext, useEffect} from 'react';
import Orcid from '../../assets/orcid.png';
import Scholar from '../../assets/scholar.png';
import Scopus from '../../assets/scopus.png';
import Wiki from '../../assets/wikisnu-new.png';
import ContactInformation from '../../components/ContactInformation/ContactInformation.jsx';
import MetaTags from '../../components/Common/MetaTags';
import './StaffPage.scss';
import {useStaffPageQuery} from '../../services/api';
import {LoadingContext} from '../../context/loading-context';
import {AliasContext} from '../../context/alias';
import ImageComponent from "../../components/Image/ImageComponent.jsx";

export default function StaffPage() {
    const {alias} = useParams();
    const {data: staff, isFetching} = useStaffPageQuery({page: `${alias}`});
    const {setLoadingValue} = useContext(LoadingContext);
    const {updateAlias} = useContext(AliasContext);
    useEffect(() => {
        if (!isFetching) {
            updateAlias(staff?.title?.[0]?.value);
            setLoadingValue({StaffPage: true});
        } else {
            setLoadingValue({StaffPage: false});
        }
    }, [isFetching]);
    return (
        <div className="container">
            <MetaTags type="content" data={staff}/>
            <div className="staff">
                <div className="staff-img">
                    {staff?.field_image?.[0]?.target_id && (
                        <ImageComponent
                            url={staff?.field_image?.[0]?.target_id}
                            alt={staff?.field_image?.[0]?.alt}
                        />
                    )}
                </div>
                <h2 className="staff-title">{staff?.title?.[0]?.value}</h2>

                <div className="staff-info">
                    <div className="staff-info__general">
                        <p className="staff-info__general-position">
                            {staff?.field_position_and_rank?.[0]?.value}
                        </p>
                        <ContactInformation data={staff} type="node"/>
                    </div>
                    <div className="staff-info__sources">
                        <div className="staff-info__sources-link">
                            <img src={Wiki} alt="wiki"/>
                            <Link to={staff?.field_wiki?.[0]?.uri}>Wiki page</Link>
                        </div>
                        <div className="staff-info__sources-link">
                            <img src={Orcid} alt="orcid"/>
                            <Link to={staff?.field_orcid_id?.[0]?.uri}>Orcid id</Link>
                        </div>
                        <div className="staff-info__sources-link">
                            <img src={Scopus} alt="scopus"/>
                            <Link to={staff?.field_scopus?.[0]?.uri}>Scopus</Link>
                        </div>
                        <div className="staff-info__sources-link">
                            <img src={Scholar} alt="scholar"/>
                            <Link to={staff?.field_google_scholar?.[0]?.uri}>Google Scholar</Link>
                        </div>
                    </div>
                </div>

                <div className="staff-wikipedia">
                    {staff?.field_links?.map((item, index) => (
                        <div className="staff-wikipedia__block" key={index}>
                            <Link className="staff-wikipedia__block-link" to={item.uri}>
                                {item.title}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
