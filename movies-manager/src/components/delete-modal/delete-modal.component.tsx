import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./delete-modal.component.scss";

const blockName = 'delete-modal';

export const DeleteModal = (): JSX.Element => {
    return <div className={blockName}>
        <button className={`${blockName}__btn--close`}>
            <FontAwesomeIcon
                className={`${blockName}__icon`}
                icon={faTimes}
                size='2x'/>
        </button>
        <h2 className={`${blockName}__headline`}>Delet Movie</h2>
        <span className={`${blockName}__warning`}>
            Are you shure, you want to delete this movie?
        </span>
        {/* <div className={`${blockName}__btn-container`}> */}
            <button className={`${blockName}__btn--confirm`}>Confirm</button>
        {/* </div> */}
    </div>;
}