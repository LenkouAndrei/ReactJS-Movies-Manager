import React from 'react';
import ReactDOM from 'react-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './modal.component.scss';

interface IModalProps {
    handleClose: () => void;
    isOpen: boolean;
    children: JSX.Element;
}

const blockName = 'modal';
type TModal = ({ handleClose, isOpen, children }: IModalProps) => JSX.Element;

export const Modal: TModal = ({ handleClose, isOpen, children }: IModalProps): JSX.Element => { 
    const content: JSX.Element = (
      isOpen && <aside
        className={`${blockName}__overlay`}
        onClick={handleClose}>
        <div className={blockName}>
          <button
              className={`${blockName}__btn`}
              onClick={handleClose}>
              <FontAwesomeIcon
                  className={`${blockName}__icon`}
                  icon={faTimes}
                  size='2x'/>
          </button>
          <section
            className={`${blockName}__content`}
            onClick={event => event.stopPropagation()}>
            {children}
          </section>
        </div>
      </aside>
    );

    return ReactDOM.createPortal(content, document.body);
  };