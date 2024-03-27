import React, { useContext, useEffect, useState } from 'react';
import useLanguagePrefix from '../../services/languagePrefix';
import { useEventViewBlockQuery } from '../../services/api';
import { LoadingContext } from '../../context/loading-context';
import './EventPage.scss';
import EventsView from '../../views/EventsView/EventsView';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import Pager from "../../components/Pager/Pager.jsx";

export default function EventPage() {
    const [pastEventsPage, setPastEventsPage] = useState(0)
    const [eventComingSoonPage, setEventComingSoonPage] = useState(0)
    const langPrefix = useLanguagePrefix();

    const {data: EventComingSoon, isFetching} = useEventViewBlockQuery({endpoint: `coming-soon?page=${eventComingSoonPage}`});
    const {data: PastEvents} = useEventViewBlockQuery({endpoint: `past-event?page=${pastEventsPage}`});
    const {setLoadingValue} = useContext(LoadingContext);
    useEffect(() => {
        if (!isFetching) {
            setLoadingValue({EventsView: true});
        } else {
            setLoadingValue({EventsView: false});
        }
    }, [isFetching]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const hundlePastEventsPage = (currentPage) => {
        setPastEventsPage(currentPage);
        window.scrollTo(0, 0);
    }
    const hundleEventComingSoonPage = (currentPage) => {
        setEventComingSoonPage(currentPage);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth > 768);
        };

    window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className="events container">
            <Tabs>
                {isMobile ? (
                    <TabList>
                        <a className="events-calendar__link-all-events" href="events-calendar">
                            {(langPrefix === 'en' && 'Events calendar') || 'Календар подій'}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="31"
                                height="6"
                                viewBox="0 0 31 6"
                                fill="none"
                            >
                                <path
                                    d="M21.9515 5.91895L20.5071 5.42152L26.6352 3.31115L0 3.31115L0 3.31113L0 2.60767L0 2.60765L26.635 2.60765L20.5071 0.497348L21.9515 -7.67708e-05L30.5455 2.95943L21.9515 5.91895Z"
                                    fill="#561111"
                                />
                            </svg>
                        </a>
                        <Tab selected>
                            {' '}
                            {(langPrefix === 'en' && 'Planned events') || 'Заплановані події '}{' '}
                        </Tab>
                        <Tab> {(langPrefix === 'en' && 'Past events') || 'Минулі події '} </Tab>
                    </TabList>
                ) : (
                    <>
                        <a className="events-calendar__link-all-events" href="events-calendar">
                            {(langPrefix === 'en' && 'Events calendar') || 'Календар подій'}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="31"
                                height="6"
                                viewBox="0 0 31 6"
                                fill="none"
                            >
                                <path
                                    d="M21.9515 5.91895L20.5071 5.42152L26.6352 3.31115L0 3.31115L0 3.31113L0 2.60767L0 2.60765L26.635 2.60765L20.5071 0.497348L21.9515 -7.67708e-05L30.5455 2.95943L21.9515 5.91895Z"
                                    fill="#561111"
                                />
                            </svg>
                        </a>
                        <TabList>
                            <Tab selected>
                                {' '}
                                {(langPrefix === 'en' && 'Planned events') || 'Заплановані події '}{' '}
                            </Tab>
                            <Tab> {(langPrefix === 'en' && 'Past events') || 'Минулі події '} </Tab>
                        </TabList>
                    </>
                )}
                <TabPanel>
                    <EventsView data={EventComingSoon}/>
                    {EventComingSoon?.pager?.total_pages > 1 && <Pager onPageChange={hundleEventComingSoonPage} totalPages={EventComingSoon?.pager?.total_pages} />}
                </TabPanel>
                <TabPanel>
                    <EventsView data={PastEvents}/>
                    {PastEvents?.pager?.total_pages > 1 && <Pager onPageChange={hundlePastEventsPage} totalPages={PastEvents?.pager?.total_pages} />}
                </TabPanel>
            </Tabs>
        </div>
    );
}
