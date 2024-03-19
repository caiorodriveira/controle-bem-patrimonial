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

import com.controlebens.enums.EstadosBem;
import com.controlebens.model.Bem;
import com.controlebens.service.BemService;

@CrossOrigin
@RestController
@RequestMapping("/bem")
public class BemController {

	@Autowired
	private BemService bemService;

	@GetMapping
	public ResponseEntity<List<Bem>> buscarTodosBens() throws Exception {
		return ResponseEntity.status(HttpStatus.OK).body(bemService.buscarTodosBens());
	}
	
	@GetMapping("/estado/{estadoBem}")
	public ResponseEntity<List<Bem>> buscarBensPorEstado(@PathVariable EstadosBem estadoBem) throws Exception{
		return ResponseEntity.status(HttpStatus.OK).body(bemService.buscarBensPorEstado(estadoBem));
	}

	@PostMapping
	public ResponseEntity<Bem> salvarBem(@RequestBody Bem bem) throws Exception {
		return ResponseEntity.status(HttpStatus.CREATED).body(bemService.salvarBem(bem));
	}

	@PutMapping
	public ResponseEntity<Bem> editarBem(@RequestBody Bem bem) throws Exception {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(bemService.editarBem(bem));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Bem> removerBem(@PathVariable Long id) throws Exception {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(bemService.removerBem(id));
	}
}
