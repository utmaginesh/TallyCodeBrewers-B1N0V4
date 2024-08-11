package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.Testcase;
import com.example.backend.service.TestcaseService;

@RestController
@RequestMapping("/api")
public class TestcaseController {
    @Autowired
    private TestcaseService testcaseService;

    @PostMapping("/testcases")
    public ResponseEntity<Testcase> postTestcase(@RequestBody Testcase testcase){
        return ResponseEntity.status(200).body(testcaseService.saveTestcase(testcase));
    }
    @GetMapping("/testcases")
    public ResponseEntity<List<Testcase>> getAll(){
        return ResponseEntity.status(200).body(testcaseService.getAll());
    }
}
