package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Problem;

public interface ProblemRespository extends JpaRepository<Problem, Long>{
    
}
