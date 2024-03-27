import PropTypes from 'prop-types';
import { usePollChoiceBlockQuery } from '../../services/api';

export default function PollsChoice({ choiceId }) {
  const { data: choiceData } = usePollChoiceBlockQuery({ id: `${choiceId}` });

  return <>{choiceData?.data?.attributes?.choice}</>;
}

PollsChoice.propTypes = {
  choiceId: PropTypes.string.isRequired,
};
