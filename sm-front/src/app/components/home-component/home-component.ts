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
  mode = 'none';
  constructor(private groupService: GroupService, private router: Router){}



  toggleMode(newMode: string){
      this.mode = newMode
  }

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
