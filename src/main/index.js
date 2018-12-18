import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Example from './example-component';

function start(options) {
    const {el} = options;
    ReactDOM.render(<Example/>, el);
    return Promise.resolve({
        stop: () => {
            ReactDOM.unmountComponentAtNode(el);
            console.log('stopped');
            return Promise.resolve();
        }
    });
}

export {start};
