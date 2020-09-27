import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';
import ComponentContainer from '../components/Widgets/ComponentContaner';

import BackgroundImage from '../components/BackgroundImage';

import Axios from 'axios';
import yaml from 'js-yaml';
import { addConfig, setEditMode, setModal } from './actions';

import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import Popper from '../components/Popper';
import MenuBar from '../components/MenuBar';
import Modal from '../components/Modals';

const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = [
  { i: 'a', x: 0, y: 0, w: 4, h: 2, component: 'Time', config: { is24Hour: true, showSeconds: true } },
  { i: 'b', x: 9, y: 0, w: 3, h: 2, component: 'Date' },
  { i: 'c', x: 0, y: 3, w: 2, h: 4, component: 'Weather' },
  { i: 'd', x: 10, y: 3, w: 6, h: 4, component: 'WeatherForcast' },
];

// const bottomItems = [<Weather />, <Traffic />, <HomeAssistant />];
// const bottomItems = [<Todoist />];

class App extends Component {
  state = { activeIndex: 0 };
  componentDidMount() {
    this.loadData();

    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.key === 'e' || e.key === 'E') {
      const { editMode, setEditMode } = this.props;
      setEditMode(!editMode);
    }
  };

  loadData = () => {
    this.setState({
      isLoading: true,
      isLoaded: false,
    });

    //	Load Locked Config
    //--------------------------------------------------------//
    Axios.get('./config.yml')
      .then((lockedConfig) => {
        const config = yaml.safeLoad(lockedConfig.data);

        // console.log(lockedConfig);

        this.props.addConfig(config.config);

        //	Save
        //--------------------------------------------------------//
        this.setState({
          isLoading: false,
          isLoaded: true,
          hasLoaded: true,
          isError: false,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          isLoaded: false,
          isError: true,
          hasErrored: true,
        });
        console.error(error);
      });
  };

  // next = () => {
  //   const { activeIndex } = this.state;
  //   const nextIndex = activeIndex === bottomItems.length - 1 ? 0 : activeIndex + 1;
  //   this.setState({ activeIndex: nextIndex });
  // };

  // previous = () => {
  //   const { activeIndex } = this.state;
  //   const nextIndex = activeIndex === 0 ? bottomItems.length - 1 : activeIndex - 1;
  //   this.setState({ activeIndex: nextIndex });
  // };

  saveLayout = (layout) => {
    const layoutYaml = yaml.safeDump(layout, { skipInvalid: true });
  };

  render() {
    // const { activeIndex } = this.state;
    const { editMode } = this.props;
    // const slides = bottomItems.map((item, index) => {
    //   return (
    //     <CarouselItem key={index} className='w-100'>
    //       {item}
    //     </CarouselItem>
    //   );
    // });

    return (
      <div className='App'>
        {editMode && <MenuBar />}
        <BackgroundImage>
          <Modal />
          <ResponsiveGridLayout
            className='layout'
            autoSize={false}
            layouts={{
              lg: layout,
            }}
            rowHeight={50}
            style={{ height: '100%' }}
            breakpoints={{ lg: 0 }}
            cols={{ lg: 12 }}
            onLayoutChange={this.saveLayout}
            compactType={null}
            isDraggable={editMode}
            isResizable={false}>
            {layout.map((widget) => {
              let Component = ComponentContainer[widget.component];
              return (
                <div key={widget.i} style={{ backgroundColor: editMode ? 'rgba(0,0,0,0.2)' : '' }}>
                  {editMode && <Popper widget={widget} />}
                  <Component config={widget.config} />
                </div>
              );
            })}
          </ResponsiveGridLayout>
          {/* <div className='d-flex h-100 w-100 flex-column'>
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
          </div> */}
        </BackgroundImage>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    config: state.config,
    editMode: state.editMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addConfig: (config) => {
      dispatch(addConfig(config));
    },
    setEditMode: (editMode) => {
      dispatch(setEditMode(editMode));
    },
    setModal: (type, entity) => {
      dispatch(setModal(type, entity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
