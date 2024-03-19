package com.controlebens.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlebens.model.Local;
import com.controlebens.service.LocalService;

@RestController
@RequestMapping("/local")
public class LocalController {

	
	@Autowired
	private LocalService localService;
	
	@GetMapping
	public ResponseEntity<List<Local>> buscarTodos() {
		return ResponseEntity.status(HttpStatus.OK).body(localService.buscarTodos());
	}
	
}
