package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Testcase;
import com.example.backend.repository.TestcaseRepository;

@Service
public class TestcaseService {
    @Autowired
    private TestcaseRepository testcaseRepository;

    public Testcase saveTestcase(Testcase testcase){
        return testcaseRepository.save(testcase);
    }
    public List<Testcase> getAll(){
        return testcaseRepository.findAll();
    } 

    

}
