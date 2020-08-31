import React, { Component, useState } from 'react';
import { Logo } from '../../components';
import { IMovie, TNullable } from '../../types/types';
import { FormPage } from '../form-page/form-page.component';
import { Modal } from '../modal/modal.component';
import { Wrapper } from '../wrapper/wrapper.component';
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

export function Header(props: IHeaderProps): JSX.Element {
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);

    const showModal: TModalToggler = () => {
        setIsDialogOpen(true);
        document.body.classList.add( 'overflow-hidden' );
    }

    const hideModal: TModalToggler = () => {
        setIsDialogOpen(false);
        document.body.classList.remove( 'overflow-hidden' );
    }

    const createNewMovie: TCreateMovie = (newMovie: IMovie) => {
        props.onAddBtnClick(newMovie);
        hideModal();
    }

    const getHeaderElement: () => TNullable<JSX.Element> = () => {
        switch (props.pageName) {
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
    }

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