import React from 'react';
import './not-found-page.scss';

export const NotFoundPage = () => {
    return (
      <div>
        <svg className={'svg'} viewBox="2000 1000 6000 4000">
          <symbol id="s-text">
            <text className={'text'} textAnchor="middle" x="50%" y="80%">
              404
            </text>
          </symbol>
  
          <g className={'g-ants'}>
            <use xlinkHref="#s-text" className={'text-copy'} />
            <use xlinkHref="#s-text" className={'text-copy'} />
            <use xlinkHref="#s-text" className={'text-copy'} />
            <use xlinkHref="#s-text" className={'text-copy'} />
            <use xlinkHref="#s-text" className={'text-copy'} />
          </g>
        </svg>
      </div>
    );
};