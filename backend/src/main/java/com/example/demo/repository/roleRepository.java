package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Role;

public interface roleRepository extends JpaRepository<Role, Long>{

	Optional<Role> findByName(String name);
}
