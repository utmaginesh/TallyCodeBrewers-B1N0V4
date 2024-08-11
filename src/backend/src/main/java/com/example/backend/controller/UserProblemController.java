package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Userproblem;
import com.example.backend.service.UserproblemService;

@RestController
@RequestMapping("/api")
public class UserProblemController {
    @Autowired
    private UserproblemService userProblemService;

    @PostMapping("/userproblems")
    public ResponseEntity<Userproblem> createUserProblem(@RequestBody Userproblem userProblem) {
        return ResponseEntity.ok(userProblemService.createUserProblem(userProblem));
    }

   
    @GetMapping("/userproblems")
    public ResponseEntity<List<Userproblem>> getAllUserProblems() {
        return ResponseEntity.ok(userProblemService.getAllUserProblems());
    }

   
}
