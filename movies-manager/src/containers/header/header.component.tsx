import React, { Component } from "react";
import { Logo } from "../../components";
import { Wrapper } from "../wrapper/wrapper.component";
import { Modal } from "../modal/modal.component";
import { FormPage } from "../form-page/form-page.component";
import { IMovie, TNullable } from "../../types/types";
import { OverflowContext } from "../../context";
import "./header.component.scss";

export interface IHeaderProps {
    pageName: PageName;
    onAddBtnClick: (newMovie: IMovie) => void;
};

export enum PageName {
    Main = 'Main',
    AddForm = 'AddForm',
    EditForm = 'EditForm',
}

const blockName = "header";

interface IMainState {
    isDialogOpen: boolean;
    pageName: PageName;
}

export class Header extends Component<IHeaderProps, IMainState> {
    static contextType = OverflowContext;
    constructor(props: any) {
        super(props);
        this.state = {
            isDialogOpen: false,
            pageName: this.props.pageName,
        }
    }

    showModal = () => {
        this.setState({ isDialogOpen: true });
        this.context.setOverflow('overflow-hidden');
    };

    hideModal = () => {
        this.setState({ isDialogOpen: false });
        this.context.setOverflow('');
    };

	createNewMovie = (newMovie: IMovie) => {
	    this.props.onAddBtnClick(newMovie);
        this.hideModal();
    };

    getHeaderElement(): TNullable<JSX.Element> {
        switch (this.props.pageName) {
            case PageName.Main:
                return  <OverflowContext.Consumer>
                    {() => <>
                        <button
                            className={'add-btn'}
                            onClick={this.showModal}>+ Add Movie</button>
                        <Modal isOpen={this.state.isDialogOpen} handleClose={this.hideModal}>
                            <FormPage onSaveChanges={this.createNewMovie} movie={null}/>
                        </Modal>
                    </>}
                    </OverflowContext.Consumer>;
            default:
                return null;
        }
    }

    render() {
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
};