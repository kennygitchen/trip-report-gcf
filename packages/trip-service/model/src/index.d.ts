export namespace Tap {
    function fromCSV(csv: string): Tap;
}

export interface Tap {
    readonly id: string,
    readonly dateTimeUTC: string,
    readonly tapType: Type,
    readonly stopId: string,
    readonly companyId: string,
    readonly busID: string,
    readonly pan: string,
}

export type Type = "ON" | "OFF"