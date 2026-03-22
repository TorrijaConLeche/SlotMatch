package com.gschedule.backend.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gschedule.backend.model.CalendarGroup;

public interface GroupRepository extends JpaRepository<CalendarGroup, Long> {
   
    Optional<CalendarGroup> findBySlug(String slug);

}   