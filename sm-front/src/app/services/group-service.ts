import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarGroup } from '../model/CalendarGroup';
import { GroupMemberDTO } from '../model/groupMemberDTO';

@Injectable({
  providedIn: 'root',
})

export class GroupService {

  apiUrl = 'http://localhost:8080/groups'

  constructor(private http: HttpClient){}

  createGroup(name: string): Observable<CalendarGroup> {
    return this.http.post<CalendarGroup>(`${this.apiUrl}/create`, { groupName: name });
  }

  getGroupBySlug(slug: string | null): Observable<CalendarGroup> {
    if (slug == null) return new Observable()

    return this.http.get<CalendarGroup>(`${this.apiUrl}/${slug}`);
  }

  saveGroupMember(data: GroupMemberDTO){
     return this.http.post<GroupMemberDTO>(`${this.apiUrl}/newGroupMember`, data)
  }

  getHeatMapCalendar(groupId: number){
    return this.http.get<any>(`${this.apiUrl}/getHeatMap/${groupId}`);
  }

  getUserNameById(userId: string){
    return this.http.get<any>(`${this.apiUrl}/getUserName/${userId}`)
  }

}
