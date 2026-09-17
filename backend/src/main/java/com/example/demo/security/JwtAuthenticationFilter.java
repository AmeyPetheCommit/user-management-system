package com.example.demo.security;

import com.example.demo.entity.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final com.example.demo.repository.userRepository userRepository;

    public JwtAuthenticationFilter(JwtService jwtService,
                                   com.example.demo.repository.userRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

    	String authHeader = request.getHeader("Authorization");

    	if (authHeader == null || !authHeader.startsWith("Bearer ")) {
    	    filterChain.doFilter(request, response);
    	    return;
    	}

    	String token = authHeader.substring(7);

    	try {
    	    String email = jwtService.extractEmail(token);

    	    User user = userRepository.findByEmail(email).orElse(null);

    	    if (user != null) {

    	        UsernamePasswordAuthenticationToken authentication =
    	                new UsernamePasswordAuthenticationToken(
    	                        user,
    	                        null,
    	                        user.getRoles().stream()
    	                                .map(role -> new SimpleGrantedAuthority(
    	                                        "ROLE_" + role.getName()))
    	                                .toList()
    	                );

    	        SecurityContextHolder.getContext()
    	                .setAuthentication(authentication);
    	    }

    	}catch (Exception e) {
    	    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    	    return;
    	}

    	filterChain.doFilter(request, response);
    }
}