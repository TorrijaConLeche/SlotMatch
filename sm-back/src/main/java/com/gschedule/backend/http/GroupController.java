package com.gschedule.backend.http;

import org.springframework.web.bind.annotation.RestController;

import com.gschedule.backend.model.CalendarGroup;
import com.gschedule.backend.model.GroupMember;
import com.gschedule.backend.services.GroupService;

import tools.jackson.databind.util.JSONPObject;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.autoconfigure.JacksonProperties.Json;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gschedule.backend.dto.GroupNameDTO;
import com.gschedule.backend.dto.HeatMapResponseDTO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin(origins = "https://slot-match.vercel.app")
@RequestMapping("/groups")
public class GroupController {
    
    @Autowired
    private GroupService groupService; 

    @PostMapping("/create")
    public ResponseEntity<CalendarGroup> createGroup(@RequestBody GroupNameDTO dto) {

        CalendarGroup savedGroup = this.groupService.createGroup(dto.getGroupName());
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGroup);

    }

    @GetMapping("/{slug}")
    public ResponseEntity<CalendarGroup> getGroupBySlug(@PathVariable String slug) {

        return this.groupService.getGroupBySlug(slug)
                .map(group -> ResponseEntity.ok(group))
                .orElse(ResponseEntity.notFound().build());

    }

    @PostMapping("/newGroupMember")
    public ResponseEntity<GroupMember> createGroupMember(@RequestBody GroupMember data) {

        GroupMember gM = this.groupService.createGroupMember(data);

        return ResponseEntity.status(HttpStatus.CREATED).body(gM);

    }

    @GetMapping("/getHeatMap/{groupId}")
    public HeatMapResponseDTO getHeatMap(@PathVariable Long groupId) {

        HeatMapResponseDTO data = this.groupService.getHeatMap(groupId);

        return data;

    }

    @GetMapping("/getUserName/{userId}")
    public ResponseEntity<Map<String, String>> getUserName(@PathVariable String userId) {
        String data = this.groupService.getUserName(userId);
        
        Map<String, String> response = new HashMap<>();
        response.put("userName", data);
        
        return ResponseEntity.ok(response);
    }

}
