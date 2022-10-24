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
        this.navBar.setSelectedLink(pageName);
        this.viewRouter.update(pageName);
    }

    async onmount() {
        await new Promise(resolve => setTimeout(resolve, 500));
        this.setView('browse');
    }

    constructor() {
        Object.keys(this.navBar.buttons).forEach((key: RouteName) => {
            this.navBar.buttons[key].addEventListener('click', _event => {
                this.setView(key);
            });
        });
    }

}

