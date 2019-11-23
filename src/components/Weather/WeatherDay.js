import React, { Component } from 'react';
import ReactSVG from 'react-svg';

class WeatherDay extends Component {
  render() {
    // const { Component } = this.state;
    const { day, maxTemp, minTemp, icon } = this.props;

    if (!Component) return null;
    return (
      <div className='d-flex flex-column m-3'>
        <h5>{day}</h5>
        <div className='p-2'>
          <ReactSVG src={`/assets/icons/${icon}.svg`} />
        </div>
        <h6 className='m-2'>{maxTemp}°C</h6>
        <h6 className='m-2'>{minTemp}°C</h6>
      </div>
    );
  }
}

export default WeatherDay;
