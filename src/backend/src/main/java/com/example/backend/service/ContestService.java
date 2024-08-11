package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Contest;
import com.example.backend.model.Problem;
import com.example.backend.repository.ContestRepository;


@Service
public class ContestService {
    @Autowired
    private ContestRepository contestRepository;

    public Contest createContest(Contest contest) {
        return contestRepository.save(contest);
    }

    public Contest getContestById(Long id) {
        return contestRepository.findById(id).orElse(null);
    }

    public List<Contest> getAllContests() {
        return contestRepository.findAll();
    }
    public List<Problem> getContestProblems(Long id){
        return contestRepository.findById(id).orElse(null).getProblems();
    }
}
