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
public class AddDevice {
	private final ObjectMapper objectMapper = new ObjectMapper();
	
	@PostMapping("/addDev")
	public String addD(@RequestBody String payload,HttpServletResponse res) {
		try {
			JsonNode js = objectMapper.readTree(payload);
			String name = js.get("name").textValue();
			String ip = js.get("IpAddress").textValue();
			String user = js.get("userID").textValue();
			String alerts = js.get("Alerts").textValue();
			MongoClient mc = MongoClients.create("mongodb://localhost:27017");
			MongoDatabase db = mc.getDatabase("Nms");
			MongoCollection<Document> doc = db.getCollection("Devices");
			Document docs = new Document();
			docs.append("Device Name", name);
			docs.append("IP", ip);
			docs.append("User ID", user);
			docs.append("Alerts", alerts);
			InsertOneResult in = doc.insertOne(docs);
			System.out.println(in);
			if(in.getInsertedId()!=null) {
				res.setStatus(200);
				return "User Added";
			}
			res.setStatus(500);
			return "Error";
			
		}catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		res.setStatus(500);
		return "Error";
	}

}
