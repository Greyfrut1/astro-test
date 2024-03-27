import React, { Fragment, useMemo, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Calendar, Views, DateLocalizer, momentLocalizer } from 'react-big-calendar';
import { useEventsCalendarQuery } from '../../services/api';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar as MiniCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { startOfWeek, endOfWeek, format } from 'date-fns';
import './EventsCalendar.scss';
import useLanguagePrefix from '../../services/languagePrefix';
import 'moment/dist/locale/uk';
import { LoadingContext } from '../../context/loading-context';

const mLocalizer = momentLocalizer(moment);

function MiniCalendarBlock({ dateState, changeDate, showMiniCalendar }) {
  const langPrefix = useLanguagePrefix();
  return (
    <div className="events-mini-calendar" style={{ display: showMiniCalendar ? 'block' : 'none' }}>
      <MiniCalendar
        value={dateState}
        defaultView="year"
        maxDetail="year"
        onClickMonth={changeDate}
        onClickYear={changeDate}
        locale={langPrefix}
      />
    </div>
  );
}

function CustomEvent(event) {
  return (
    <a className="event-block" href={event.event.view_node}>
      <div className="event-title">
        <span dangerouslySetInnerHTML={{ __html: event.event.title }} />
      </div>
      <div className="event-time">{format(event.event.start, 'HH.mm')}</div>
    </a>
  );
}

function CustomToolbar(toolbar) {
  const [showMiniCalendar, setShowMiniCalendar] = useState(false);
  const langPrefix = useLanguagePrefix();
  const goToBack = () => {
    if (toolbar.view === 'week') {
      toolbar.date.setDate(toolbar.date.getDate() - 7);
      toolbar.onNavigate('prev');
    } else {
      toolbar.date.setDate(toolbar.date.getDate() - 1);
      toolbar.onNavigate('prev');
    }
  };

  const goToNext = () => {
    if (toolbar.view === 'week') {
      toolbar.date.setDate(toolbar.date.getDate() + 7);
      toolbar.onNavigate('prev');
    } else {
      toolbar.date.setDate(toolbar.date.getDate() + 1);
      toolbar.onNavigate('prev');
    }
  };

  const goToCurrent = () => {
    const now = new Date();
    toolbar.date.setDate(now.getDate());
    toolbar.date.setMonth(now.getMonth());
    toolbar.date.setYear(now.getFullYear());
    toolbar.onNavigate('current');
  };

  const label = () => {
    const startDate = moment(startOfWeek(toolbar.date));
    const endDate = moment(endOfWeek(toolbar.date));
    moment.locale(langPrefix, {
      week: {
        dow: 1,
        doy: 1,
      },
    });
    return (
      <span>
        <span>
          {(startDate.format('MMMM') === endDate.format('MMMM') && startDate.format('MMMM')) || (
            <>
              {startDate.format('MMM')} - {endDate.format('MMM')}
            </>
          )}
        </span>
        <span> {startDate.format('YYYY')}</span>
      </span>
    );
  };

  const ClickMiniCalendar = () => {
    setShowMiniCalendar(!showMiniCalendar);
  };

  const changeDate = (e) => {
    toolbar.onNavigate('current', e);
    setShowMiniCalendar(false);
  };

  const dayDone = () => {
    toolbar.onView('week');
  };
  return (
    <div className="calendar-header">
      {((toolbar.view[0] === 'week' || toolbar.view === 'week') && (
        <>
          <div className="toolbar-container">
            <div className="toolbar-header">
              <div onClick={ClickMiniCalendar} className="toolbar-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="34"
                  viewBox="0 0 34 34"
                  fill="none"
                >
                  <path
                    d="M27.625 5.3125H6.375C4.61459 5.3125 3.1875 6.73959 3.1875 8.5V27.625C3.1875 29.3854 4.61459 30.8125 6.375 30.8125H27.625C29.3854 30.8125 30.8125 29.3854 30.8125 27.625V8.5C30.8125 6.73959 29.3854 5.3125 27.625 5.3125Z"
                    stroke="#393B42"
                  />
                  <path
                    d="M19.6562 17C20.5365 17 21.25 16.2865 21.25 15.4062C21.25 14.526 20.5365 13.8125 19.6562 13.8125C18.776 13.8125 18.0625 14.526 18.0625 15.4062C18.0625 16.2865 18.776 17 19.6562 17Z"
                    fill="#393B42"
                  />
                  <path
                    d="M24.9688 17C25.849 17 26.5625 16.2865 26.5625 15.4062C26.5625 14.526 25.849 13.8125 24.9688 13.8125C24.0885 13.8125 23.375 14.526 23.375 15.4062C23.375 16.2865 24.0885 17 24.9688 17Z"
                    fill="#393B42"
                  />
                  <path
                    d="M19.6562 22.3125C20.5365 22.3125 21.25 21.599 21.25 20.7188C21.25 19.8385 20.5365 19.125 19.6562 19.125C18.776 19.125 18.0625 19.8385 18.0625 20.7188C18.0625 21.599 18.776 22.3125 19.6562 22.3125Z"
                    fill="#393B42"
                  />
                  <path
                    d="M24.9688 22.3125C25.849 22.3125 26.5625 21.599 26.5625 20.7188C26.5625 19.8385 25.849 19.125 24.9688 19.125C24.0885 19.125 23.375 19.8385 23.375 20.7188C23.375 21.599 24.0885 22.3125 24.9688 22.3125Z"
                    fill="#393B42"
                  />
                  <path
                    d="M9.03125 22.3125C9.91145 22.3125 10.625 21.599 10.625 20.7188C10.625 19.8385 9.91145 19.125 9.03125 19.125C8.15105 19.125 7.4375 19.8385 7.4375 20.7188C7.4375 21.599 8.15105 22.3125 9.03125 22.3125Z"
                    fill="#393B42"
                  />
                  <path
                    d="M14.3438 22.3125C15.224 22.3125 15.9375 21.599 15.9375 20.7188C15.9375 19.8385 15.224 19.125 14.3438 19.125C13.4635 19.125 12.75 19.8385 12.75 20.7188C12.75 21.599 13.4635 22.3125 14.3438 22.3125Z"
                    fill="#393B42"
                  />
                  <path
                    d="M9.03125 27.625C9.91145 27.625 10.625 26.9115 10.625 26.0312C10.625 25.151 9.91145 24.4375 9.03125 24.4375C8.15105 24.4375 7.4375 25.151 7.4375 26.0312C7.4375 26.9115 8.15105 27.625 9.03125 27.625Z"
                    fill="#393B42"
                  />
                  <path
                    d="M14.3438 27.625C15.224 27.625 15.9375 26.9115 15.9375 26.0312C15.9375 25.151 15.224 24.4375 14.3438 24.4375C13.4635 24.4375 12.75 25.151 12.75 26.0312C12.75 26.9115 13.4635 27.625 14.3438 27.625Z"
                    fill="#393B42"
                  />
                  <path
                    d="M19.6562 27.625C20.5365 27.625 21.25 26.9115 21.25 26.0312C21.25 25.151 20.5365 24.4375 19.6562 24.4375C18.776 24.4375 18.0625 25.151 18.0625 26.0312C18.0625 26.9115 18.776 27.625 19.6562 27.625Z"
                    fill="#393B42"
                  />
                  <path d="M8.5 3.1875V5.3125V3.1875ZM25.5 3.1875V5.3125V3.1875Z" fill="#393B42" />
                  <path d="M8.5 3.1875V5.3125M25.5 3.1875V5.3125" stroke="#393B42" />
                  <path d="M30.8125 10.625H3.1875H30.8125Z" fill="#393B42" />
                  <path d="M30.8125 10.625H3.1875" stroke="#393B42" />
                </svg>
              </div>
              <label className="label-date">{label()}</label>
            </div>

            <div className="back-next-buttons">
              <button className="btn-back" onClick={goToBack}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="11"
                  viewBox="0 0 10 11"
                  fill="none"
                >
                  <path
                    d="M1.66276 5.50003L4.94987 2.14377C4.97693 2.11672 4.99833 2.08461 5.01282 2.04929C5.02731 2.01398 5.03461 1.97616 5.03429 1.93802C5.03397 1.89988 5.02604 1.86219 5.01096 1.82711C4.99588 1.79204 4.97395 1.76029 4.94644 1.73369C4.91893 1.70709 4.88638 1.68618 4.85068 1.67216C4.81498 1.65815 4.77684 1.6513 4.73846 1.65203C4.70008 1.65276 4.66223 1.66104 4.62709 1.67639C4.59195 1.69175 4.56023 1.71388 4.53376 1.7415L1.05001 5.29889C0.997276 5.35274 0.967773 5.4249 0.967773 5.50003C0.967773 5.57516 0.997276 5.64732 1.05001 5.70117L4.53376 9.25856C4.56023 9.28618 4.59195 9.30831 4.62709 9.32366C4.66223 9.33902 4.70008 9.3473 4.73846 9.34803C4.77684 9.34875 4.81498 9.34191 4.85068 9.32789C4.88638 9.31388 4.91893 9.29297 4.94644 9.26637C4.97395 9.23977 4.99588 9.20802 5.01096 9.17295C5.02604 9.13787 5.03397 9.10018 5.03429 9.06204C5.03461 9.0239 5.02731 8.98608 5.01282 8.95076C4.99833 8.91545 4.97693 8.88334 4.94987 8.85629L1.66276 5.50003Z"
                    fill="#393B42"
                  />
                </svg>
              </button>
              <button className="btn-current" onClick={goToCurrent}>
                {(langPrefix === 'en' && 'Today') || 'Сьогодні'}
              </button>
              <button className="btn-next" onClick={goToNext}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="11"
                  viewBox="0 0 10 11"
                  fill="none"
                >
                  <path
                    d="M7.65983 5.73293L4.37423 9.08947C4.34718 9.11651 4.3258 9.14863 4.31131 9.18395C4.29683 9.21927 4.28954 9.25709 4.28985 9.29523C4.29017 9.33337 4.2981 9.37107 4.31317 9.40615C4.32824 9.44122 4.35016 9.47298 4.37766 9.49958C4.40516 9.52618 4.43769 9.54709 4.47338 9.56111C4.50906 9.57513 4.54719 9.58197 4.58555 9.58125C4.62391 9.58052 4.66174 9.57224 4.69687 9.55688C4.73199 9.54152 4.76369 9.51939 4.79016 9.49177L8.2723 5.93408C8.325 5.88023 8.35449 5.80806 8.35449 5.73293C8.35449 5.65779 8.325 5.58562 8.2723 5.53177L4.79016 1.97408C4.76369 1.94646 4.73199 1.92433 4.69687 1.90897C4.66174 1.89361 4.62391 1.88533 4.58555 1.88461C4.54719 1.88388 4.50906 1.89072 4.47338 1.90474C4.43769 1.91876 4.40516 1.93967 4.37766 1.96627C4.35016 1.99287 4.32824 2.02463 4.31317 2.0597C4.2981 2.09478 4.29017 2.13248 4.28985 2.17062C4.28954 2.20876 4.29683 2.24658 4.31131 2.2819C4.3258 2.31722 4.34718 2.34934 4.37423 2.37639L7.65983 5.73293Z"
                    fill="#393B42"
                  />
                </svg>
              </button>
            </div>

            <MiniCalendarBlock
              dateState={toolbar.date}
              changeDate={changeDate}
              showMiniCalendar={showMiniCalendar}
            />
          </div>
          <div className="week-header">
            {(langPrefix === 'en' && toolbar?.view === 'week' && (
              <>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
              </>
            )) ||
              (toolbar?.view === 'week' && (
                <>
                  <div>ПН</div>
                  <div>ВТ</div>
                  <div>СР</div>
                  <div>ЧТ</div>
                  <div>ПТ</div>
                  <div>СБ</div>
                  <div>НД</div>
                </>
              ))}
          </div>
        </>
      )) ||
        (toolbar.view === 'day' && (
          <>
            <div className="back-next-buttons">
              <button className="btn-back" onClick={goToBack}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="11"
                  viewBox="0 0 10 11"
                  fill="none"
                >
                  <path
                    d="M1.66276 5.50003L4.94987 2.14377C4.97693 2.11672 4.99833 2.08461 5.01282 2.04929C5.02731 2.01398 5.03461 1.97616 5.03429 1.93802C5.03397 1.89988 5.02604 1.86219 5.01096 1.82711C4.99588 1.79204 4.97395 1.76029 4.94644 1.73369C4.91893 1.70709 4.88638 1.68618 4.85068 1.67216C4.81498 1.65815 4.77684 1.6513 4.73846 1.65203C4.70008 1.65276 4.66223 1.66104 4.62709 1.67639C4.59195 1.69175 4.56023 1.71388 4.53376 1.7415L1.05001 5.29889C0.997276 5.35274 0.967773 5.4249 0.967773 5.50003C0.967773 5.57516 0.997276 5.64732 1.05001 5.70117L4.53376 9.25856C4.56023 9.28618 4.59195 9.30831 4.62709 9.32366C4.66223 9.33902 4.70008 9.3473 4.73846 9.34803C4.77684 9.34875 4.81498 9.34191 4.85068 9.32789C4.88638 9.31388 4.91893 9.29297 4.94644 9.26637C4.97395 9.23977 4.99588 9.20802 5.01096 9.17295C5.02604 9.13787 5.03397 9.10018 5.03429 9.06204C5.03461 9.0239 5.02731 8.98608 5.01282 8.95076C4.99833 8.91545 4.97693 8.88334 4.94987 8.85629L1.66276 5.50003Z"
                    fill="#393B42"
                  />
                </svg>
              </button>
              <button className="btn-current" onClick={goToCurrent}>
                {moment(toolbar.date).format('DD MMMM')}
              </button>
              <button className="btn-next" onClick={goToNext}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="11"
                  viewBox="0 0 10 11"
                  fill="none"
                >
                  <path
                    d="M7.65983 5.73293L4.37423 9.08947C4.34718 9.11651 4.3258 9.14863 4.31131 9.18395C4.29683 9.21927 4.28954 9.25709 4.28985 9.29523C4.29017 9.33337 4.2981 9.37107 4.31317 9.40615C4.32824 9.44122 4.35016 9.47298 4.37766 9.49958C4.40516 9.52618 4.43769 9.54709 4.47338 9.56111C4.50906 9.57513 4.54719 9.58197 4.58555 9.58125C4.62391 9.58052 4.66174 9.57224 4.69687 9.55688C4.73199 9.54152 4.76369 9.51939 4.79016 9.49177L8.2723 5.93408C8.325 5.88023 8.35449 5.80806 8.35449 5.73293C8.35449 5.65779 8.325 5.58562 8.2723 5.53177L4.79016 1.97408C4.76369 1.94646 4.73199 1.92433 4.69687 1.90897C4.66174 1.89361 4.62391 1.88533 4.58555 1.88461C4.54719 1.88388 4.50906 1.89072 4.47338 1.90474C4.43769 1.91876 4.40516 1.93967 4.37766 1.96627C4.35016 1.99287 4.32824 2.02463 4.31317 2.0597C4.2981 2.09478 4.29017 2.13248 4.28985 2.17062C4.28954 2.20876 4.29683 2.24658 4.31131 2.2819C4.3258 2.31722 4.34718 2.34934 4.37423 2.37639L7.65983 5.73293Z"
                    fill="#393B42"
                  />
                </svg>
              </button>
            </div>
            <div className="day-done" onClick={dayDone}>
              {(langPrefix === 'en ' && 'Done') || 'Готово'}
            </div>
          </>
        ))}
    </div>
  );
}

export default function Basic({ localizer = mLocalizer, ...props }) {
  const { components, formats, views } = useMemo(
    () => ({
      components: {
        timeGutterWrapper: () => {
          return '';
        },
        timeHeader: () => {
          return '';
        },
        toolbar: CustomToolbar,
        eventWrapper: CustomEvent,
      },
      formats: {
        dayFormat: 'DD',
      },
      defaultDate: new Date(2015, 3, 1),
      views: [Views.WEEK, Views.DAY],
    }),
    [],
  );
  const { data, isFetching } = useEventsCalendarQuery();
  const langPrefix = useLanguagePrefix();
  const customEvents = data?.rows?.map(({ start, end, ...rest }) => ({
    start: new Date(start),
    end: new Date(start),
    allDay: false,
    ...rest,
  }));
  const [dateCalendar, setDate] = useState(new Date());

  const onNavigate = (newDate) => {
    setDate(newDate);
  };
  const [isMobile, setMobile] = useState(false);
  const [isDayFormat, setDayFormat] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Додаємо стан для ширини вікна

  const { setLoadingValue } = useContext(LoadingContext);
  useEffect(() => {
    if (!isFetching) {
      setLoadingValue({ EventsCalendar: true });
    } else {
      setLoadingValue({ EventsCalendar: false });
    }
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    if (windowWidth <= 550) {
      setMobile(true);
    } else {
      onView('week');
      setMobile(false);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth, isFetching]);
  const onView = (e) => {
    if (e === 'week') {
      setDayFormat(false);
    } else {
      setDayFormat(true);
    }
  };
  return (
    <div
      className={`height600 events-calendar container ${(isDayFormat && 'day-format') || 'week-format'}`}
      {...props}
    >
      {!isDayFormat && (
        <div className="events-calendar__top">
          <h1 className="events-calendar__page-title">
            {(langPrefix === 'en' && 'Events calendar') || 'Календар подій'}
          </h1>
          <a className="events-calendar__link-all-events" href="events">
            {(langPrefix === 'en' && 'All events') || 'Всі події'}
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
        </div>
      )}
      {data?.rows && !isMobile && (
        <Calendar
          date={dateCalendar}
          components={components}
          events={customEvents}
          localizer={localizer}
          formats={formats}
          allDay={false}
          step={60}
          allDayAccessor={false}
          defaultView={Views.WEEK}
          views={[Views.WEEK]}
          timeslots={2}
          onNavigate={onNavigate}
          culture="uk"
          onView={onView}
        />
      )}
      {data?.rows && isMobile && (
        <Calendar
          date={dateCalendar}
          components={components}
          events={customEvents}
          localizer={localizer}
          formats={formats}
          allDay={false}
          step={60}
          allDayAccessor={false}
          defaultView={Views.WEEK}
          views={views}
          timeslots={2}
          onNavigate={onNavigate}
          culture="uk"
          onView={onView}
        />
      )}
    </div>
  );
}

Basic.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  showDemoLink: PropTypes.bool,
};
MiniCalendarBlock.propTypes = {
  dateState: PropTypes.instanceOf(Date).isRequired,
  changeDate: PropTypes.func.isRequired,
  showMiniCalendar: PropTypes.bool.isRequired,
};
