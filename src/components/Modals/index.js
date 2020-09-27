import React from 'react';
import AddModal from './AddModal';
import ConfigureModal from './ConfigureModal';
import { connect } from 'react-redux';

function Modal(props) {
  const { modal } = props;

  if (!modal || modal === {}) return null;

  if (modal.type === 'add') return <AddModal />;
  if (modal.type === 'configure') return <ConfigureModal widget={modal.widget} />;

  return null;
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
  };
};

export default connect(mapStateToProps)(Modal);
