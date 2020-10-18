export class PackageCacheItem{
    constructor(
    public packageId: string,
    public number: number,
    public orderId: string,
    public companyName: string,
    public orderNumber: number,
    public orderYear: number,
    public addedDate : Date
    ) {

    }
}