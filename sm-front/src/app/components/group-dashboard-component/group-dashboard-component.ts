import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services/group-service';
import { FormsModule } from "@angular/forms";
import { CalendarComponent } from "../calendar-component/calendar-component";
import { HeatmapComponent } from "../heatmap-component/heatmap-component";
import { GroupMemberDTO } from '../../model/groupMemberDTO';
import { CalendarGroup } from '../../model/CalendarGroup';

@Component({
  selector: 'app-group-dashboard-component',
  imports: [FormsModule, CalendarComponent, HeatmapComponent],
  templateUrl: './group-dashboard-component.html',
  styleUrl: './group-dashboard-component.css',
})
export class GroupDashboardComponent implements OnInit{
  
  group: CalendarGroup | null = null
  UserId: string | null = null
  userName: string  = ''
  showGroup: boolean = false
  constructor
  (
    private route: ActivatedRoute, private groupService: GroupService,
    private router: Router

  ) {}
  
  // 1. Check if group exists
  // 2. Check if logged previously (user is in localStorage)
  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) {
      this.router.navigate(['/'])
      return
    }

    /* Validate group */
    this.groupService.getGroupBySlug(slug).subscribe({
      next: (res) => { // if exists
        console.log(res)
        this.group = res
        this.checkLocalIdentity(slug)
      },
      error: (err) => { // if not exists
        alert('Error, group does not exist')
        this.router.navigate(['/']) // TODO: send to 404 not found??
      }
    })
  }

  checkLocalIdentity(slug: string){
    this.UserId = localStorage.getItem(`group_user_${slug}`);
  }

  saveUserId() {
    if (this.userName.trim().length < 2) {
      alert("Please enter a valid name (at least 2 characters)");
      return;
    }

    // Generate random userID
    this.UserId = crypto.randomUUID();

    if(!this.group){
      alert("Error saving User")
      return;
    }

    const slug = this.group.slug;

    // Save userId and Name in backend -> asigned to a group
    const groupMember: GroupMemberDTO = {
      userId: this.UserId, 
      displayName: this.userName,
      group:{
          groupId: this.group.groupId
      }
    }

    console.log(groupMember)
    this.groupService.saveGroupMember(groupMember).subscribe({
      error: (err) => {
        alert("ERROR:" + err)
      }
    });

    // Save userId in local storage
    localStorage.setItem(`group_user_${slug}`, this.UserId);
  }

}
