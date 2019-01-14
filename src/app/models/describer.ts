export class Describer{
    static describeClass(typeOfClass: any){
        let a = new typeOfClass();
        let array = Object.getOwnPropertyNames(a);
        return array;
    }
}