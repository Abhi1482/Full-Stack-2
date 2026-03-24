package com.AIML2A.Rest_Api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AIML2A.Rest_Api.model.Student;
import com.AIML2A.Rest_Api.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    // ✅ GET ALL
    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    // ✅ GET BY ID (FIXED)
    public Student getStudentById(int id) {
        return repository.findById(id).orElse(null);
    }

    // ✅ SAVE (POST + PUT)
    public Student saveStudent(Student student) {
        return repository.save(student);
    }

    // ✅ DELETE
    public boolean deleteStudent(int id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}