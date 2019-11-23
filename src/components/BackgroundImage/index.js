import React, { Component } from 'react';
import Axios from 'axios';

class BackgroundImage extends Component {
  state = { url: null };
  componentDidMount = () => {
    this.fetchRandomImage();
  };

  fetchRandomImage = () => {
    Axios.get('/images.txt').then(({ data }) => {
      const allLines = data.split(/\r\n|\n/);
      const url = allLines[this.getRandomInt(allLines.length)];
      this.setState({ url });
      setTimeout(this.fetchRandomImage, 1000 * 60 * 5);
    });
  };

  getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  render() {
    const { url } = this.state;
    // const url = '/assets/background.png';
    const { children } = this.props;
    return url ? (
      <>
        <div
          style={{
            position: 'absolute',
            backgroundImage: `url(${url})`,
            backgroundSize: 'cover',
            width: '100%',
            height: '100%'
          }}>
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              width: '100%',
              height: '100%'
            }}>
            {children}
          </div>
        </div>
      </>
    ) : null;
  }
}

export default BackgroundImage;
