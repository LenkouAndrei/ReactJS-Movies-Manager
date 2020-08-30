import React, { Component } from 'react';
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

interface IMainState {
    isDialogOpen: boolean;
    pageName: PageName;
}

export class Header extends Component<IHeaderProps, IMainState> {
    constructor(props: IHeaderProps) {
        super(props);
        this.state = {
            isDialogOpen: false,
            pageName: this.props.pageName,
        };
    }

    public showModal: TModalToggler = () => {
        this.setState({ isDialogOpen: true });
        document.body.classList.add( 'overflow-hidden' );
    }

    public hideModal: TModalToggler = () => {
        this.setState({ isDialogOpen: false });
        document.body.classList.remove( 'overflow-hidden' );
    }

    public createNewMovie: TCreateMovie = (newMovie: IMovie) => {
        this.props.onAddBtnClick(newMovie);
        this.hideModal();
    }

    public getHeaderElement(): TNullable<JSX.Element> {
        switch (this.props.pageName) {
            case PageName.Main:
                return <>
                    <button
                        className={'add-btn'}
                        onClick={this.showModal}>+ Add Movie</button>
                    <Modal isOpen={this.state.isDialogOpen} handleClose={this.hideModal}>
                        <FormPage onSaveChanges={this.createNewMovie} movie={null}/>
                    </Modal>
                </>;
            default:
                return null;
        }
    }

    public render(): JSX.Element {
        return <header className={blockName}>
            <Wrapper>
                <>
                    <section className={`${blockName}__top`}>
                        <Logo/>
                        { this.getHeaderElement() }
                    </section>
                </>
            </Wrapper>
        </header>;
    }
}