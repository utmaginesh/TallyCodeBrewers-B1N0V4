package com.example.backend.service;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.ContestUpdateForm;
import com.example.backend.dto.SignUpForm;
import com.example.backend.model.Contestuser;
import com.example.backend.model.User;
import com.example.backend.model.Userproblem;
import com.example.backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public Integer studentregister(SignUpForm stu){
        User user = repository.findByEmail(stu.getEmail()).orElse(null);
        if(user != null){
            return 1;
        }
        try{
            User users = new User();
            users.setRole("user");
            users.setName(stu.getName());
            users.setEmail(stu.getEmail());
            users.setPassword(passwordEncoder.encode(stu.getPassword()));
            repository.save(users);
            return 2;
        }
        catch(Exception e){
            return -1;
        }
    }
    public List<Long> getFinishedProblems(Long id){
        List<Userproblem> userproblems = repository.findById(id).orElse(null).getUserProblems();
        return userproblems.stream().filter(userproblem -> "completed".equals(userproblem.getStatus())).map(Userproblem::getId).collect(Collectors.toList());
    }
    public Contestuser registContestuser(Long id, String email){
        User user = repository.findByEmail(email).orElse(null);
        List<Contestuser> l = user.getContestUsers();
        for(Contestuser c : l){
            if(c.getUser().getId() == user.getId() && id == c.getContestId())
                return null;
        }
        Contestuser contestuser = new Contestuser(null, user, id, 0, 0, 0, 0, null);
        l.add(contestuser);
        user.setContestUsers(l);
        repository.save(user);
        return contestuser;
    }
    public Contestuser updateContestuser(ContestUpdateForm contest,Long cid, String email, int index){
        User user = repository.findByEmail(email).orElse(null);
        List<Contestuser> contestusers = user.getContestUsers();
        Contestuser contestuser = new Contestuser();
        int k = 0;
        for(Contestuser c : contestusers){
            if(c.getContestId() == cid){
                contestuser = c;
            }
            k++;
        }
        List<String> sol = contestuser.getUserSolutions();
        sol.set(index, contest.getSolution());
        contestuser.setUserSolutions(sol);
        contestuser.setScore(contest.getScore());
        contestuser.setNumberOfProblems(contestuser.getNumberOfProblems() + 1);
        contestusers.set(k, contestuser);
        user.setContestUsers(contestusers);
        repository.save(user);
        return contestuser;
    }

}
