import React from 'react';
import { Modal } from '@r/widgets/modal';

const T = React.PropTypes;

export class ModToolsModal extends React.Component {
  render() {
    return (
      <div className='ModToolsModalWrapper'>
        <Modal
          id={ this.props.id }
          className='DropdownModal ModToolsModal'
        >
        </Modal>
      </div>
    );
  }
}

ModToolsModal.propTypes = {
  id: T.string.isRequired,
};
