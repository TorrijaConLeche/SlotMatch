import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvailabilityDTO, UserAvailabilityDTO } from '../model/availabilityDTO';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  
  constructor(private http: HttpClient){}

  ENDPOINT = environment.apiUrl + '/calendar'

  saveCalendar(slots: UserAvailabilityDTO): Observable<any> {
    let ep = this.ENDPOINT + "/save"
    console.log(slots)
    return this.http.post(ep, slots);
  }

  loadCalendar(username: string): Observable<any[]> {
    let ep = this.ENDPOINT + "/load?username=" + username
    return this.http.get<any[]>(ep)

  }

}
