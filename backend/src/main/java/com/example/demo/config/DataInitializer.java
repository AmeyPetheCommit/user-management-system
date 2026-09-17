package com.example.demo.config;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.roleRepository;
import com.example.demo.repository.userRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(
            roleRepository roleRepository,
            userRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            Role admin = new Role();
            admin.setName("ADMIN");

            Role manager = new Role();
            manager.setName("MANAGER");

            Role userRole = new Role();
            userRole.setName("USER");

            roleRepository.save(admin);
            roleRepository.save(manager);
            roleRepository.save(userRole);

            User adminUser = new User();
            adminUser.setName("Admin");
            adminUser.setEmail("admin@example.com");
            adminUser.setPassword(passwordEncoder.encode("Admin@123"));
            adminUser.setRoles(Set.of(admin));

            User managerUser = new User();
            managerUser.setName("Manager");
            managerUser.setEmail("manager@example.com");
            managerUser.setPassword(passwordEncoder.encode("Manager@123"));
            managerUser.setRoles(Set.of(manager));

            User normalUser = new User();
            normalUser.setName("User");
            normalUser.setEmail("user@example.com");
            normalUser.setPassword(passwordEncoder.encode("User@123"));
            normalUser.setRoles(Set.of(userRole));

            userRepository.save(adminUser);
            userRepository.save(managerUser);
            userRepository.save(normalUser);
        };
    }
}