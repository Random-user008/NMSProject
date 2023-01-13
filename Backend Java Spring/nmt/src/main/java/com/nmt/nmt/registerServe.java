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
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.InsertOneResult;
//import java.util.Collections;

import jakarta.servlet.http.HttpServletResponse;


@RestController
@CrossOrigin(origins="http://localhost:3000")
public class registerServe {
	private final ObjectMapper objectMapper = new ObjectMapper();
	
	@PostMapping("/register")
	public String recieveData(@RequestBody String payload,HttpServletResponse respone) {
		
		try {
			JsonNode js =  objectMapper.readTree(payload);
			String name = js.get("name").textValue();
			String email = js.get("email").textValue();
			String password = js.get("password").textValue();
			System.out.println("details:"+name+" "+email+" "+password);
			Random rand = new Random();
			int secret = rand.nextInt((Integer.MAX_VALUE - 10000))+10000;
			//Model obj = new Model(name,email,password);
			MongoClient mc = MongoClients.create("mongodb://localhost:27017");
			MongoDatabase db = mc.getDatabase("Nms");
			MongoCollection<Document> doc = db.getCollection("Nmstry");
			Document docs = new Document();
			docs.append("name", name);
			docs.append("email", email);
			docs.append("password", password);
			docs.append("secret", secret);
			InsertOneResult in = doc.insertOne(docs);
			if(in.getInsertedId()!=null) {
				respone.setStatus(200);
				return "User Added";
			}
			respone.setStatus(500);
			return "Error";
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		respone.setStatus(500);
		return "Error";
	}
	
	
//	@Bean
//    public CorsFilter corsFilter() {
//        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        final CorsConfiguration config = new CorsConfiguration();
//        config.setAllowCredentials(true);
//        config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
//        config.setAllowedHeaders(Collections.singletonList("*"));
//        config.setAllowedMethods(Collections.singletonList("*"));
//        source.registerCorsConfiguration("/**", config);
//        return new CorsFilter(source);
//    }
    
    @ControllerAdvice
    public class GlobalExceptionHandler {

    @ExceptionHandler(value = HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleMethodNotSupported(HttpRequestMethodNotSupportedException ex) {
        ErrorResponse error = new ErrorResponse();
        error.setErrorCode(HttpStatus.METHOD_NOT_ALLOWED.value());
        error.setMessage(ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.METHOD_NOT_ALLOWED);
    }
}
}