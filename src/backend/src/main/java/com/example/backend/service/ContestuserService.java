package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Contestuser;
import com.example.backend.repository.ContestuserRespository;


@Service
public class ContestuserService {
    @Autowired
    private ContestuserRespository contestUserRepository;

    public Contestuser createContestUser(Contestuser contestUser) {
        return contestUserRepository.save(contestUser);
    }

    public List<Contestuser> getAllContestUsers() {
        return contestUserRepository.findAll();
    }


}
