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

import com.controlebens.DTO.InventarioDTO;
import com.controlebens.DTO.ResponseDefaultDTO;
import com.controlebens.model.Inventario;
import com.controlebens.service.InventarioService;


@CrossOrigin
@RestController
@RequestMapping("/inventario")
public class InventarioController {
	
	@Autowired
	private InventarioService inventarioService;
	
	@GetMapping
	public ResponseEntity<List<InventarioDTO>> buscarTodosInventarios() {
		return ResponseEntity.status(HttpStatus.OK).body(inventarioService.buscarTodosInventarios());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<InventarioDTO> buscarInventarioPoriD(@PathVariable Long id) throws Exception {
		return ResponseEntity.status(HttpStatus.OK).body(inventarioService.buscarInventarioPorId(id));
	}
	
	@PostMapping
	public ResponseEntity<Inventario> salvarInventario(@RequestBody InventarioDTO inventario) throws Exception{
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(inventarioService.salvarInventarioEInventarioBem(inventario));
	}
	
	@PutMapping
	public ResponseEntity<Inventario> editarInventario(@RequestBody InventarioDTO inventario) throws Exception {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(inventarioService.editarInventario(inventario));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseDefaultDTO> removernventario(@PathVariable Long id) throws Exception {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(inventarioService.removerInventario(id));
	}

}
