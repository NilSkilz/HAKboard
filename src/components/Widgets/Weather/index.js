import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import ReactSVG from 'react-svg';

class Weather extends Component {
  state = { data: null };
  componentDidUpdate() {
    const { data } = this.state;
    const { refresh } = this.props;
    if (!data || refresh) {
      this.getWeather();
    }
  }

  getWeather = () => {
    const { home = {}, widgets } = this.props.config;
    const { longitude, latitude } = home;
    const { weather } = widgets;

    if (longitude && latitude) {
      const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
      Axios.get(
        `${PROXY_URL}https://api.darksky.net/forecast/${weather.dark_sky_secret}/${latitude},${longitude}?exclude=minutely,hourly&lang=en&units=auto`
      ).then(({ data }) => {
        this.setState({ data });
      });
    }
  };

  render() {
    const { data } = this.state;
    if (!data) return null;
    console.log(data);
    console.log(data.currently.icon + '.svg');
    return (
      <div className='d-flex flex-fill flex-grow flex-column m-3 align-items-start'>
        <ReactSVG className='weather-icon' src={`/assets/icons/${data.currently.icon}.svg`} />
        <h6>{data.currently.summary}</h6>
        <h2>{data.currently.apparentTemperature.toFixed(1)}°C</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    config: state.config,
    refresh: state.config.refresh,
  };
};

export default connect(mapStateToProps)(Weather);
