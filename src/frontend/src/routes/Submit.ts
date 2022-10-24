import { el } from 'redom';

import Swal from 'sweetalert2';

import Page from './Page';

export default class Submit extends Page {

    heading = el('h3', "Submit a new paper");
    inputs = {
        employeeId: el('input', {
            type: 'text',
            name: 'employee-id',
            required: true,
            placeholder: "1234",
            pattern: '\\d{4}'
        }),
        employeeName: el('input', {
            type: 'text',
            name: 'employee-name',
            required: true,
            placeholder: "Human Name",
        }),
        email: el('input', {
            type: 'email',
            name: 'email',
            required: true,
            placeholder: "employee@company.com"
        }),
        paperTitle: el('input', {
            type: 'text',
            name: 'paper-title',
            required: true,
            placeholder: "An Awesome Title",
        }),
        journal: el('input', {
            type: 'text',
            name: 'journal',
            required: true,
            placeholder: "Amazing Computing Journal",
        }),
        publicationYear: el('input', {
            type: 'text',
            name: 'publication-year',
            required: true,
            placeholder: "2015",
            pattern: '\\d{4}'
        }),
    }
    buttons = {
        submit: el('button.pure-button.pure-button-primary',
           {type: 'submit', id: 'submit'}, "Submit"
        )
    };
    form = el('form.pure-form.pure-form-aligned.paper-details',
        el('fieldset',
          el('div.pure-control-group',
            el('label', {for: 'employee-id'}, "Employee ID"),
            this.inputs.employeeId),
          el('div.pure-control-group',
            el('label', {for: 'employee-name'}, "Employee Name"),
            this.inputs.employeeName),
          el('div.pure-control-group',
            el('label', {for: 'email'}, "Email"),
            this.inputs.email),
          el('div.pure-control-group',
            el('label', {for: 'paper-title'}, "Paper Title"),
            this.inputs.paperTitle),
          el('div.pure-control-group',
            el('label', {for: 'journal'}, "Journal"),
            this.inputs.journal),
          el('div.pure-control-group',
            el('label', {for: 'publication-year'}, "Publication Year"),
            this.inputs.publicationYear),
          el('div.pure-controls', this.buttons.submit))) as HTMLFormElement;
    el = el('div.main-content.pure-u-1-1.pure-u-md-4-5', this.heading, el('hr'), this.form);

    constructor() {
        super();
        this.buttons.submit.addEventListener('click', async event => {

            event.preventDefault();

            const isValid = this.form.reportValidity() && (n =>
                !Number.isNaN(n)
                && 1970 <= n
                && n <= new Date().getFullYear()
            )(parseInt(this.inputs.publicationYear.value));

            if(!isValid) {
                Swal.fire({
                    title: 'Error',
                    text: "Some fields contain invalid input!",
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#2592E6',
                    iconColor: '#f25757',
                    background: '#fafafa'
                });
                return;
            }

            const response = await fetch("/newpaper", {
                method: 'POST',
                body: JSON.stringify({
                    employeeId: this.inputs.employeeId.value,
                    employeeName: this.inputs.employeeName.value,
                    email: this.inputs.email.value,
                    paperTitle: this.inputs.paperTitle.value,
                    journal: this.inputs.journal.value,
                    publicationYear: parseInt(this.inputs.publicationYear.value)
                }),
                headers: [
                    ['Content-Type', 'application/json']
                ]
                
            });

            const result: {
                success: string,
                message: string
            } = await response.json();

            if(!result.success) {
                Swal.fire({
                    title: 'Error',
                    text: result.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#2592E6',
                    iconColor: '#f25757',
                    background: '#fafafa'
                });
                return;
            }

            Swal.fire({
                title: 'Success',
                text: result.message,
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#2592E6',
                iconColor: '#4ce078',
                background: '#fafafa'
            });

            Object.values(this.inputs).forEach(input => {
                input.value = '';
            });

        });

    }

}

