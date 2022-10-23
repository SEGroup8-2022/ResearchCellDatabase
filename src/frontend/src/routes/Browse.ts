import { el, mount } from 'redom';

import Page from './Page';

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
    el = el('div.main-content.pure-u-1-1.pure-u-md-4-5', this.table);

    constructor() {
        super();
        const records = [
            [1235, "Kunal", "kunal@example.com", "C++ Application", "Tannennbaum", 2020],
            [1230, "ARC", "arc@example.com", "Low Level Audio Processing", "Acoustics", 2021]
        ];
        
        const rows = records.map(rowData => el('tr',
           ...rowData.map(cellData =>
               el('td', cellData.toString())
           )
        ));

        rows.forEach(row => mount(this.tbody, row));

    }
}

