package com.example.demo.service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.SignupRequest;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User signup(SignupRequest request) {
        if (repo.findByEmailid(request.getEmailid()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmailid(request.getEmailid());
        user.setPassword(encoder.encode(request.getPassword()));
        return repo.save(user);
    }

    public User login(LoginRequest request) {
        Optional<User> userOpt = repo.findByEmailid(request.getEmailid());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (encoder.matches(request.getPassword(), user.getPassword())) {
                return user;
            }
        }
        throw new RuntimeException("Invalid email or password");
    }
}
