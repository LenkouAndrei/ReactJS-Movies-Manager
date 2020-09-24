import React, { useState } from 'react';
import { Logo } from '../../components';
import { IMovie, TNullable } from '../../types/types';
import { FormPage, Modal, Wrapper } from '../';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.component.scss';

export interface IHeaderProps {
    pageName: PageName;
    onAddBtnClick: (newMovie: IMovie) => void;
}

export enum PageName {
    Main = 'Main',
    Details = 'Details',
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
          case PageName.Details:
            return <button className={'search-btn'}>
              <FontAwesomeIcon
                className={`${blockName}__icon`}
                icon={faSearch}/>
            </button>;
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