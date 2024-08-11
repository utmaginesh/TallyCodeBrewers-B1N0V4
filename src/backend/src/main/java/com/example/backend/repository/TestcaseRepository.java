package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Testcase;

public interface TestcaseRepository extends JpaRepository<Testcase, Long>{
    
}
