package com.gschedule.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeatMapSlotDTO {
    private int day;
    private int hour;
    private Long availablePeople;
}