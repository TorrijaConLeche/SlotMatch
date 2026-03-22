import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeSlot } from '../../model/timeSlot';
import { CalendarService } from '../../services/calendar-service';
import { AvailabilityDTO, UserAvailabilityDTO } from '../../model/availabilityDTO';

@Component({
  selector: 'app-calendar-component',
  imports: [],
  templateUrl: './calendar-component.html',
  styleUrl: './calendar-component.css',
})
export class CalendarComponent implements OnInit {

  @Output() changeView: EventEmitter<any> = new EventEmitter();
  @Output() calendarSaved: EventEmitter<any> = new EventEmitter();

  @Input() userId: string | null = ''

  public slots: TimeSlot[] = []

  constructor(private calendarService: CalendarService){}

  ngOnInit(): void {
      this.generateCalendar()
      this.loadCalendar()
  }

  changeCalendarView(){ // TODO
    this.changeView.emit(null)
  }

  /* UI Interaction logic */
  generateCalendar(){
    const startHour = 8;
    const endHour = 22;

    for (let day = 0; day < 7; day++) {
      for (let hour = startHour; hour <= endHour; hour++) {
        this.slots.push({
          day: day,
          hour: hour,
          selected: false // Default: nobody is available
        })      
     }
    }
  }

  getSlot(day: number, hour: number): TimeSlot | undefined {
    return this.slots.find(s => s.day === day && s.hour === hour);
  }

  toggleSlot(day: number, hour: number): void {
    const slot = this.getSlot(day, hour);
    if (slot) {
      slot.selected = !slot.selected;
    }
  }

  clearCalendar() {
    this.slots.forEach(element => {
      element.selected = false
    });
  }

  /* BACKEND & DATA LOGIC */
  /* Send only available day-hour pairs */
  saveCalendar() {

    const slots: AvailabilityDTO[] = this.slots
      .filter((item) => item.selected == true)
      .map(slot => ({
        day: slot.day,
        hour: slot.hour
      }))

      const fullData: UserAvailabilityDTO = {userId: this.userId, slots: slots}

      this.calendarService.saveCalendar(fullData).subscribe({
        next: () => {
          this.calendarSaved.emit('✅ Calendar saved successfully')
        },
        error: (err) => {
          this.calendarSaved.emit('❌ Error while saving calendar')

        }
      })
  }

  loadCalendar(){

    if(this.userId == null){
      return
    }

    this.calendarService.loadCalendar(this.userId).subscribe({
      next: (data: any[]) => {
        
        data.forEach(savedSlot => {
          // If pair day-hour exists, then we mark it as selected (available)
          const match = this.slots.find(s => (s.day == savedSlot.day && s.hour == savedSlot.hour))
                    
          if(match){
            match.selected = true
          }
        })
      },
      error: (err) => {
        alert("Error while loading calendar: " + err)
      }
    })

  }

}
