import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import ReactSVG from 'react-svg';

class HomeAssistant extends Component {
  state = { states: null };
  componentDidUpdate() {
    const { states } = this.state;
    if (!states) {
      this.fetchData();
    }
  }

  fetchData = () => {
    console.log('Fetching HA data');
    const { long_lived_access_token, entities = [], url } = this.props.config;
    if (long_lived_access_token) {
      Axios.defaults.headers.common['Authorization'] = `Bearer ${long_lived_access_token}`;
      Axios.get(`${url}/api/states`)
        .then(({ data }) => {
          const ents = entities.map(entity => {
            const state = data.find(e => e.entity_id === entity).state;
            const atts = data.find(e => e.entity_id === entity).attributes;
            return {
              entity_id: entity,
              state: state,
              attributes: atts
            };
          });
          this.setState({ states: ents });
          setTimeout(this.fetchData, 1000 * 60);
        })
        .catch(e => {
          setTimeout(this.fetchData, 1000 * 60);
        });
    }
  };

  render() {
    const { states } = this.state;
    return (
      <div className='d-flex flex-row flex-wrap justify-content-between w-100' style={{ height: '200px' }}>
        {states &&
          states.map((state, index) => {
            if (state.state === 'locked') state.attributes.device_class = 'lock';
            if (state.state === 'unlocked') state.attributes.device_class = 'lock-open';

            if (state.state === 'armed_home') state.attributes.device_class = 'shield-home-outline';
            if (state.state === 'armed_away') state.attributes.device_class = 'shield-lock-outline';
            if (state.state === 'disarmed') state.attributes.device_class = 'shield-outline';

            if (state.attributes.unit_of_measurement === 'Wh') state.attributes.device_class = 'flash';

            return (
              <div key={index} className='d-flex flex-row align-items-center col-6'>
                <div className='d-flex flex-column align-items-center'>
                  <ReactSVG src={`/assets/icons/${state.attributes.device_class}.svg`} style={{ width: '40px' }} />
                </div>
                <div className='d-flex flex-column align-items-start'>
                  <div className='d-flex flex-row text-left'>
                    <p className=''>{state.attributes.friendly_name}</p>
                  </div>
                  <div className='d-flex flex-row'>
                    <h4>{`${state.state}`}</h4>
                    <p>{`${state.attributes.unit_of_measurement || ''}`}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    config: state.config.widgets.home_assistant
  };
};

export default connect(mapStateToProps)(HomeAssistant);
