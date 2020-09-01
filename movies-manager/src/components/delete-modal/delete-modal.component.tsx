import React from 'react';
import './delete-modal.component.scss';

const blockName = 'delete-modal';

interface IDeletModalProps {
    title: string;
    onDeleteConfirm(): void;
}

type TDeletModal = (props: IDeletModalProps) => JSX.Element;

export const DeleteModal: TDeletModal = ({ title, onDeleteConfirm }: IDeletModalProps): JSX.Element => {
    return <div className={blockName}>
        <h2 className={`${blockName}__headline`}>Delet Movie</h2>
        <span className={`${blockName}__warning`}>
            { `Are you shure, you want to delete '${title}' movie?` }
        </span>
        <button
            className={`${blockName}__btn--confirm`}
            onClick={onDeleteConfirm}>Confirm</button>
    </div>;
};