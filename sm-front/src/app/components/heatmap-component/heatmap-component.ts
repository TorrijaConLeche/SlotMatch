import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
export class HeatmapComponent implements OnInit, OnDestroy{

  @Output() changeView: EventEmitter<any> = new EventEmitter();

  @Input() groupId: number = 11; 

  heatSlots: HeatMapSlot[] = []

  totalParticipants!: number;

  private wsSubscription!: Subscription;
  
 constructor
  (private groupService: GroupService, private wsService: WebsocketService) {}

  ngOnInit(): void {
    this.loadHeatMap();

    this.wsService.connect(() => {
      this.wsSubscription = this.wsService.subscribeToGroup(this.groupId).subscribe(
        (message) => {
          if (message === "REFRESH") {
            this.loadHeatMap();
          }
        }
      );
    });
  }

  ngOnDestroy(): void { // Unsubscribe and destroy
      if (this.wsSubscription) this.wsSubscription.unsubscribe() 

      this.wsService.disconnect()
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

  changeCalendarView(){
    this.changeView.emit(null)
  }

}

