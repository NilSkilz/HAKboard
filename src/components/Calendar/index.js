import React, { Component } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import Axios from 'axios';
import ical from 'ical';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

class Calendar extends Component {
  state = { events: [] };

  componentDidUpdate() {
    const { events } = this.state;
    const { config } = this.props;
    const { refresh } = this.props;
    if ((!events.length && config) || refresh) {
      this.getCalendarEvents();
    }
  }

  getCalendarEvents = () => {
    console.log('Getting Calendar events');
    const { url } = this.props.config;
    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
    Axios.get(`${PROXY_URL}${url}`).then(({ data }) => {
      const events = ical.parseICS(data);
      const array = Object.keys(events).map(key => {
        const event = events[key];
        if (event.summary) {
          return {
            title: this.isAllDay(event) ? event.summary : `${moment(event.start).format('HH:mm')} - ${event.summary}`,
            start: moment(event.start),
            end: moment(event.end),
            allDay: this.isAllDay(event)
          };
        }
      });
      this.setState({
        events: array
      });
    });
  };

  isAllDay = event => {
    const a = moment(event.start);
    const b = moment(event.start).startOf('day');

    const c = moment(event.end);
    const d = moment(event.start)
      .add(1, 'days')
      .startOf('day');

    return a.isSame(b) && c.isSame(d);
  };

  render() {
    const { events } = this.state;
    return (
      <div className='w-100 '>
        <BigCalendar
          localizer={localizer}
          step={10}
          length={10}
          events={events}
          startAccessor='start'
          endAccessor='end'
          views={['month']}
          drilldownView={null}
          toolbar={false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    config: state.config.widgets.calendar,
    refresh: state.config.refresh
  };
};

export default connect(mapStateToProps)(Calendar);
