class Tap {
    constructor(
        readonly id: number = NaN,
        readonly orderNo: string,
        readonly dateTimeUTC: string,
        readonly tapType: Type,
        readonly stopId: string,
        readonly companyId: string,
        readonly busID: string,
        readonly pan: string,
        readonly created?: number
    ) {
    }

    static fromCSV(csv: string): Tap {
        try {
            let tapStr = csv.split(",").map(s => s.trim());
            return new Tap(
                undefined,
                tapStr[0],
                tapStr[1],
                // @ts-ignore
                Type[tapStr[2]],
                tapStr[3],
                tapStr[4],
                tapStr[5],
                tapStr[6]
            );
        } catch (e) {
            console.error(`failed to parse CSV to Tap,`, e);
            throw e;
        }
    }

    static fromJSON(json: string): Tap {
        const tapJs: Tap = JSON.parse(json);
        return new Tap(
            tapJs.id,
            tapJs.orderNo,
            tapJs.dateTimeUTC,
            // @ts-ignore
            Type[tapJs.tapType],
            tapJs.stopId,
            tapJs.companyId,
            tapJs.busID,
            tapJs.pan,
            tapJs.created
        );
    }

    updateId(id: number): Tap {
        if (!!this.id) {
            throw new Error(`Error, 'id' field has already been set.`);
        }
        return new Tap(
            id,
            this.orderNo,
            this.dateTimeUTC,
            this.tapType,
            this.stopId,
            this.companyId,
            this.busID,
            this.pan,
            this.created
        )
    }

    updateCreated(created: number): Tap {
        if (!!this.created) {
            throw new Error(`Error, 'created' field has already been set.`);
        }
        return new Tap(
            this.id,
            this.orderNo,
            this.dateTimeUTC,
            this.tapType,
            this.stopId,
            this.companyId,
            this.busID,
            this.pan,
            created
        )
    }

    toJSON() {
        let js = Object.assign({}, this); // clone the object
        delete js.toJSON; // remove this function from stringify
        return JSON.stringify(js);
    }
}

enum Type {
    ON = "ON", OFF = "OFF"
}

export {
    Tap,
    Type
}