package com.klef.soa.docker.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class TutorRequest {

    @NotBlank(message = "Tutor name is required")
    @Size(max = 100, message = "Tutor name cannot exceed 100 characters")
    private String tutorName;

    @NotBlank(message = "Language is required")
    @Size(max = 60, message = "Language cannot exceed 60 characters")
    private String language;

    @NotNull(message = "Hourly fee is required")
    @DecimalMin(value = "0.0", inclusive = false,
            message = "Hourly fee must be greater than zero")
    private Double hourlyFee;

    @NotNull(message = "Availability is required")
    private Boolean available;

	public String getTutorName() {
		return tutorName;
	}

	public void setTutorName(String tutorName) {
		this.tutorName = tutorName;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public Double getHourlyFee() {
		return hourlyFee;
	}

	public void setHourlyFee(Double hourlyFee) {
		this.hourlyFee = hourlyFee;
	}

	public Boolean getAvailable() {
		return available;
	}

	public void setAvailable(Boolean available) {
		this.available = available;
	}
    
}
