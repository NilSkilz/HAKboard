import React, { Component } from 'react';
import { connect } from 'react-redux';
import { refreshView } from '../../containers/actions';
import moment from 'moment';

class Time extends Component {
  state = { time: null };
  componentDidMount = () => {
    const time = moment().format('HH:mm');
    this.setState({ time });
    setTimeout(this.getNewTime, 1000);
  };

  getNewTime = () => {
    const { time } = this.state;
    const { config = {}, refreshView } = this.props;
    const { type = '12', show_seconds = false } = config;
    const newTime = type === '12' ? moment().format('h:mm') : moment().format('HH:mm');
    const seconds = show_seconds ? moment().format('ss') : false;
    if (time !== newTime || seconds) this.setState({ time: newTime, seconds: seconds });
    if (moment().isSame(moment().startOf('hour'), 'second')) {
      refreshView(true);
      setTimeout(refreshView, 1000);
    }
    setTimeout(this.getNewTime, 1000);
  };

  render() {
    const { time, seconds } = this.state;
    return (
      <div className='d-flex flex-row m-3'>
        <div className='d-flex flex-column'>
          <h1 style={{ color: '#fff' }}>{time}</h1>
        </div>
        <div className='d-flex flex-column mt-3'>
          <h4 style={{ color: '#fff' }}>{seconds}</h4>
          <h4 style={{ color: '#fff' }}>{moment().format('A')}</h4>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    refreshView: refresh => {
      dispatch(refreshView(refresh));
    }
  };
};

const mapStateToProps = state => {
  return {
    config: state.config.widgets.clock
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Time);
