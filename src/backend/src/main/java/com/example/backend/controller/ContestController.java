package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Contest;
import com.example.backend.model.Problem;
import com.example.backend.service.ContestService;

@RestController
@RequestMapping("/api")
public class ContestController {

    @Autowired
    private ContestService contestService;

    @PostMapping("/contests")
    public ResponseEntity<Contest> createContest(@RequestBody Contest contest) {
        return ResponseEntity.ok(contestService.createContest(contest));
    }

    @GetMapping("/getContestData")
    public ResponseEntity<List<Contest>> getAllContests() {
        return ResponseEntity.ok(contestService.getAllContests());
    }

    @GetMapping("/getContestProblems/{cid}")
    public ResponseEntity<List<Problem>> getconteProblems(@PathVariable Long cid){
        return ResponseEntity.ok().body(contestService.getContestProblems(cid));
    }


}