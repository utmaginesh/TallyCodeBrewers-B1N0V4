package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Contestuser;
import com.example.backend.service.ContestuserService;


@RestController
@RequestMapping("/contestusers")
public class ContestuserController {
    @Autowired
    private ContestuserService contestUserService;

    @PostMapping("/contests")
    public ResponseEntity<Contestuser> createContestUser(@RequestBody Contestuser contestUser) {
        return ResponseEntity.ok(contestUserService.createContestUser(contestUser));
    }


    @GetMapping("/contests")
    public ResponseEntity<List<Contestuser>> getAllContestUsers() {
        return ResponseEntity.ok(contestUserService.getAllContestUsers());
    }
}
