export class TransferRequest {

    constructor(
    public packageId: string,
    public fromLocationId: string,
    public toLocationId: string){
    }
}