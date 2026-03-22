package com.gschedule.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.transaction.support.TransactionSynchronization;

import com.gschedule.backend.dao.AvailabilityRepository;
import com.gschedule.backend.dao.GroupMemberRepository;
import com.gschedule.backend.dto.UserAvailabilityDTO;
import com.gschedule.backend.model.Availability;
import com.gschedule.backend.model.GroupMember;

@Service
public class AvailabilityService {
 
    @Autowired
    private AvailabilityRepository availabilityDAO;

    @Autowired
    private GroupMemberRepository gmDAO;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Transactional
    public List<Availability> saveCalendar(UserAvailabilityDTO userAvailability){

        String userID = userAvailability.getUserId();
        this.availabilityDAO.deleteByUserId(userID);  // Clear before adding so the new times are replaced (not added)

        // Get groupId and publish to clients:
        Long groupId = this.gmDAO.findGroupIdByUserId(userID);

        if (groupId!=null) {
            // Only send message via sockets after Transaction Commit
            TransactionSynchronizationManager.registerSynchronization(
                new TransactionSynchronization() {
                    @Override
                    public void afterCommit() {
                        messagingTemplate.convertAndSend("/topic/group/" + groupId + "/updated", "REFRESH");
                    }
                }
            );
        }


        return this.availabilityDAO.saveAll(userAvailability.toAvailability());
    }

    public List<Availability> getCalendar(String userID){
        return this.availabilityDAO.getAllByUserId(userID);
    }

}
