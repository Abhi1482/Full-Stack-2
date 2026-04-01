package com.AML_2A.JWT_DEMO.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.AML_2A.JWT_DEMO.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

}
