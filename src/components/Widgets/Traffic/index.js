import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import moment from 'moment';
import ReactSVG from 'react-svg';

class Traffic extends Component {
  state = { data: null, extremes: null };
  componentDidUpdate() {
    const { data } = this.state;
    const { refresh } = this.props;
    if (!data || refresh) {
      console.log('REFRESHING: ', refresh);
      this.fetchTimeToWork();
      this.fetchTideTimes();
    }
  }

  fetchTimeToWork = () => {
    const { work = {}, home = {}, widgets = [] } = this.props.config;
    const { traffic = {} } = widgets;
    const { google_traffic_api_key: apiKey } = traffic;
    const { longitude, latitude } = home;
    const { longitude: workLongitude, latitude: workLatitude } = work;
    if (longitude && latitude) {
      const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
      Axios.get(
        `${PROXY_URL}https://maps.googleapis.com/maps/api/distancematrix/json?origins=${latitude},${longitude}&destinations=${workLatitude},${workLongitude}&key=${apiKey}`
      ).then(({ data }) => {
        if (data.status === 'OK') this.setState({ data: data.rows[0].elements[0] });
      });
    }
  };

  fetchTideTimes = () => {
    const { home = {}, widgets = [] } = this.props.config;
    const { tides = {} } = widgets;
    const { world_tides_api_key: apiKey } = tides;
    const { longitude, latitude } = home;
    if (longitude && latitude) {
      const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
      Axios.get(
        `${PROXY_URL}https://www.worldtides.info/api?extremes&lat=${latitude}&lon=${longitude}&key=${apiKey}`
      ).then(({ data }) => {
        this.setState({ extremes: data.extremes });
        // if (data.status === 'OK') this.setState({ data: data.rows[0].elements[0] });
      });
    }
  };

  getNextTide = () => {
    const { extremes } = this.state;
    const nextTide = extremes.find(extreme => moment(extreme.date).isAfter(moment()));
    return nextTide;
  };

  render() {
    const { data, extremes } = this.state;
    return (
      <div className='d-flex flex-row justify-content-between w-100' style={{ height: '200px' }}>
        {data ? (
          <div className='d-flex flex-column m-3 align-items-start'>
            <h5>Traffic</h5>
            <h6>Time to get to work</h6>
            <div className='d-flex flex-row'>
              <ReactSVG src={`/assets/icons/${'map'}.svg`} style={{ width: '30px' }} />
              <h3 className='ml-3'>{data.duration.text}</h3>
            </div>
            <h6>{data.distance.text}</h6>
            <h4 style={{ color: 'transparent' }}>test</h4>
          </div>
        ) : null}

        {extremes ? (
          <div className='d-flex flex-column m-3 align-items-start'>
            <h5>Tides</h5>
            <h6>{`Next ${this.getNextTide().type.toLowerCase()} tide is at ${moment(this.getNextTide().date).format(
              'h:mm a'
            )}`}</h6>
            <div className='d-flex flex-row'>
              <ReactSVG
                src={`/assets/icons/${this.getNextTide().type === 'Low' ? 'arrow-down' : 'arrow-up'}.svg`}
                style={{ width: '30px' }}
              />
              <h3 className='ml-3'>{this.getNextTide().type === 'High' ? 'Rising Tide' : 'Falling Tide'}</h3>
            </div>
            <h6>{`Next ${extremes[extremes.indexOf(this.getNextTide()) + 1].type.toLowerCase()} tide is at ${moment(
              extremes[extremes.indexOf(this.getNextTide()) + 1].date
            ).format('h:mm a')}`}</h6>
            <h4 style={{ color: 'transparent' }}>test</h4>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    config: state.config,
    refresh: state.config.refresh
  };
};

export default connect(mapStateToProps)(Traffic);
