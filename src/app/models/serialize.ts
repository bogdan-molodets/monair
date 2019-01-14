import { Sensor } from 'src/app/models/sensor';

interface Serializable {
    deserialize(input);
}

export class SensorSerializer implements Serializable  {
    deserialize(input) {
        return new Sensor(
            input.id,
            input.sensor_id,
            input.date,
            input.temperature,
            input.humidity,
            input.pressure,
            input.pm1,
            input.pm10,
            input.pm25,
            input.nco,
            input.nso2,
            input.nnh3,
            input.nno2,
        )
    }
}
