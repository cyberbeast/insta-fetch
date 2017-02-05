import { MongoObservable } from "meteor-rxjs";

import { DataList_interface } from '../models/datalist.model';
export const DataList = new MongoObservable.Collection('datalist');
