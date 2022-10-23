import { el } from 'redom';

import Page from './Page';

export default class Submit extends Page {

    heading = el('h3', "Submit a new paper");
    form = el('form.pure-form.pure-form-aligned.paper-details',
        el('fieldset',
          el('div.pure-control-group',
            el('label', {for: 'employee-id'}, "Employee ID"),
            el('input', {type: 'text', id: 'employee-id', placeholder: "1234"})),
          el('div.pure-control-group',
            el('label', {for: 'employee-name'}, "Employee Name"),
            el('input', {type: 'text', id: 'employee-name', placeholder: "John Doe"})),
          el('div.pure-control-group',
            el('label', {for: 'email'}, "Email"),
            el('input', {type: 'text', id: 'email', placeholder: "employee@example.com"})),
          el('div.pure-control-group',
            el('label', {for: 'paper-title'}, "Paper Title"),
            el('input', {type: 'text', id: 'paper-title', placeholder: "An Awesome Title"})),
          el('div.pure-control-group',
            el('label', {for: 'journal'}, "Journal"),
            el('input', {type: 'text', id: 'journal', placeholder: "Amazing Computing Journal"})),
          el('div.pure-control-group',
            el('label', {for: 'publication-year'}, "Publication Year"),
            el('input', {type: 'text', id: 'publication-year', placeholder: "2015"})),
          el('div.pure-controls',
            el('button.pure-button.pure-button-primary', {type: 'submit', id: 'submit'}, "Submit"))));
    el = el('div.main-content.pure-u-1-1.pure-u-md-4-5', this.heading, el('hr'), this.form);

    constructor() {
        super();
    }
}

