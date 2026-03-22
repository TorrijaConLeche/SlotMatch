import { Component, Input, OnInit } from '@angular/core';
import { GroupService } from '../../services/group-service';
import { HeatMapSlot } from '../../model/HeatMapSlot';
import { WebsocketService } from '../../services/websocket-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heatmap-component',
  imports: [],
  templateUrl: './heatmap-component.html',
  styleUrl: './heatmap-component.css',
})
export class HeatmapComponent implements OnInit{

  @Input() groupId: number = 11; 

  heatSlots: HeatMapSlot[] = []

  totalParticipants!: number;

  private wsSubscription!: Subscription;
  
 constructor
  (private groupService: GroupService, private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.loadHeatMap();

    console.log("SUBSCRIBIENDO A grup : " + this.groupId)
    this.wsService.connect(() => {
      this.wsSubscription = this.wsService.subscribeToGroup(this.groupId).subscribe(
        (message) => {
          console.log("Mensaje recibido: " + message);
          if (message === "REFRESH") {
            this.loadHeatMap();
          }
        }
      );
    });
  }

  loadHeatMap(){
    this.groupService.getHeatMapCalendar(this.groupId).subscribe({
      next: (response) => {
        console.log(response)
        this.heatSlots = response.slots
        this.totalParticipants = response.totalParticipants

      }, 
      error: (err) => {
        console.log(err)
      }
    })
  }

  getSlot(day: number, hour: number): HeatMapSlot | undefined{
      return this.heatSlots.find(s => s.day === day && s.hour === hour);
  }

  getOpacityRatio(availableOnCell: number) {
    return availableOnCell / this.totalParticipants;
  }


}

