package com.example.demo.controller;

import com.example.demo.dto.UserRequest;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.exception.DuplicateUserException;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.repository.roleRepository;
import com.example.demo.repository.userRepository;
import com.example.demo.repository.taskRespository;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final userRepository userRepository;
    private final roleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final taskRespository taskRespository;

    public AdminController(
            userRepository userRepository,
            roleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            taskRespository taskRespository) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.taskRespository = taskRespository;
    }

    @PostMapping("/users")
    public User createUser(@Valid @RequestBody UserRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new DuplicateUserException("User already exists");
        }

        Role role = roleRepository.findByName(request.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.getRoles().add(role);

        return userRepository.save(user);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));
    }

    @PutMapping("/users/{id}")
    public User updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        if (request.getRole() != null) {

            Role role = roleRepository.findByName(request.getRole())
                    .orElseThrow(() ->
                            new RuntimeException("Role not found"));

            user.getRoles().clear();
            user.getRoles().add(role);
        }

        return userRepository.save(user);
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        taskRespository.deleteAll(
                taskRespository.findByAssignedTo(user)
        );

        userRepository.delete(user);

        return "User deleted successfully";
    }

    @PutMapping("/users/{id}/role")
    public User assignRole(
            @PathVariable Long id,
            @RequestParam String role) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        Role newRole = roleRepository.findByName(role)
                .orElseThrow(() ->
                        new RuntimeException("Role not found"));

        user.getRoles().clear();
        user.getRoles().add(newRole);

        return userRepository.save(user);
    }
}