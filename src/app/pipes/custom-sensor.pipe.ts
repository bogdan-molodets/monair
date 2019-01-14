import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'customSensor', pure: false})
export class CustomSensorPipe implements PipeTransform{
    transform(array: any[], exclude: any[]){
       return  array = array.filter(item=> !exclude.includes(item));
    }
}