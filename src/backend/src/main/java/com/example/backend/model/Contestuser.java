package com.example.backend.model;

import java.util.List;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
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
public class Contestuser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @JsonIgnore 
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @Column(name = "contest_id")
    private Long contestId;
    
    @Column(name = "contest_rank")
    private int rank;
    
    @Column(name = "score")
    private int score;
    
    @Column(name = "number_of_problems")
    private int numberOfProblems;
    
    @Column(name = "total_time_taken")
    private long totalTimeTaken;
    
    @ElementCollection
    private List<String> userSolutions;
}
