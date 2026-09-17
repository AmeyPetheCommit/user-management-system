package com.example.demo.controller;

import com.example.demo.entity.Task;
import com.example.demo.entity.User;
import com.example.demo.repository.taskRespository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final taskRespository taskRepository;

    public UserController(taskRespository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/profile")
    public User getProfile(Authentication authentication) {

        return (User) authentication.getPrincipal();
    }

    @GetMapping("/tasks")
    public List<Task> getMyTasks(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return taskRepository.findByAssignedTo(user);
    }
}