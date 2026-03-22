package com.gschedule.backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gschedule.backend.dto.HeatMapSlotDTO;
import com.gschedule.backend.model.GroupMember;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {

    @Query(value = "SELECT a.day, a.hour, COUNT(DISTINCT gm.user_id) as availablePeople " +
               "FROM group_member gm " +
               "JOIN availability a ON gm.user_id = a.user_id " +
               "WHERE gm.group_id = :groupId " +
               "GROUP BY a.day, a.hour", nativeQuery = true)
    List<HeatMapSlotDTO> getHeatMap(Long groupId);

    Long countByGroupGroupId(Long group_id);

    @Query(value = "SELECT gm.group_id FROM group_member gm where gm.user_id = :userId", nativeQuery = true)
    Long findGroupIdByUserId(String userId);
}   