import {useEffect, useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import useLanguagePrefix from '../../services/languagePrefix';
import './Polls.scss';
import PollResults from './PollResults';
import {toast} from 'react-toastify';

export default function PollBlock({pollData}) {
    const [ip, setIP] = useState('');
    const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState({});
    const [error, setError] = useState({});
    const [showResults, setShowResults] = useState({});
    const [isSwitchHovered, setIsSwitchHovered] = useState(false);


    const getData = async () => {
        const res = await axios.get('https://api.ipify.org/?format=json');
        setIP(res.data.ip);
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit1 = (event, pollId) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const selectedValue = formData.get('choice');
        const currentTimestamp = new Date().getTime();

        const submitFormData = {
            chid: selectedValue,
            pid: pollId,
            uid: '0',
            hostname: ip,
            timestamp: Math.floor(currentTimestamp / 1000).toString(),
        };

        axios
            .post('https://back.vnu.ms1-wishdesk.com/poll-vote/post-data', submitFormData)
            .then((response) => {
                console.log(response.data, response);
                setIsSubmissionSuccessful((prev) => ({...prev, [pollId]: true}));
                setError((prev) => ({...prev, [pollId]: null}));
                setShowResults((prev) => ({...prev, [pollId]: true}));
            })
            .catch((error) => {
                if (error.response && error.response.status === 500) {
                    const errorMessage =
                        langPrefix === 'en'
                            ? 'You have already voted in this poll.'
                            : 'Ви вже проголосували в цьому опитуванні.';
                    toast.error(errorMessage);
                } else {
                    const errorMessage =
                        langPrefix === 'en' ? 'Failed to vote.' : 'Не вдалося проголосувати.';
                    toast.error(errorMessage);
                }
            });
    };

    const handleReturnToPoll = (pollId) => {
        setShowResults((prev) => ({...prev, [pollId]: false}));
    };

    const langPrefix = useLanguagePrefix();
    return (
        <>
            {pollData?.data?.map((poll, index) => (
                <div key={index} className="poll-item">
                    <div className="poll-item__question">{poll?.question}</div>
                    {isSubmissionSuccessful[poll?.drupal_internal__id] ? (
                        <div className="submission-success-message">
                            <p>
                                {langPrefix === 'en' && <>Response submitted successfully!</>}
                                {langPrefix === 'uk' && <>Відповідь успішно надіслана!</>}
                            </p>
                        </div>
                    ) : (
                        <>
                            {error[poll?.drupal_internal__id] && !showResults[poll?.drupal_internal__id] && (
                                <div className="error-message">{error[poll?.drupal_internal__id]}</div>
                            )}
                            {showResults[poll?.drupal_internal__id] ? (
                                <PollResults
                                    resultIndex={poll?.drupal_internal__id}
                                    pollData={pollData}
                                    onReturnToPoll={() => handleReturnToPoll(poll?.drupal_internal__id)}
                                />
                            ) : (
                                <form
                                    className="poll-item__form"
                                    onSubmit={(event) => handleSubmit1(event, poll?.drupal_internal__id)}
                                >
                                    <input type="hidden" name="pollId" value={poll?.drupal_internal__id}/>
                                    <div className={'poll-item__votes-block'}>
                                        {poll?.choice?.map((choice, indexx) => (
                                            <div key={indexx} className="poll-item__choice-item">
                                                <input
                                                    type="radio"
                                                    name="choice"
                                                    value={choice?.meta?.drupal_internal__target_id}
                                                />
                                                <label> {choice?.choice}</label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="poll-item__button">
                                        <button
                                            type="submit"
                                            className={`poll-item__form-submit ${isSwitchHovered ? 'click' : ''}`}
                                        >
                                            {langPrefix === 'en' && <>Send</>}
                                            {langPrefix === 'uk' && <>Надіслати</>}
                                        </button>
                                        <button
                                            onMouseEnter={() => setIsSwitchHovered(true)}
                                            onMouseLeave={() => setIsSwitchHovered(false)}
                                            onClick={() => setShowResults((prev) => ({
                                                ...prev,
                                                [poll?.drupal_internal__id]: true
                                            }))}
                                            className="poll-item__switch"
                                        >
                                            {langPrefix === 'en' && <>Results</>}
                                            {langPrefix === 'uk' && <>Результат</>}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </>
                    )}
                </div>
            ))}
        </>
    );
}

PollBlock.propTypes = {
    pollData: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.array.isRequired]),
};
