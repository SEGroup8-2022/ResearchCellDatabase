import { el, RedomComponent } from 'redom';
import Scene from 'scenejs';

import { getClassSelector } from '../utils';

export default abstract class Page implements RedomComponent {

    container = el('div.container')
    el = el('div.main-content.pure-u-4-5.pure-u-md-1-1',
        this.container);

    onmount() {
        new Scene({
            [getClassSelector(this.el)]: {
                0: "opacity: 0; transform: translateX(-25%);",
                1: "opacity: 1; transform: translateX(0%);"
            }
        }, {
            selector: true,
            easing: 'ease'
        }).playCSS();
    }

}
