import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { setModal } from '../../containers/actions';
import componentConfig from '../Widgets/componentConfig';

function ConfigureModal({ setModal, widget }) {
  const [config, setConfig] = useState();

  const getConfig = () => {
    const configItem = componentConfig.find((w) => w.name === widget.component);
    if (configItem) setConfig(configItem);
  };

  const getSchema = () => {
    return config.schema;
  };

  const getValue = (item) => {
    return config.values[item.id];
  };

  const handleChange = (item, value) => {
    const mutatableConfig = { ...config };
    mutatableConfig.values[item.id] = value;
    setConfig(mutatableConfig);
  };

  const getInput = (item) => {
    console.log('getting input for ', item);
    return (
      <>
        {item.type === 'checkbox' ? (
          <Form.Check
            type='checkbox'
            label={item.label}
            checked={getValue(item)}
            onChange={({ target }) => {
              console.log(target.value);
              handleChange(item, target.checked);
            }}
          />
        ) : null}
        {item.type === 'input' ? (
          <>
            <Form.Label>{item.label}</Form.Label>
            <Form.Control type={item.type} placeholder='' />
          </>
        ) : null}
      </>
    );
  };

  return (
    <Modal show={true} centered dialogClassName='modal-90w'>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Configure Widget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId='formBasic'>
          {config
            ? getSchema().map((item) => {
                return getInput(item);
              })
            : getConfig()}
        </Form.Group>
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

export default connect(null, mapDispatchToProps)(ConfigureModal);
