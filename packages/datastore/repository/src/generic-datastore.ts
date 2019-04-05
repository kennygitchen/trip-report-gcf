import {Datastore, Query} from "@google-cloud/datastore";
import {Entity, entity} from "@google-cloud/datastore/build/src/entity";
import {RunQueryInfo, RunQueryResponse} from "@google-cloud/datastore/build/src/query";


interface EntityRecord<EntityData> extends Entity {
    key: entity.Key;
    data: EntityData;
}

abstract class GenericDatastore<EntityObj> {

    protected readonly datastore: Datastore = new Datastore();

    protected constructor(protected readonly kind: string,
                          protected readonly pageSize: number = 500) {
    }

    protected abstract createEntityRecord(key: entity.Key, entityObj: EntityObj): EntityRecord<EntityObj>;

    protected abstract createEntityObj(id: number, json: any): EntityObj;

    async set(entityObj: EntityObj): Promise<string> {
        const key: entity.Key = this.datastore.key(this.kind);
        const entity = this.createEntityRecord(key, entityObj);
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

    async get(id: number): Promise<EntityObj> {
        const key = this.datastore.key([this.kind, id]);
        try {
            const [entity]: [any] = await this.datastore.get(key);

            console.error(`try to understand: ${JSON.stringify(await this.datastore.get(key))}`);
            return Promise.resolve(this.createEntityObj(id, entity));
        } catch (error) {
            console.error(`ERROR: Unable to retrieve Tap, id=${id}`, error);
            throw error;
        }
    }

    async list(): Promise<EntityObj[]> {
        try {
            let [entities]: Entity[] = await this.pageQuery(
                () => this.datastore.createQuery(this.kind).limit(this.pageSize)
            );

            return entities.map((json: any) => this.createEntityObj(NaN, json));
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
        const [entities, info]: [Entity[EntityObj], RunQueryInfo] = await this.datastore.runQuery(query);
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

export {
    GenericDatastore,
    EntityRecord
}







