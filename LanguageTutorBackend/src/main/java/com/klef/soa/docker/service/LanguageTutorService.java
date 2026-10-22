package com.klef.soa.docker.service;

import java.util.List;

import com.klef.soa.docker.dto.TutorRequest;
import com.klef.soa.docker.dto.TutorResponse;

public interface LanguageTutorService {

    TutorResponse add(TutorRequest tutor);

    List<TutorResponse> displayAll();

    TutorResponse displayById(Long id);

    TutorResponse update(Long id, TutorRequest tutor);

    String deleteByid(Long id);
}
