package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Problem;
import com.example.backend.model.Testcase;
import com.example.backend.repository.ProblemRespository;

@Service
public class ProblemService {
    @Autowired
    private ProblemRespository problemRepository;

    public Problem createProblem(Problem problem) {
        return problemRepository.save(problem);
    }
    public List<Problem> getProblemsPage(){
        return problemRepository.findAll();
    }
    public List<Testcase> gTestcases(Long id){
        Problem problems = problemRepository.findById(id).orElse(null);
        return problems.getTestCases();
    }
}
