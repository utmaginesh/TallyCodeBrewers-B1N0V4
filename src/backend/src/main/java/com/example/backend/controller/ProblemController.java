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

import com.example.backend.model.Problem;
import com.example.backend.model.Testcase;
import com.example.backend.service.ProblemService;

@RestController
@RequestMapping("/api")
public class ProblemController {
    @Autowired
    private ProblemService problemService;

    @PostMapping("/problems")
    public ResponseEntity<Problem> createProblem(@RequestBody Problem problem) {
        return ResponseEntity.ok(problemService.createProblem(problem));
    }
    @GetMapping("/problemspage")
    public ResponseEntity<List<Problem>> getAllProblems() {
        return ResponseEntity.ok(problemService.getProblemsPage());
    }
    @GetMapping("/gettestcases/{pid}")
    public ResponseEntity<List<Testcase>> gTestcases(@PathVariable Long pid){
        return ResponseEntity.ok(problemService.gTestcases(pid));
    }
}
