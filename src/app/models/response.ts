export class Response{
    
    constructor(
        readonly count: number,
        readonly next: string,
        readonly previous: string,
        readonly results: Array<any>
    ){

    }
}