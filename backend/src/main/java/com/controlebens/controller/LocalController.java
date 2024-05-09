package com.controlebens.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlebens.DTO.ResponseDefaultDTO;
import com.controlebens.model.Local;
import com.controlebens.service.LocalService;



@CrossOrigin
@RestController
@RequestMapping("/local")
public class LocalController {

	
	@Autowired
	private LocalService localService;
	
	@GetMapping
	public ResponseEntity<List<Local>> buscarTodos() {
		return ResponseEntity.status(HttpStatus.OK).body(localService.buscarTodos());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Local> buscarPorId(@PathVariable Long id) throws Exception {
		return ResponseEntity.status(HttpStatus.OK).body(localService.buscarLocalPorId(id));
	}
	
	@PostMapping
	public ResponseEntity<Local> salvarLocal(@RequestBody Local local) throws Exception {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(localService.salvarLocal(local));
	}
	
	@PutMapping
	public ResponseEntity<Local> editarLocal(@RequestBody Local local) throws Exception {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(localService.editaLocal(local));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseDefaultDTO> removerLocal(@PathVariable Long id) throws Exception {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(localService.removerLocal(id));
	}
	
}
