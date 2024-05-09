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
import com.controlebens.model.Inconsistencia;
import com.controlebens.service.InconsistenciaService;



@CrossOrigin
@RestController
@RequestMapping("/inconsistencia")
public class InconsistenciaController {
	
	@Autowired
	private InconsistenciaService inconsistenciaService;
	
	@GetMapping
	public ResponseEntity<List<Inconsistencia>> buscarTodasInconsistenciaas(){
		return ResponseEntity.status(HttpStatus.OK).body(inconsistenciaService.buscarTodasInconsistencias());
	}
	
	@PostMapping
	public ResponseEntity<Inconsistencia> salvarInconsistencia(@RequestBody Inconsistencia inconsistencia) throws Exception {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(inconsistenciaService.salvarInconsistencia(inconsistencia));
	}
	
	@PutMapping
	public ResponseEntity<Inconsistencia> editarInconsistencia(@RequestBody Inconsistencia inconsistencia) throws Exception{
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(inconsistenciaService.editarInconsistencia(inconsistencia));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseDefaultDTO> removerInconsistencia(@PathVariable Long id) throws Exception{
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(inconsistenciaService.removerInconsistencia(id));
	}
}
