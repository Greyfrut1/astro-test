import { useContext, useEffect } from 'react';
import { usePollResultBlockQuery, usePollBlockQuery } from '../../services/api';
import Polls from '../../components/Polls/Polls';
import { LoadingContext } from '../../context/loading-context';
import useLanguagePrefix from '../../services/languagePrefix';
import './PollsBlock.scss';

export default function PollsBlock() {
  const { data: pollBlockData, isFetching: blockFetch } = usePollBlockQuery();
  const { data: pollResultData, isFetching: resultFetch } = usePollResultBlockQuery();
  const { setLoadingValue } = useContext(LoadingContext);
  useEffect(() => {
    if (!blockFetch || resultFetch) {
      setLoadingValue({ PollsBlock: true });
    } else {
      setLoadingValue({ PollsBlock: false });
    }
  }, [blockFetch, resultFetch]);
  const langPrefix = useLanguagePrefix();
  return (
    <div className="poll-block">
      <div className="title">
        <h3>
          <a href={`${langPrefix}/polls`}>{pollBlockData?.meta?.title}</a>
        </h3>
      </div>
      <Polls pollData={pollBlockData} resultData={pollResultData} />
    </div>
  );
}
