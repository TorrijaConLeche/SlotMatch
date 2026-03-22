import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GroupService } from '../../services/group-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-component',
  imports: [FormsModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {

  groupName = ''

  constructor(private groupService: GroupService, private router: Router){}

  createGroup() {
    this.groupService.createGroup(this.groupName).subscribe({
      next: (res) => {
        this.router.navigate(['/group', res.slug])
      },
      error: (err) => {
        alert('Error creating the group: ' + err)
      }
    })
  }
}
