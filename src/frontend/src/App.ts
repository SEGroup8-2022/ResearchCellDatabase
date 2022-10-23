import { el, RedomComponent, router } from 'redom';

import NavBar from './NavBar';
import { RouteName } from './constants';

import Browse from './routes/Browse';
import Submit from './routes/Submit';

export default class App implements RedomComponent {

    navBar = new NavBar();
    viewRouter = router('main.pure-g', {
        'browse': Browse,
        'submit': Submit
    });

    el = el('div.app', this.navBar, this.viewRouter);

    setView(pageName: RouteName) {
        this.viewRouter.update(pageName);
        this.navBar.setSelectedLink(pageName);
    }

    onmount() {
        this.setView('browse');
    }

    constructor() {
        this.navBar.browseButton.addEventListener('click', _event => {
            this.setView('browse');
        });
        this.navBar.submitButton.addEventListener('click', _event => {
            this.setView('submit');
        });
    }

}

