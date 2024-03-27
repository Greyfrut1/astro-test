import { usePollResultBlockQuery } from '../../services/api';
import useLanguagePrefix from '../../services/languagePrefix';
import './PollResults.scss';

export default function PollResults({resultIndex, pollData, onReturnToPoll}) {
    const {data: resultData} = usePollResultBlockQuery({id: `${resultIndex}`});
    const handleReturnToPollClick = () => {
        onReturnToPoll();
    };
    const langPrefix = useLanguagePrefix();
    const totalVotes = resultData?.data?.reduce(
        (acc, choice) => acc + parseInt(choice?.attributes?.vote_count, 10),
        0,
    );
    return (
        <div className="poll-result-block">
            {resultData?.data?.map((choice1, index) => {
                return (
                    <div key={index} className="poll-result-block__choice">
                        {totalVotes > 0 && (
                            <div className="poll-result-block__choice-range">
                                <span>{((choice1?.attributes?.vote_count / totalVotes) * 100).toFixed(0)}%{' '}</span>
                                <span>({choice1?.attributes?.vote_count} vote
                                    {choice1?.attributes?.vote_count !== 1 ? 's' : ''})</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={((choice1?.attributes?.vote_count / totalVotes) * 100).toFixed(0)}
                                    disabled
                                />
                            </div>
                        )}
                    </div>
                );
            })}
            <p className="poll-result-block__total">Total votes: {totalVotes}</p>
            <div className="poll-result-block__button">
                <button onClick={handleReturnToPollClick}>
                    {langPrefix === 'en' && <>Back to poll</>}
                    {langPrefix === 'uk' && <>Повернутись до опитування</>}
                </button>
            </div>
        </div>
    );
}
