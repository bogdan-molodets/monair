export class Sensor {
    constructor(
        readonly id: number,
        readonly sensor_id: number,
        readonly date: string,
        readonly temperature: number,
        readonly humidity: number,
        readonly pressure: number,
        readonly pm1: number,
        readonly pm10: number,
        readonly pm25: number,
        readonly nco: number,
        readonly nso2: number,
        readonly nnh3: number,
        readonly nno2: number
    ) {}

}