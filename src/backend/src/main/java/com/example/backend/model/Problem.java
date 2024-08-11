package com.example.backend.model;

import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;

    @Column(length = 8000)
    private String description;
    private String level;
    @Column(length = 7000)
    private String solutionCode;
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Testcase> testCases;
    
    private String constraints;
    private String tags;
    private int score;

    @JsonIgnore 
    @ManyToMany(mappedBy = "problems")
    private List<Contest> contests;
}
