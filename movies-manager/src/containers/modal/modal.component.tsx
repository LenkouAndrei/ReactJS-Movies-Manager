import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./modal.component.scss";

interface IModalProps {
    handleClose: () => void;
    isOpen: boolean;
    children: JSX.Element;
}

const blockName = 'modal';

export const Modal = ({ handleClose, isOpen, children }: IModalProps): JSX.Element => { 
    const content = (
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

    return ReactDOM.createPortal(content, document.getElementById('root'));
  };
