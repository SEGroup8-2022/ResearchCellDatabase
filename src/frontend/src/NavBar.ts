import { el, RedomComponent } from 'redom';
import Scene from 'scenejs';

import { RouteName } from './constants';
import { getClassSelector } from './utils';

export default class NavBar implements RedomComponent {

    selectedLinkName: RouteName = 'browse';
    heading = el('a.pure-menu-heading', 'Research Cell DB');
    browseButton = el('a.pure-menu-link.link-home', {href: '#browse'}, 'Browse');
    submitButton = el('a.pure-menu-link.link-login', {href: '#submit'}, 'Submit');
    underline = el('div.nav-underline');
    el = el('nav',
        el('div.nav-content.pure-menu.pure-menu-horizontal',
            this.heading,
            el('ul.pure-menu-list',
                el('li.pure-menu-item.pure-menu-selected',
                   this.browseButton),
                el('li.pure-menu-item',
                   this.submitButton))),
        this.underline);

    setSelectedLink(linkName: RouteName) {
        switch(linkName) {
            case 'browse':
                this.submitButton.parentElement.classList.remove('pure-menu-selected');
                this.browseButton.parentElement.classList.add('pure-menu-selected');
                break;
            case 'submit':
                this.browseButton.parentElement.classList.remove('pure-menu-selected');
                this.submitButton.parentElement.classList.add('pure-menu-selected');
                break;
            default:
                break;
        }
        this.selectedLinkName = linkName;
    }

    onmount() {

        new Scene({
            [getClassSelector(this.heading)]: {
                0: "opacity: 0; transform: scale(0);",
                0.5: "opacity: 1; transform: scale(1);"
            },
            [getClassSelector(this.browseButton)]: {
                0.2: "opacity: 0; transform: translateY(-150%);",
                0.7: "opacity: 1; transform: translateY(0%);"
            },
            [getClassSelector(this.submitButton)]: {
                0.4: "opacity: 0; transform: translateY(-150%);",
                0.9: "opacity: 1; transform: translateY(0%);"
            },
            [getClassSelector(this.underline)]: {
                0: "width: 0%;",
                1: "width: 100%;"
            },
        }, {
            selector: true,
            easing: 'ease-in-out'
        }).playCSS();

    }
    
}

