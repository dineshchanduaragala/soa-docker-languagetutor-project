
package com.klef.soa.docker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "LanguageTutor_table")
public class LanguageTutor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tutor name is required")
    @Size(max = 100, message = "Tutor name cannot exceed 100 characters")
    @Column(nullable = false, length = 100)
    private String tutorName;

    @NotBlank(message = "Language is required")
    @Size(max = 60, message = "Language cannot exceed 60 characters")
    @Column(nullable = false, length = 60)
    private String language;

    @NotNull(message = "Hourly fee is required")
    @DecimalMin(value = "0.0", inclusive = false,
            message = "Hourly fee must be greater than zero")
    @Column(nullable = false)
    private Double hourlyFee;

    @NotNull(message = "Availability is required")
    @Column(nullable = false)
    private Boolean available;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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
