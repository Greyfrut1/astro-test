import axios from 'axios';
import {useState} from 'react';
import {toast,} from 'react-toastify';
import {useAfterSubscribeTextQuery, useNewsLetterSubscriberQuery} from '../../services/api';
import useLanguagePrefix from '../../services/languagePrefix';
import 'react-toastify/dist/ReactToastify.css';
import './Subscriber.scss';

const baseURL = import.meta.env.VITE_BACKEND_URL;

export default function Subscriber() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {data} = useNewsLetterSubscriberQuery();
    const {data: data2} = useAfterSubscribeTextQuery();
    const img = data?.data?.field_image?.image_style_uri?.news_440x232;
    const langPrefix = useLanguagePrefix();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const submitFormData = {
            mail: [email],
            subscriptions: ['default'],
        };

        try {
            await axios.post(`${baseURL}entity/simplenews_subscriber`, submitFormData);
            setIsSubmitted(true);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 422) {
                const errorMessage =
                    langPrefix === 'en'
                        ? 'This email is already subscribed.'
                        : 'З цієї пошти вже зареєстрована підписка';
                toast.error(errorMessage);
            } else {
                const errorMessage =
                    langPrefix === 'en' ? 'Failed to subscribe.' : 'Не вдалося підписатися.';
                toast.error(errorMessage);
            }
        }
    };

    return (
        <div className="subscriber">
            {!isSubmitted ? (
                <>
                    <h1 className="subscriber-title">{data?.data.info}</h1>
                    <p
                        className="subscriber-text"
                        dangerouslySetInnerHTML={{
                            __html: data?.data.body?.processed,
                        }}
                    />
                    <form onSubmit={handleSubmit} className="flex w-1/2 relative items-center">
                        <input
                            required="required"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={
                                (langPrefix === 'en' && 'Enter your e-mail') ||
                                (langPrefix === 'uk' && 'Введіть e-mail')
                            }
                        />
                        <button type="submit">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                            </svg>
                        </button>
                    </form>
                </>
            ) : (
                <div className="success-message">
                    <h1>{data2?.data?.attributes?.info}</h1>
                    <p
                        className="success-message__text"
                        dangerouslySetInnerHTML={{
                            __html: data2?.data?.attributes?.body?.processed,
                        }}
                    />
                </div>
            )}
        </div>
    );
}
