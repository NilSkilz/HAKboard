import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import moment from 'moment';
import ReactSVG from 'react-svg';

class Todoist extends Component {
  state = { data: null };
  componentDidUpdate() {
    const { data } = this.state;
    const { refresh } = this.props;
    if (!data || refresh) {
      console.log('REFRESHING: ', refresh);
      this.fetchTodos();
    }
  }

  fetchTodos = () => {
    const { todoist = {} } = widgets;
    const { key } = todoist;
    Axios.get(`https://api.todoist.com/rest/v1/tasks`, {
      headers: { Authorization: `Bearer ${key}` }
    }).then(({ data }) => {
      this.setState({ data });
    });
  };

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <div className='d-flex flex-row justify-content-between w-100' style={{ height: '200px' }}>
        {data ? (
          <div className='d-flex flex-column m-3 align-items-start'>
            <h5>Todoist</h5>
            {data.map(todo => {
              if (todo.project_id !== 2220304310) return;
              return (
                <div className='d-flex flex-row'>
                  <ReactSVG
                    src={`/assets/icons/${todo.completed ? 'checkbox-checked' : 'checkbox-blank'}.svg`}
                    style={{ width: '30px' }}
                  />
                  <h6 className='mt-1'>{todo.content}</h6>
                </div>
              );
            })}
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

const mapStateToProps = state => {
  return {
    config: state.config.widgets.home_assistant
  };
};

export default connect(mapStateToProps)(Todoist);
