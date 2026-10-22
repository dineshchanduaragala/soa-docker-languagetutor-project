
package com.klef.soa.docker.dto;

import com.klef.soa.docker.entity.LanguageTutor;

public class TutorResponse {

    private Long id;
    private String tutorName;
    private String language;
    private Double hourlyFee;
    private Boolean available;

    public TutorResponse() {
    }

    public TutorResponse(Long id, String tutorName, String language,
                         Double hourlyFee, Boolean available) {
        this.id = id;
        this.tutorName = tutorName;
        this.language = language;
        this.hourlyFee = hourlyFee;
        this.available = available;
    }

    public static TutorResponse fromEntity(LanguageTutor tutor) {
        return new TutorResponse(
                tutor.getId(),
                tutor.getTutorName(),
                tutor.getLanguage(),
                tutor.getHourlyFee(),
                tutor.getAvailable()
        );
    }

    public Long getId() {
        return id;
    }

    public String getTutorName() {
        return tutorName;
    }

    public String getLanguage() {
        return language;
    }

    public Double getHourlyFee() {
        return hourlyFee;
    }

    public Boolean getAvailable() {
        return available;
    }
}
