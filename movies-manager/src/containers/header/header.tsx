import React, { useState } from 'react';
import { Logo } from '../../components';
import { TNullable } from '../../types/types';
import { MovieFormWithState, Modal, Wrapper } from '../';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.scss';

export interface IHeaderProps {
    pageName: PageName;
}

export enum PageName {
    Main = 'Main',
    Details = 'Details',
}

type TVoidFunc = () => void;

const blockName = 'header';

export function Header({ pageName }: IHeaderProps): JSX.Element {
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);

    const showModal: TVoidFunc = () => {
        setIsDialogOpen(true);
    };

    const hideModal: TVoidFunc = () => {
        setIsDialogOpen(false);
    };

    const getHeaderElement: () => TNullable<JSX.Element> = () => {
        switch (pageName) {
            case PageName.Main:
                return <>
                    <button
                        className={'add-btn'}
                        onClick={showModal}>+ Add Movie</button>
                    <Modal isOpen={isDialogOpen} handleClose={hideModal}>
                        <MovieFormWithState onSaveChanges={hideModal}/>
                    </Modal>
                </>;
          case PageName.Details:
            return <button
              className={'search-btn'}>
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