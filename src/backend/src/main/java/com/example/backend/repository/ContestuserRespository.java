package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Contestuser;

public interface ContestuserRespository extends JpaRepository<Contestuser, Long> {
    
}
