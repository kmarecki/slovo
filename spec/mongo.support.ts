import * as _ from 'lodash';

import { MongoClient, Db, InsertOneWriteOpResult } from 'mongodb';
export class MongoSupport {
    private db: Db;
    open(uri: string): Promise<any> {
        return MongoClient.connect(uri)
            .then((db) => {
                this.db = db;
            })
    }

    insert(collectionName: string, docs: any): Promise<InsertOneWriteOpResult> {
        return this.db.collection(collectionName).insert(docs);
    } 
    drop(collectionName: string): Promise<any> {
        return this.db.collection(collectionName).drop()
                .catch((err) => {} );
    }

    dropAll(): Promise<any> {
        return this.db.collections()
            .then((collections) => Promise.all(
               _(collections)
               .filter((collection) => collection.collectionName.indexOf('system') == -1)
               .map((collection) => collection.drop())
               .value()));
        
    }
}