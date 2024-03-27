import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useEffect } from 'react';
import { useNewsLetterUnSubscriberQuery } from '../../services/api';
import useLanguagePrefix from '../../services/languagePrefix';
import { LoadingContext } from '../../context/loading-context';

const baseURL = import.meta.env.VITE_BACKEND_URL;

export default function UnSubscriber() {
  const langPrefix = useLanguagePrefix();

  const navigate = useNavigate();
  const { idUser, idNewsletter, timestamp, hash } = useParams();
  const { data: subscriber, isFetching: subscriberFetch } = useNewsLetterUnSubscriberQuery({
    endpoint: `${idUser}`,
  });
  const { data: newsletter, isFetching: newsletterFetch } = useNewsLetterUnSubscriberQuery({
    endpoint: `${idNewsletter}`,
  });
  const email = subscriber?.mail?.[0].value;
  const maskedEmail = email ? email.replace(/(?<=.{1}).(?=[^@]*?.@)/g, '*') : '';
  const { setLoadingValue } = useContext(LoadingContext);
  useEffect(() => {
    if (!newsletterFetch || !subscriberFetch) {
      setLoadingValue({ UnSubscriber: true });
    } else {
      setLoadingValue({ UnSubscriber: false });
    }
  }, [newsletterFetch, subscriberFetch]);

  // Check if either subscriber or newsletter is undefined or null
  if (!subscriber || !newsletter) {
    // Redirect to home page
    navigate('/');
    return null;
  }

  // Check if either subscriber or newsletter is undefined or null
  if (subscriber.length < 1 || newsletter.length < 1) {
    // Redirect to home page
    navigate('/');
    return null;
  }
  const handleCancel = () => {
    navigate('/');
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${baseURL}simplenews/remove/${idUser}/${idNewsletter}/${timestamp}/${hash}/ok`)
      .then((response) => {
        console.log(response.data, response);
        toast.success('Success unsubscribe!');
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to unsubscribe.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        {(langPrefix === 'en' &&
          'This action will unsubscribe you from the newsletter mailing list.') ||
          (langPrefix === 'uk' && 'Ця дія скасує вашу підписку на розсилку новин.')}
      </p>
      <p>
        {(langPrefix === 'en' && 'Are you sure you want to remove') ||
          (langPrefix === 'uk' && 'Ви впевнені, що хочете видалити')}
        <em className="placeholder">{maskedEmail}</em>{' '}
        {(langPrefix === 'en' && 'from the') || (langPrefix === 'uk' && 'від')}
        <em className="placeholder">{newsletter?.name}</em>{' '}
        {(langPrefix === 'en' && 'mailing list?') || (langPrefix === 'uk' && 'поштову розсилку?')}
      </p>
      <div>
        <button type="submit">
          {(langPrefix === 'en' && 'Unsubscribe') || (langPrefix === 'uk' && 'Відписатися')}
        </button>
        <button onClick={handleCancel}>
          {(langPrefix === 'en' && 'Cancel') || (langPrefix === 'uk' && 'Скасувати')}
        </button>
      </div>
    </form>
  );
}
