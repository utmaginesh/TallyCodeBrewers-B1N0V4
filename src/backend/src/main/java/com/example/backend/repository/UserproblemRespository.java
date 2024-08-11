package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Userproblem;


public interface UserproblemRespository extends JpaRepository<Userproblem, Long>{
    
}

