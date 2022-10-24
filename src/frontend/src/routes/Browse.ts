import { el, mount } from 'redom';

import Page from './Page';

import { Record } from '../constants';

export default class Browse extends Page {

    thead = el('thead',
        el('tr',
            el('th', 'Employee ID'),
            el('th', 'Employee Name'),
            el('th', 'Email'),
            el('th', 'Paper Title'),
            el('th', 'Journal'),
            el('th', 'Publication Year')));
    tbody = el('tbody');
    table = el('table.pure-table.pure-table-bordered.publication-records',
        this.thead,
        this.tbody);
    container = el('div.table-container', this.table)
    el = el('div.main-content.pure-u-1-1.pure-u-md-4-5', this.container);

    addRow(record: Record) {
        mount(this.tbody, el('tr',
           ...record.map(cellData =>
               el('td', cellData.toString())
           )
        ));
    }

    async onmount() {

        this.el.style.opacity = '0';

        try {

            const response = await fetch("/records");
            const records: Record[] = await response.json();

            records.forEach(record => this.addRow(record));

        } catch(e) {
            console.error("Error fetching records!");
        }

        this.el.style.opacity = '1';

        super.onmount();

    }

}

