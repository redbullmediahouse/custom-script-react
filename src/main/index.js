import './styles.css';
import {render} from 'preact';
import notFound from './not-found';

function start(params) {
    const {el, options} = params;
    const {resolveTranslation} = options;

    render(notFound( {resolveTranslation}), el);

    return Promise.resolve({
        stop: () => {
            render(null, el, el.lastChild);
            return Promise.resolve();
        }
    });
}

export {start};
