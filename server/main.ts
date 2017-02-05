import { Meteor } from 'meteor/meteor';

import { loadDataList } from './imports/fixtures/datalist';

Meteor.startup(() => {
    loadDataList();
});
