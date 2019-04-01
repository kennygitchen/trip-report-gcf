import {Datastore} from "@google-cloud/datastore";
import {entity} from "@google-cloud/datastore/build/src/entity";
import {Tap} from "@datastore-service/model";


interface TapEntity {
    key: entity.Key;
    data: TapEntityData
}

interface TapEntityData {
    tap: string,
    created: number
}

class TapDatastore {
    private datastore: Datastore = new Datastore();

    private createEntity(tap: Tap) {
        const tapKey: entity.Key = this.datastore.key('Tap');
        const entity: TapEntity = {
            key: tapKey,
            data: {
                tap: tap.toJSON(),
                created: new Date().getTime()
            }
        };
        return entity;
    }

    async set(tap: Tap): Promise<string> {
        const entity = this.createEntity(tap);
        try {
            await this.datastore.save(entity);

            // id should never be undefined or null, safe to use default value
            const id = entity.key.id || "";
            console.log(`Tap created successfully, id=${id}`);
            return id;
        } catch (error) {
            console.error('ERROR: unable to insert Tap.', error);
            throw error;
        }
    }

    async get(id: string): Promise<Tap> {
        const key = this.datastore.key(['Tap', Number(id)]);
        try {
            const [entity]: [TapEntityData] = await this.datastore.get(key);
            return Promise.resolve(Tap.fromJSON(entity.tap));
        } catch (error) {
            console.error(`ERROR: Unable to retrieve Tap, id=${id}`, error);
            throw error;
        }
    }
}

export {TapDatastore}







