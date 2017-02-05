import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataList } from '../../../../both/collections/datalist.collection';
// import { DataList_interface } from '../../../both/models/datalist.model';
import template from './data_input.component.html';

@Component({
    selector: 'data-comp',
    template
})

export class DataInputComponent implements OnInit {
    addForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            id: ['', Validators.required],
            name: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    addData(): void {
        DataList.insert(this.addForm.value);

        this.addForm.reset();
    }
}
