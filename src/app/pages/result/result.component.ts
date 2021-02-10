import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
    selector: 'app-result',
    templateUrl: './result.component.html',
    styleUrls: ['./result.component.scss'],
})

export class ResultComponent implements OnInit {
    results = [
        {
            name: 'Average Stator Winding Temp',
            value: 10,
        },
        {
            name: 'Average Stator Winding Temp',
            value: 10,
        }
        ,
        {
            name: 'Average Stator Winding Temp',
            value: 10,
        },
        {
            name: 'Average Stator Winding Temp',
            value: 10,
        },
    ];

    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
        },
        columns: {
            name: {
                title: 'Name',
                type: 'string',
            },
            value: {
                title: 'Temperature',
                type: 'number',
            },
        },
    };

    source: LocalDataSource = new LocalDataSource();
    constructor() {
        this.source.load(this.results);
    }

    ngOnInit(): void {
    }

}
