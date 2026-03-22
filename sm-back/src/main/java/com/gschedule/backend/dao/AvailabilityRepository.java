package com.gschedule.backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.gschedule.backend.model.Availability;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
   
    @Transactional
    void deleteByUserId(String userID);

    List<Availability> getAllByUserId(String userID);
}   