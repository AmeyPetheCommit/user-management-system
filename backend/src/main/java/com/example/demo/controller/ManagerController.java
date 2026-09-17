package com.example.demo.controller;

import com.example.demo.entity.Task;
import com.example.demo.entity.User;
import com.example.demo.repository.taskRespository;
import com.example.demo.repository.userRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager")
public class ManagerController {

    private final userRepository userRepository;
    private final taskRespository taskRepository;

    public ManagerController(userRepository userRepository,
    		taskRespository taskRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/tasks")
    public Task assignTask(
            @RequestParam Long userId,
            @RequestBody Task task) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        task.setAssignedTo(user);

        return taskRepository.save(task);
    }

    @GetMapping("/tasks")
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    
    @PutMapping("/tasks/{taskId}/status")
    public Task updateTaskStatus(
            @PathVariable Long taskId,
            @RequestParam String status) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(status);

        return taskRepository.save(task);
    }
}