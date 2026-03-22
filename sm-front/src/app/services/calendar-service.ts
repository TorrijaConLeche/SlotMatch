import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvailabilityDTO, UserAvailabilityDTO } from '../model/availabilityDTO';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  
  constructor(private http: HttpClient){}

  saveCalendar(slots: UserAvailabilityDTO): Observable<any> {
    let ENDPOINT = "http://localhost:8080/calendar/save"
    console.log(slots)
    return this.http.post(ENDPOINT, slots);
  }

  loadCalendar(username: string): Observable<any[]> {
    let ENDPOINT = "http://localhost:8080/calendar/load?username=" + username
    return this.http.get<any[]>(ENDPOINT)

  }

}
