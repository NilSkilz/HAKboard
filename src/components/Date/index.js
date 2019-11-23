import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class Date extends Component {
  state = { time: null };
  componentDidMount = () => {
    const time = moment().format('HH:mm');
    this.setState({ time });
    setTimeout(this.getNewDate, 1000);
  };

  getNewDate = () => {
    const { day } = this.state;
    const newday = moment().format('dddd');
    const newdate = moment().format('MMMM Do');
    if (day !== newday) this.setState({ day: newday, date: newdate });
    setTimeout(this.getNewDate, 1000 * 60);
  };

  render() {
    const { day, date } = this.state;
    return (
      <div className='d-flex flex-column mb-0 align-items-end m-3'>
        <div className='d-flex flex-row'>
          <h2 style={{ color: '#fff' }}>{day}</h2>
        </div>
        <div className='d-flex flex-row'>
          <h4 style={{ color: '#fff' }}>{date}</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    config: state.config.widgets.clock
  };
};

export default connect(mapStateToProps)(Date);
