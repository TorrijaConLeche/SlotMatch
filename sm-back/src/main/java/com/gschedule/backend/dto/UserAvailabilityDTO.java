package com.gschedule.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import com.gschedule.backend.model.Availability;

import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAvailabilityDTO {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AvailabilityDTO {
        private int day;    
        private int hour;       
    }

    private String userId;
    
    private AvailabilityDTO[] slots;

    private Long groupId;


    public List<Availability> toAvailability(){

        List<Availability> av = new ArrayList<Availability>();

        for (AvailabilityDTO s : this.slots) {
            Availability item = new Availability();
            item.setDay(s.day);
            item.setHour(s.hour);
            item.setUserId(userId);
            av.add(item);
        }

        return av;
    }

}


