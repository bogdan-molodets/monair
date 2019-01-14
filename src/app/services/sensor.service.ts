import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SensorSerializer } from '../models/serialize';
import { Response } from 'src/app/models/response';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getSensors(): any {
    return this.httpClient.get<any>(`${this.apiUrl}sensors/`).pipe(map(res => {
      return new Response(res.count, res.next, res.previous, res.results.map(item => {
        return new SensorSerializer().deserialize(item);
      }))
    })).toPromise();
  }

  getSensorsByFilter(params, page = null):any {
    params.sensor_id = params.sensor_id==null?'':params.sensor_id;
    //(page != 0)?params.page = page:{};
    let url = (page!==null)?page:`${this.apiUrl}sensors?date_after=${params.date_after}&date_before=${params.date_before}&ordering=${params.ordering}&sensor_id=${params.sensor_id}`
    return this.httpClient.get<any>(url).pipe(map(res => {
      return new Response(res.count, res.next, res.previous, res.results.map(item => {
        return new SensorSerializer().deserialize(item);
      }))
    })).toPromise();
  }

  getSensorIds(): any{
    return this.httpClient.get<any>(`${this.apiUrl}sensors/sensor_id_list/`).toPromise()
  }

}
