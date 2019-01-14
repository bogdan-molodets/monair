import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'customSensorProperty', pure: false })
export class CustomSensorPropertyPipe extends DatePipe implements PipeTransform {
    transform(propertyValue: any, propertyKey: any) {
        switch (propertyKey) {
            case 'date':
                return super.transform(propertyValue, 'MMM d, y, h:mm:ss')
            case 'pressure':
                return `${propertyValue} Pa`
            case 'temperature':
                return `${propertyValue} &#176;C`
            case 'humidity':
                return `${propertyValue} %`
            case 'pm1':
            case 'pm10':
            case 'pm25':
                return `${propertyValue} mcg/m&#179;`
            case 'nco':
            case 'nso2':
            case 'no3':
            case 'nnh3':
            case 'nno2':
                return `${propertyValue} ppm`
            default:
                return propertyValue
        }
    }
}