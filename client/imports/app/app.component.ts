import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataList } from '../../../both/collections/datalist.collection';
import { DataList_interface } from '../../../both/models/datalist.model';

import template from './app.component.html';

@Component({
    selector: 'app',
    template
})

export class AppComponent {
    datalist: Observable<DataList_interface[]>;

    constructor() {
        this.datalist = DataList.find({}).zone();
    }

    removeData(data: DataList_interface): void {
        DataList.remove(data._id);
    }
}
