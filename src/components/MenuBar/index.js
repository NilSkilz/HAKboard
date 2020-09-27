import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Navbar, NavbarBrand } from 'react-bootstrap';
import { setEditMode, setModal } from '../../containers/actions';

class MenuBar extends Component {
  render() {
    return (
      <Navbar color='light' light expand='md' className='d-flex justify-content-between'>
        <div className='flex-column'>
          <NavbarBrand href='/' style={{ textShadow: 'none' }}>
            HAKboard
          </NavbarBrand>
        </div>
        <div className='flex-column'>
          <Button
            variant='primary'
            className='mr-3'
            color='primary'
            onClick={() => {
              const { setModal } = this.props;
              setModal('add');
            }}>
            Add Widget
          </Button>
          <Button
            variant='secondary'
            onClick={() => {
              const { setEditMode } = this.props;
              setEditMode(false);
            }}>
            Done
          </Button>
        </div>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editMode: state.editMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEditMode: (editMode) => {
      dispatch(setEditMode(editMode));
    },
    setModal: (type, entity) => {
      dispatch(setModal(type, entity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
