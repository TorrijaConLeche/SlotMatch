package com.gschedule.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeatMapResponseDTO{
    private Long totalParticipants;
    private List<HeatMapSlotDTO> slots;
}