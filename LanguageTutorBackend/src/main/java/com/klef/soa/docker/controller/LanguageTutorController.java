package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.docker.dto.TutorRequest;
import com.klef.soa.docker.dto.TutorResponse;
import com.klef.soa.docker.service.LanguageTutorService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tutors")
@Tag(name = "Language Tutor Management", description = "Endpoints for managing Language Tutors")
public class LanguageTutorController {

    @Autowired
    private LanguageTutorService service;

    @Operation(summary = "Health check endpoint for Language Tutor Service")
    @GetMapping("/status")
    public String status() {
        return "LanguageTutor Service is Running";
    }

    @Operation(summary = "Add a new language tutor (auto-generated ID)")
    @PostMapping("/addtutor")
    public ResponseEntity<TutorResponse> add(
            @Valid @RequestBody TutorRequest tutor) {
        TutorResponse savedTutor = service.add(tutor);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTutor);
    }

    @Operation(summary = "Display all language tutors")
    @GetMapping("/displayall")
    public ResponseEntity<List<TutorResponse>> displayAll() {
        return ResponseEntity.ok(service.displayAll());
    }

    @Operation(summary = "Display a language tutor by ID")
    @GetMapping("/display/{id}")
    public ResponseEntity<TutorResponse> displayById(
            @PathVariable Long id) {
        return ResponseEntity.ok(service.displayById(id));
    }

    @Operation(summary = "Update an existing language tutor by ID")
    @PutMapping("/update/{id}")
    public ResponseEntity<TutorResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody TutorRequest tutor) {
        return ResponseEntity.ok(service.update(id, tutor));
    }

    @Operation(summary = "Delete a language tutor by ID")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(
            @PathVariable Long id) {
        return ResponseEntity.ok(service.deleteByid(id));
    }
}
