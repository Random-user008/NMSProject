package com.nmt.nmt;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class NmtApplication {

	public static void main(String[] args) {
		SpringApplication.run(NmtApplication.class, args);
	}
	
//	@Bean
//	public WebMvcConfigurer congfig() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/login").allowedOrigins("http://localhost:3000");
//			}
//		};
//	}
	

}
