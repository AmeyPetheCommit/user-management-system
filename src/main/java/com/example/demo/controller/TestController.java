package com.example.demo.controller;

import com.example.demo.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test")
    public String test(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return "Hello " + user.getEmail();
    }
}