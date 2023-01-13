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
public class Landing {
	private final ObjectMapper objectMapper = new ObjectMapper();
	@PostMapping("/land")
	public String getDevices(@RequestBody String payload,HttpServletResponse res) {
		try {
			System.out.println("Here");
			JsonNode js = objectMapper.readTree(payload);
			//System.out.println("New: "+js);
			String data = "" ;
			String email = js.get("email").textValue();
			MongoClient mc = MongoClients.create("mongodb://localhost:27017");
			MongoDatabase db = mc.getDatabase("Nms");
			MongoCollection<Document> doc = db.getCollection("Devices");
			Document docs = new Document("User ID", email);
//			docs.append("User ID", email);
			FindIterable<Document> doc1 = doc.find(docs);
			int count1 = 0;
			int check = 1;
			data +="[";
			for(Document d:doc1) {
//				d.remove("Alerts");
				count1++;
				String dev = d.toJson();
				System.out.println(dev);
				if(check==1) {
					data += dev;
					check--;
				}
				data += ","+dev;
			}
			data+= "]";
//			System.out.println(data);
			if(count1==0) {
				res.setStatus(200);
				return "No devices";
			}
//			System.out.println(data);
			res.setStatus(200);
			return data;
			
		}catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "No Devices";
	}
		
}
