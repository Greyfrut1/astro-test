import { useParams } from 'react-router-dom';
import ContactInformation from '../../components/ContactInformation/ContactInformation';
import Paragraph from '../../components/Paragraph/Paragraph';
import MetaTags from '../../components/Common/MetaTags';
import LightBox from '../../components/Image/LightBox';
import { useBranchesPageQuery, useNodeQuery } from '../../services/api';
import './BranchesPage.scss';
import { useContext, useEffect } from 'react';
import { LoadingContext } from '../../context/loading-context';
import { AliasContext } from '../../context/alias';
import ImageComponent from '../../components/Image/ImageComponent';

export default function BranchesPage({type}) {
  const { alias } = useParams();
  const { data: branchesPage, isFetching: branchesFetch } = useBranchesPageQuery({
    page: `${alias}`,
    type: `${type}`
  });
  const node_id = branchesPage?.field_reference_to_content?.[0]?.target_id;
  const { data: photoAlbumsNode, isFetching: nodeFetch } = useNodeQuery({ nid: `${node_id}` });
  const { setLoadingValue } = useContext(LoadingContext);
  const { updateAlias } = useContext(AliasContext);
  useEffect(() => {
    if (!nodeFetch || !branchesFetch) {
      updateAlias(branchesPage?.title?.[0]?.value);
      setLoadingValue({ BranchesPage: true });
    } else {
      setLoadingValue({ BranchesPage: false });
    }
  }, [nodeFetch, branchesFetch]);
  return (
    <>
      <MetaTags type="content" data={branchesPage} />
      <div className="branches container">
        <div className="branches-info">
          {branchesPage?.field_image?.[0]?.target_id && (
            <div className="branches-info__img">
              <ImageComponent
                className="branches-info__img"
                url={branchesPage?.field_image?.[0]?.target_id}
                alt={branchesPage?.field_image?.[0]?.alt}
              />
            </div>
          )}
          <div className="branches-info__contact">
            <h2 className="branches-info__contact-title">{branchesPage?.title?.[0]?.value}</h2>
            <ContactInformation data={branchesPage} type="node" />
          </div>
        </div>
        {branchesPage?.field_reference_to_content?.[0]?.target_id && (
          <div className="branches-child-node">
            {branchesPage?.field_reference_to_content?.map(() => (
              <LightBox data={photoAlbumsNode} />
            ))}
          </div>
        )}
        <div className="branches-paragraphs">
          {branchesPage?.field_content?.map((item, index) => (
            <div className="section" key={index}>
              <Paragraph target_uuid={item?.target_uuid} target_revision_id={item?.target_revision_id}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
