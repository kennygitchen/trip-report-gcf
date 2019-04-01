import {Datastore, Query} from "@google-cloud/datastore";
import {Entity, entity} from "@google-cloud/datastore/build/src/entity";
import {Tap} from "@datastore-service/model";
import {RunQueryInfo, RunQueryResponse} from "@google-cloud/datastore/build/src/query";


//
// TODO: create a generic CURD operation class with <T> as type
//

interface TapEntity {
    key: entity.Key;
    data: TapEntityData
}

interface TapEntityData {
    tap: string,
    created: number
}

class TapDatastore {
    private static PAGE_SIZE = 500;
    private static KIND = 'Tap';
    private datastore: Datastore = new Datastore();

    private createEntity(tap: Tap) {


        const tapKey: entity.Key = this.datastore.key(TapDatastore.KIND);
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
        const key = this.datastore.key([TapDatastore.KIND, Number(id)]);
        try {
            const [entity]: [TapEntityData] = await this.datastore.get(key);
            return Promise.resolve(Tap.fromJSON(entity.tap));
        } catch (error) {
            console.error(`ERROR: Unable to retrieve Tap, id=${id}`, error);
            throw error;
        }
    }

    async list(): Promise<Tap[]> {
        try {
            let [taps]: Entity[] = await this.pageQuery(
                () => this.datastore.createQuery(TapDatastore.KIND).limit(TapDatastore.PAGE_SIZE)
            );

            return taps.map((entity: TapEntityData) => Tap.fromJSON(entity.tap));
        } catch (error) {
            console.error(`ERROR: Unable to list Taps`, error);
            throw error;
        }
    }

    private async pageQuery(createQuery: (param?: any) => Query, pageCursor?: string): Promise<RunQueryResponse> {
        let query: Query = createQuery();

        if (pageCursor) {
            query = query.start(pageCursor);
        }
        const [entities, info]: [Entity[], RunQueryInfo] = await this.datastore.runQuery(query);
        if (info.moreResults !== Datastore.NO_MORE_RESULTS) {
            // If there are more results to retrieve, the end cursor is
            // automatically set on `info`. To get this value directly, access
            // the `endCursor` property.
            const results = await this.pageQuery(createQuery, info.endCursor);

            // Concatenate entities
            results[0] = entities.concat(results[0]);
            return results;
        }

        return [entities, info];
    }
}

export {TapDatastore}







