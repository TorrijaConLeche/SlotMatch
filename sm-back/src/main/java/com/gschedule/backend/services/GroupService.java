package com.gschedule.backend.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.gschedule.backend.dao.AvailabilityRepository;
import com.gschedule.backend.dao.GroupMemberRepository;
import com.gschedule.backend.dao.GroupRepository;
import com.gschedule.backend.dto.HeatMapResponseDTO;
import com.gschedule.backend.dto.HeatMapSlotDTO;
import com.gschedule.backend.model.Availability;
import com.gschedule.backend.model.CalendarGroup;
import com.gschedule.backend.model.GroupMember;

@Service
public class GroupService {
 
    @Autowired
    private GroupRepository groupDAO;

    @Autowired
    private GroupMemberRepository groupMemberDAO;
    
    public CalendarGroup createGroup(String groupName){
        String slug = generateRandomSlug();
        CalendarGroup newGroup = new CalendarGroup();

        newGroup.setName(groupName);
        newGroup.setSlug(slug);

        return this.groupDAO.save(newGroup);
    }

    public String generateRandomSlug(){
        return UUID.randomUUID().toString().substring(0, 8);
    }

    public Optional<CalendarGroup> getGroupBySlug(String slug){
        return this.groupDAO.findBySlug(slug);
    }

    public GroupMember createGroupMember(GroupMember gm){
        System.out.println("EJ: " + gm.toString());
        return this.groupMemberDAO.save(gm);
    }

    public HeatMapResponseDTO getHeatMap(Long groupId){

        List<HeatMapSlotDTO> slots = this.groupMemberDAO.getHeatMap(groupId);

        Long totalParticipants = this.groupMemberDAO.countByGroupGroupId(groupId);

        return new HeatMapResponseDTO(totalParticipants, slots);
    }

}
