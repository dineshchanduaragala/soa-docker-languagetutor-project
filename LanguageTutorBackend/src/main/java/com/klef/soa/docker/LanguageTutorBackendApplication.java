package com.klef.soa.docker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LanguageTutorBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(LanguageTutorBackendApplication.class, args);
		System.out.println("Language Tutor Backend Application is Running ...!!!");
	}

}
