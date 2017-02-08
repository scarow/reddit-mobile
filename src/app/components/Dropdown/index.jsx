import './styles.less';
import React from 'react';
import { Anchor } from '@r/platform/components';
import { Tooltip } from '@r/widgets/tooltip';
import { Modal } from '@r/widgets/modal';

import cx from 'lib/classNames';

const T = React.PropTypes;

export function Dropdown(props) {
  return (
    <div className='DropdownWrapper'>
      <Tooltip
        id={ props.id }
        alignment={ Tooltip.ALIGN.BELOW }
        offset={ 8 }
        className='Dropdown'
      >
        { props.children }
      </Tooltip>
    </div>
  );
}

Dropdown.propTypes = {
  id: T.string.isRequired,
};

export function DropdownModal(props) {
  return (
    <div className='DropdownModalWrapper'>
      <Modal
        id={ props.id }
        className='DropdownModal'
      >
        { props.showX &&
          <div className='DropdownClose'>
            <DropdownRow
              icon='x'
              onClick={ props.onClick }
            />
          </div>
        }
        <div onClick={ props.onClick }>
          { props.children }
        </div>
      </Modal>
    </div>
  );
}

DropdownModal.propTypes = {
  id: T.string.isRequired,
  onClick: T.func,
  showX: T.bool,
};

DropdownModal.defaultProps = {
  onClick: () => {},
  showX: false,
};

export function DropdownRow(props) {
  const className = cx(`DropdownRow__icon icon icon-${props.icon}`, {
    'm-selected': props.isSelected,
  });

  return (
    <div className='DropdownRow' onClick={ props.onClick }>
      <div className={ props.icon ? className : '' } />
      <div className='DropdownRow__text'>{ props.text }</div>
    </div>
  );
}

DropdownRow.propTypes = {
  icon: T.string.isRequired,
  text: T.string.isRequired,
  onClick: T.func,
  isSelected: T.bool,
};

DropdownRow.defaultProps = {
  onClick: () => {},
  isSelected: false,
};

export function DropdownLinkRow(props) {
  return (
    <Anchor href={ props.href } className='DropdownLinkRow'>
      <div className={ `DropdownLinkRow__icon icon icon-${props.icon}` }/>
      <div className='DropdownLinkRow__text'>{ props.text }</div>
    </Anchor>
  );
}

DropdownLinkRow.propTypes = {
  href: T.string.isRequired,
  icon: T.string.isRequired,
  text: T.string.isRequired,
};
