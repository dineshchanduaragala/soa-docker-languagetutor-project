package com.klef.soa.docker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.klef.soa.docker.dto.TutorRequest;
import com.klef.soa.docker.dto.TutorResponse;
import com.klef.soa.docker.entity.LanguageTutor;
import com.klef.soa.docker.exception.ResourceNotFoundException;
import com.klef.soa.docker.repository.LanguageTutorRepository;
@Service
@Transactional
public class LanguageTutorServiceImpl implements LanguageTutorService {

    @Autowired
    private LanguageTutorRepository repository;

    @Override
    public TutorResponse add(TutorRequest request) {
        LanguageTutor tutor = new LanguageTutor();
        tutor.setTutorName(request.getTutorName().trim());
        tutor.setLanguage(request.getLanguage().trim());
        tutor.setHourlyFee(request.getHourlyFee());
        tutor.setAvailable(request.getAvailable());

        LanguageTutor savedTutor = repository.save(tutor);
        return TutorResponse.fromEntity(savedTutor);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TutorResponse> displayAll() {
        return repository.findAll()
                .stream()
                .map(TutorResponse::fromEntity)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public TutorResponse displayById(Long id) {
        LanguageTutor tutor = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Tutor not found with ID: " + id));

        return TutorResponse.fromEntity(tutor);
    }

    @Override
    public TutorResponse update(Long id, TutorRequest request) {
        LanguageTutor tutor = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Tutor not found with ID: " + id));

        tutor.setTutorName(request.getTutorName().trim());
        tutor.setLanguage(request.getLanguage().trim());
        tutor.setHourlyFee(request.getHourlyFee());
        tutor.setAvailable(request.getAvailable());

        LanguageTutor updatedTutor = repository.save(tutor);
        return TutorResponse.fromEntity(updatedTutor);
    }

    @Override
    public String deleteByid(Long id) {
        LanguageTutor tutor = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Tutor not found with ID: " + id));

        repository.delete(tutor);
        return "Tutor deleted successfully";
    }
}
