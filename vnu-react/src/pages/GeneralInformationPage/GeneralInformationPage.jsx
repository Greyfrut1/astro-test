import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import Paragraph from '../../components/Paragraph/Paragraph.jsx';
import MetaTags from '../../components/Common/MetaTags.jsx';
import { useGeneralInfoPageQuery } from '../../services/api.js';
import { LoadingContext } from '../../context/loading-context.jsx';
import { AliasContext } from '../../context/alias.jsx';
import './GeneralInformationPage.scss';

export default function GeneralInformationPage() {
  const { alias } = useParams();
  const { data: general, isFetching } = useGeneralInfoPageQuery({ page: `${alias}` });
  const { setLoadingValue } = useContext(LoadingContext);
  const { updateAlias } = useContext(AliasContext);
  useEffect(() => {
    if (!isFetching) {
      updateAlias(general?.title?.[0]?.value);
      setLoadingValue({ GeneralInformationPage: true });
    } else {
      setLoadingValue({ GeneralInformationPage: false });
    }
  }, [isFetching]);
  return (
    <div className="general-info container">
      <MetaTags type="content" data={general} />
      <h2 className="general-info__title">{general?.title?.[0]?.value}</h2>
      <div className="paragraphs general-info__description">
        {general?.field_content?.map((item, index) => (
          <Paragraph key={index} target_uuid={item?.target_uuid} target_revision_id={item?.target_revision_id} />
        ))}
      </div>
    </div>
  );
}
