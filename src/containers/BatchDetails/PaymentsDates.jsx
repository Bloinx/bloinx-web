import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

export default function ParticipantDates({ isOpen, onAccept, onCancel }) {
  return (
    <Modal title="Basic Modal" visible={isOpen} onOk={onAccept} onCancel={onCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}

ParticipantDates.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
