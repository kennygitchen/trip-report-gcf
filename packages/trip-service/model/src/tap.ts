class Tap {
    constructor(
        readonly id: string,
        readonly dateTimeUTC: string,
        readonly tapType: Type,
        readonly stopId: string,
        readonly companyId: string,
        readonly busID: string,
        readonly pan: string
    ) {
    }

    static fromCSV(csv: string): Tap {
        try {
            let tapStr = csv.split(",").map(s => s.trim());
            return new Tap(
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
}

enum Type {
    ON = "ON", OFF = "OFF"
}

export {
    Tap,
    Type
}