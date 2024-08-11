package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.model.Userproblem;
import com.example.backend.repository.UserproblemRespository;

@Service
public class UserproblemService {
    @Autowired
    private UserproblemRespository userProblemRepository;

    public Userproblem createUserProblem(Userproblem userProblem) {
        return userProblemRepository.save(userProblem);
    }

    public Userproblem getUserProblemById(Long id) {
        return userProblemRepository.findById(id).orElse(null);
    }

    public List<Userproblem> getAllUserProblems() {
        return userProblemRepository.findAll();
    }

    
}
