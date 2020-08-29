import React from "react";
import "./delete-modal.component.scss";

const blockName = 'delete-modal';

interface IDeletModalProps {
    title: string;
    onDeleteConfirm(): void;
}

export const DeleteModal = (props: IDeletModalProps): JSX.Element => {
    return <div className={blockName}>
        <h2 className={`${blockName}__headline`}>Delet Movie</h2>
        <span className={`${blockName}__warning`}>
            { `Are you shure, you want to delete "${props.title}" movie?` }
        </span>
        <button
            className={`${blockName}__btn--confirm`}
            onClick={props.onDeleteConfirm}>Confirm</button>  
    </div>;
}