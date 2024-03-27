import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useLanguagePrefix from '../../services/languagePrefix';
import './CalendarFilter.scss';

export default function CalendarFilter({ selectedDate, onDateChange }) {
  // Define a state to track whether the calendar is open or closed.
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Define a function to toggle the calendar visibility.
  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  // Define a function handleDateClick to handle the click event on a calendar day.
  const handleDateClick = (value) => {
    // Call the onDateChange prop with the selected date value when a day is clicked.
    onDateChange(value);
  };

  const langPrefix = useLanguagePrefix();

  return (
    <>
      <button className="type-filter__select show-calendar" onClick={toggleCalendar}>
        {calendarOpen
          ? `${langPrefix === 'en' ? 'Hide Calendar' : 'Приховати'}`
          : `${langPrefix === 'en' ? 'Show Calendar' : 'Календар'}`}
      </button>
      {/* Render the Calendar component with onClickDay to handle day clicks and value for the selected date. */}
      {calendarOpen && (
        <Calendar
          className="calendar"
          onClickDay={handleDateClick}
          value={selectedDate}
          locale={langPrefix}
        />
      )}
    </>
  );
}

CalendarFilter.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func.isRequired,
};
