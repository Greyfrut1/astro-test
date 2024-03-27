import React, {useEffect, useState} from 'react';
import useLanguagePrefix from "../services/languagePrefix.jsx";

export default function CounterComponent() {
    const [views, setViews] = useState(0);
    const langPrefix = useLanguagePrefix();
    const baseURL = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${baseURL}google-analytics-views`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({path: window.location.pathname}),
                    },
                );
                const data = await response.json();
                setViews(data.views);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="counter-block">
            <p>{langPrefix === 'en' ? 'Views' : 'Перегляди'}: {views}</p>
        </div>
    );
}
