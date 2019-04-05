import {Tap} from "@datastore/model";
import {EntityRecord, GenericDatastore} from "./generic-datastore";
import {entity} from "@google-cloud/datastore/build/src/entity";


class TapDatastore extends GenericDatastore<Tap> {
    constructor() {
        super('Tap');
    }

    protected createEntityRecord(key: entity.Key, entityObj: Tap,): EntityRecord<Tap> {
        const entity: EntityRecord<Tap> = {
            key: key,
            data: entityObj.updateCreated(new Date().getTime()),
        };
        return entity;
    }

    protected createEntityObj(id: number, json: any): Tap {
        return Tap.fromJSON(JSON.stringify(json)).updateId(id);
    }
}

export {TapDatastore}







