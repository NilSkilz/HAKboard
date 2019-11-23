import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Carousel, CarouselItem } from 'reactstrap';
import BackgroundImage from '../components/BackgroundImage';
import Time from '../components/Time';
import Date from '../components/Date';
import Calendar from '../components/Calendar';
import Weather from '../components/Weather';
import Traffic from '../components/Traffic';
import Todoist from '../components/Todoist';
import HomeAssistant from '../components/HomeAssistant';
import Axios from 'axios';
import yaml from 'js-yaml';
import { addConfig } from './actions';
import './App.css';

const bottomItems = [<Weather />, <Traffic />, <HomeAssistant />];
// const bottomItems = [<Todoist />];

class App extends Component {
  state = { activeIndex: 0 };
  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    this.setState({
      isLoading: true,
      isLoaded: false
    });

    //	Load Locked Config
    //--------------------------------------------------------//
    Axios.get('./config.yml')
      .then(lockedConfig => {
        const config = yaml.safeLoad(lockedConfig.data);

        console.log(config.config);

        this.props.addConfig(config.config);

        //	Save
        //--------------------------------------------------------//
        this.setState({
          isLoading: false,
          isLoaded: true,
          hasLoaded: true,
          isError: false
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          isLoaded: false,
          isError: true,
          hasErrored: true
        });
        console.error(error);
      });
  };

  next = () => {
    const { activeIndex } = this.state;
    const nextIndex = activeIndex === bottomItems.length - 1 ? 0 : activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    const { activeIndex } = this.state;
    const nextIndex = activeIndex === 0 ? bottomItems.length - 1 : activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  render() {
    const { activeIndex } = this.state;

    const slides = bottomItems.map((item, index) => {
      return (
        <CarouselItem key={index} className='w-100'>
          {item}
        </CarouselItem>
      );
    });

    return (
      <div className='App'>
        <BackgroundImage>
          <div className='d-flex h-100 w-100 flex-column'>
            <div className='d-flex w-100 flex-row justify-content-between'>
              <Time />
              <Date />
            </div>
            <div className='d-flex w-100 flex-row justify-content-between' style={{ height: '250px' }}>
              <Calendar />
            </div>
            <div className='d-flex w-100 flex-row justify-content-between' style={{ height: '250px' }}>
              <Todoist />
            </div>
            <div className='d-flex flex-row flex-fill flex-grow align-items-end m-3'>
              <Carousel
                wrap
                className='w-100'
                interval={10000}
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}>
                {slides}
              </Carousel>
            </div>
          </div>
        </BackgroundImage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    config: state.config
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addConfig: config => {
      dispatch(addConfig(config));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
