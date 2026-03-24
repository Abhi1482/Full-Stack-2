package com.AIML2A.Rest_Api.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.AIML2A.Rest_Api.model.Student;


public interface StudentRepository extends JpaRepository<Student,Integer>{
}