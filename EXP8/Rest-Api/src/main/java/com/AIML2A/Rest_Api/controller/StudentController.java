package com.AIML2A.Rest_Api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.AIML2A.Rest_Api.model.Student;
import com.AIML2A.Rest_Api.service.StudentService;

@RestController
@RequestMapping("/api/students")
public class StudentController {
	
    @Autowired
    private StudentService service;

    // ✅ GET ALL
    @GetMapping
    public List<Student> getStudents() {
        return service.getAllStudents();
    }

    // ✅ GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable int id) {
        Student student = service.getStudentById(id);

        if (student == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(student, HttpStatus.OK);
    }

    // ✅ POST (ADD)
    @PostMapping
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        Student saved = service.saveStudent(student);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // ✅ PUT (UPDATE)
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable int id, @RequestBody Student student) {
        student.setId(id);
        Student updated = service.saveStudent(student);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable int id) {
        boolean deleted = service.deleteStudent(id);

        if (!deleted) {
            return new ResponseEntity<>("Student not found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>("Student deleted successfully", HttpStatus.OK);
    }
}