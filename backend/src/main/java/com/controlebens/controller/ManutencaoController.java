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
import com.controlebens.model.Manutencao;
import com.controlebens.service.ManutencaoService;


@CrossOrigin
@RestController
@RequestMapping("/manutencao")
public class ManutencaoController {

	@Autowired
	private ManutencaoService manutencaoService;
	
	@GetMapping
	public ResponseEntity<List<Manutencao>> buscarTodasManutencoes() {
		return ResponseEntity.status(HttpStatus.OK).body(manutencaoService.buscarTodasManutencoes());
	}
	
	@GetMapping("/{idBem}")
	public ResponseEntity<List<Manutencao>> buscarManutencoesPorBem(@PathVariable Long idBem) throws Exception{
		return ResponseEntity.status(HttpStatus.OK).body(manutencaoService.buscarManutencoesPorBem(idBem));
	}
	
	@PostMapping
	public ResponseEntity<Manutencao> salvarManutencao(@RequestBody Manutencao manutencao) throws Exception {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(manutencaoService.salvarManutencao(manutencao));
	}
	
	@PutMapping
	public ResponseEntity<Manutencao> editarManutencao(@RequestBody Manutencao manutencao) throws Exception {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(manutencaoService.editarManutencao(manutencao));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseDefaultDTO> removerManutencao(@PathVariable Long id) throws Exception {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(manutencaoService.removerManutencao(id));
	}
}
