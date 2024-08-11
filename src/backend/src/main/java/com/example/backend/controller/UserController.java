package com.example.backend.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dto.AuthRequest;
import com.example.backend.dto.ContestUpdateForm;
import com.example.backend.model.Contestuser;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.JwtService;
import com.example.backend.service.UserService;


import com.example.backend.dto.SignUpForm;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/user/register")
    public ResponseEntity<?> registerUser(@RequestBody SignUpForm students) {
        Integer res = userService.studentregister(students);
        if (res == 1 || res == 2) {
            return ResponseEntity.ok(res);
        } else {
            return ResponseEntity.status(500).body(res);
        }
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest authRequest) {
        try {
            System.out.println(authRequest.getUsername());
            User stu = userRepository.findByEmail(authRequest.getUsername()).orElse(null);
            if (stu == null) {
                return ResponseEntity.status(404).body("User not found!");  
            }
            String password = stu.getPassword();
            try{
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
                if (authentication.isAuthenticated() && passwordEncoder.matches(authRequest.getPassword(), password)) {
                    String token = jwtService.generateToken(authRequest.getUsername());
                    return ResponseEntity.ok(token);
                } else {
                    return ResponseEntity.status(401).body("Invalid credentials!");  
                }
            }
            catch(Exception e){
                return ResponseEntity.status(401).body("Invalid credentials!");  

            }
        } 
        catch (Exception e) {
            return ResponseEntity.status(500).body("There was an error processing your request!");
        }
    }
    @PostMapping("/solvedproblems/{id}")
    public ResponseEntity<List<Long>> getSolvedProblems(@PathVariable Long id){
        return ResponseEntity.ok().body(userService.getFinishedProblems(id));
    } 

    @PostMapping("/resgisterUserContest/{id}/{email}")
    public ResponseEntity<Contestuser> registerContestUser(@PathVariable Long id, @PathVariable String email){
        return ResponseEntity.ok().body(userService.registContestuser(id, email));
    }

    @PostMapping("/updateUserContest/{contestId}/{email}/{index}")
    public ResponseEntity<Contestuser> updateContestuser(@RequestBody ContestUpdateForm contest, @PathVariable Long contestId, String email, int index){
        return ResponseEntity.ok().body(userService.updateContestuser(contest, contestId, email, index));
    }

}
