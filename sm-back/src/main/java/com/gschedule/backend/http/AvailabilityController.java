package com.gschedule.backend.http;

import org.springframework.web.bind.annotation.RestController;

import com.gschedule.backend.dto.UserAvailabilityDTO;
import com.gschedule.backend.model.Availability;
import com.gschedule.backend.services.AvailabilityService;
import com.gschedule.backend.services.GroupService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/calendar")
public class AvailabilityController {
    
    @Autowired
    private AvailabilityService availabilityService; 

    @PostMapping("/save")
    public ResponseEntity<Void> saveCalendar(@RequestBody UserAvailabilityDTO userAvailability) {


        this.availabilityService.saveCalendar(userAvailability);
        // return 200 OK
        return ResponseEntity.ok().build();
    }

    @GetMapping("/load")
    public List<Availability> getCalendar(@RequestParam String username) {
        return this.availabilityService.getCalendar(username);

    }
    

}
