import React, { useState } from 'react';
import { Logo } from '../../components';
import { IMovie, TNullable } from '../../types/types';
import { FormPage, Modal, Wrapper } from '../';
import './header.component.scss';

export interface IHeaderProps {
    pageName: PageName;
    onAddBtnClick: (newMovie: IMovie) => void;
}

export enum PageName {
    Main = 'Main',
    AddForm = 'AddForm',
    EditForm = 'EditForm',
}

type TModalToggler = () => void;
type TCreateMovie = (newMovie: IMovie) => void;

const blockName = 'header';

export function Header({ pageName, onAddBtnClick }: IHeaderProps): JSX.Element {
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);

    const showModal: TModalToggler = () => {
        setIsDialogOpen(true);
    };

    const hideModal: TModalToggler = () => {
        setIsDialogOpen(false);
    };

    const createNewMovie: TCreateMovie = (newMovie: IMovie) => {
        onAddBtnClick(newMovie);
        hideModal();
    };

    const getHeaderElement: () => TNullable<JSX.Element> = () => {
        switch (pageName) {
            case PageName.Main:
                return <>
                    <button
                        className={'add-btn'}
                        onClick={showModal}>+ Add Movie</button>
                    <Modal isOpen={isDialogOpen} handleClose={hideModal}>
                        <FormPage onSaveChanges={createNewMovie} movie={null}/>
                    </Modal>
                </>;
            default:
                return null;
        }
    };

    return <header className={blockName}>
        <Wrapper>
            <>
                <section className={`${blockName}__top`}>
                    <Logo/>
                    { getHeaderElement() }
                </section>
            </>
        </Wrapper>
    </header>;
}