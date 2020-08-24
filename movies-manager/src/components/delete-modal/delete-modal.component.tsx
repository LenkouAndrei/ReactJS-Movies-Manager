import React from "react";
import "./delete-modal.component.scss";

const blockName = 'delete-modal';

export const DeleteModal = (props: {title: string}): JSX.Element => {
    return <div className={blockName}>
        <h2 className={`${blockName}__headline`}>Delet Movie</h2>
        <span className={`${blockName}__warning`}>
            { `Are you shure, you want to delete "${props.title}" movie?` }
        </span>
        <button className={`${blockName}__btn--confirm`}>Confirm</button>  
    </div>;
}