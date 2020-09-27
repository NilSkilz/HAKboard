import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { setModal } from '../../containers/actions';

function AddModal({ setModal }) {
  return (
    <Modal show={true} centered dialogClassName='modal-90w'>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Add Widget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Choose a widget to add</h4>
        <Button
          variant='primary'
          onClick={() => {
            setModal({});
          }}>
          Time Widget
        </Button>
        <Button
          variant='primary'
          onClick={() => {
            setModal({});
          }}>
          Date Widget
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setModal({});
          }}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModal: (type, entity) => {
      dispatch(setModal(type, entity));
    },
  };
};

export default connect(null, mapDispatchToProps)(AddModal);
