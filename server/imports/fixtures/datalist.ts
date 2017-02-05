import { DataList } from '../../../both/collections/datalist.collection';
import { DataList_interface } from '../../../both/models/datalist.model';

export function loadDataList() {
    if (DataList.find().cursor.count() === 0) {
        const datalist: DataList_interface[] = [
            {
                name: 'AAA',
                id: '1',
                meta: 'meta1'
            },
            {
                name: 'AAB',
                id: '2',
                meta: 'meta2'
            },
            {
                name: 'ABA',
                id: '3',
                meta: 'meta3'
            },
            {
                name: 'ABB',
                id: '4',
                meta: 'meta4'
            },
            {
                name: 'BAA',
                id: '5',
                meta: 'meta5'
            },
        ];

        datalist.forEach((data: DataList_interface) => DataList.insert(data));
    }
}
