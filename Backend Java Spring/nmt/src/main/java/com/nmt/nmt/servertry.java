package com.nmt.nmt;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.bson.Document;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import jakarta.servlet.http.HttpServletResponse;

import java.util.Collections;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class servertry {
	private final ObjectMapper objectMapper = new ObjectMapper();
	@PostMapping("/login")
    public String receiveData(@RequestBody String payload,HttpServletResponse respone) {
        //return "Data received: " + payload;
        try {
			JsonNode js =  objectMapper.readTree(payload);
			String email = js.get("email").textValue();
			String password  = js.get("password").textValue();
			MongoClient mc = MongoClients.create("mongodb://localhost:27017");
			MongoDatabase db = mc.getDatabase("Nms");
			MongoCollection<Document> doc = db.getCollection("Nmstry");
			Document find = new Document("email",email);
			Document docs = (Document) doc.find(find).first();
			String pass = docs.getString("password");
			if(pass.equals(password)) {
				respone.setStatus(200);
				return "Logged IN";
			}
			System.out.println(docs);
			respone.setStatus(500);
			return "Error";
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        respone.setStatus(500);
        return "Error";
    }
    
//    @GetMapping("/login")
//    public String receiveDataGet(@RequestBody String payload) {
//        return "Data received: " + payload;
//    }
    
    @Bean
    public CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
        config.setAllowedHeaders(Collections.singletonList("*"));
        config.setAllowedMethods(Collections.singletonList("*"));
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
    
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

class ErrorResponse {
    private int errorCode;
    private String message;

    public int getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

