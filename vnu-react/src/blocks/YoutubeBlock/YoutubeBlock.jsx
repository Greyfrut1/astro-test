import { useYoutubeBlockQuery } from '../../services/api';
import YoutubeEmbed from '../../components/Common/YoutubeEmbed';
import './YoutubeBlock.scss';
import { useContext, useEffect } from 'react';
import { LoadingContext } from '../../context/loading-context';

export default function FacebookBlock() {
  const { data: youtubeBlockData, isFetching } = useYoutubeBlockQuery();
  const { setLoadingValue } = useContext(LoadingContext);
  useEffect(() => {
    if (!isFetching) {
      setLoadingValue({ FacebookBlock: true });
    } else {
      setLoadingValue({ FacebookBlock: false });
    }
  }, [isFetching]);
  return (
    <>
      {youtubeBlockData?.data?.attributes?.field_link_to?.uri && (
        <div className="youtube-block">
          <YoutubeEmbed embedId={youtubeBlockData?.data?.attributes?.field_link_to?.uri} />
        </div>
      )}
    </>
  );
}
