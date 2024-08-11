package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Contest;

public interface ContestRepository extends JpaRepository<Contest, Long>{
    
}
