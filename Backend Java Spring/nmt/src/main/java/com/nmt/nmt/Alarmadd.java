package com.nmt.nmt;


import org.springframework.web.bind.annotation.*;


//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.filter.CorsFilter;
import org.springframework.web.HttpRequestMethodNotSupportedException;

import java.util.Random;

import org.bson.Document;
//import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.data.mongodb.core.MongoTemplate;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
//import com.mongodb.client.result.InsertOneResult;
//import java.util.Collections;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class Alarmadd {
	private final ObjectMapper objectMapper = new ObjectMapper();
	@PostMapping("/alarm")
	public void addA(@RequestBody String payload) throws JsonMappingException, JsonProcessingException {
		JsonNode js = objectMapper.readTree(payload);
		
	}
}
