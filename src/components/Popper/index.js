import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { setModal } from '../../containers/actions';

class Popper extends Component {
  confgureWidget = () => {
    const { setModal, widget } = this.props;
    setModal('configure', widget);
  };

  deleteWidget = () => {
    const { setModal, widget } = this.props;
    setModal('delete', widget);
  };

  render() {
    return (
      <OverlayTrigger
        ref='overlay'
        trigger='click'
        placement='right'
        rootClose={true}
        className='float-right'
        overlay={
          <Popover id='popover-basic'>
            <ButtonGroup vertical aria-label='Basic example'>
              <Button variant='secondary' onClick={this.confgureWidget}>
                Configure
              </Button>
              <Button variant='secondary' onClick={this.deleteWidget}>
                Delete
              </Button>
            </ButtonGroup>
          </Popover>
        }>
        <Button variant='link' className='navbar-toggler toggler-example dots' />
      </OverlayTrigger>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setModal: (type, entity) => {
      dispatch(setModal(type, entity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popper);
