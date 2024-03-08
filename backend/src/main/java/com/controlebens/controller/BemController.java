package com.controlebens.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlebens.model.Bem;
import com.controlebens.service.BemService;


@CrossOrigin
@RestController
@RequestMapping("/bem")
public class BemController {

	@Autowired
	private BemService bemService;
	
	@GetMapping
	public ResponseEntity<List<Bem>> buscarTodosBens(){
		return ResponseEntity.status(HttpStatus.OK).body(bemService.buscarTodosBens());
	}
	
	@PostMapping
	public ResponseEntity<Bem> salvarBem (@RequestBody Bem bem){	
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(bemService.salvarBem(bem));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
}
