import { el, svg, mount, RedomComponent, unmount } from 'redom';
import Scene from 'scenejs';

import Page from './Page';

import { Record } from '../constants';
import { getClassSelector } from '../utils';

class LoadingAnimation implements RedomComponent {

    el = el('div.loading',
       ...Array.from(
           {length: 4},
           () => svg("svg",
                { height: 12, width: 12 },
                svg("circle",
                    { r: 5, cx: 6, cy: 6, fill: '#212121' }
                )
           )
        )
    );

    onmount() {

        new Scene({
            'svg': (i: number) =>  ({
                0: "transform: translateY(0.7em)",
                1: "transform: translateY(-0.7em)",
                2: "transform: translateY(0.7em)",
                options: {
                    delay: i/6,
                    duration: 0.8
                }
            })
        }, {
            selector: true,
            easing: 'ease-in-out',
            iterationCount: 'infinite'
        }).playCSS();

    }

}

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
    container = el('div.table-container.container', this.table)
    loading = new LoadingAnimation();
    el = el('div.main-content.pure-u-1-1.pure-u-md-4-5', this.loading);

    addRow(record: Record) {
        mount(this.tbody, el('tr',
           ...record.map(cellData =>
               el('td', cellData.toString())
           )
        ));
    }

    async onmount() {

        try {

            const response = await fetch("/api/records");
            const records: Record[] = await response.json();

            records.forEach(record => this.addRow(record));

            unmount(this, this.loading);

            mount(this, this.container);

        } catch(e) {
            console.error("Error fetching records!");
        }

        super.onmount();

    }

}

