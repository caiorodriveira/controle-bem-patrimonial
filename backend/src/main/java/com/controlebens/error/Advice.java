package com.controlebens.error;

import java.time.OffsetDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.controlebens.error.exception.ExceptionDefault;
import com.controlebens.error.exception.InventarioNaoEncontrado;
import com.controlebens.error.exception.ValorBemInvalido;
import com.controlebens.error.exception.BemNaoEncontrado;

@ControllerAdvice
public class Advice {
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ExceptionDefault> erroGenerico(Exception e) {
		ExceptionDefault ed = new ExceptionDefault(e.getMessage(), OffsetDateTime.now());
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ed);
	}
	
	@ExceptionHandler(BemNaoEncontrado.class)
	public ResponseEntity<ExceptionDefault> bemNaoEncontrado(Exception e) {
		ExceptionDefault ed = new ExceptionDefault("Bem não encontrado", OffsetDateTime.now());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ed);
	}
	
	@ExceptionHandler(InventarioNaoEncontrado.class)
	public ResponseEntity<ExceptionDefault> inventarioNaoEncontrado(Exception e) {
		ExceptionDefault ed = new ExceptionDefault("Inventário não encontrado", OffsetDateTime.now());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ed);
	}
	
	@ExceptionHandler(ValorBemInvalido.class)
	public ResponseEntity<ExceptionDefault> valorBemInvalido(Exception e) {
		ExceptionDefault ed = new ExceptionDefault("Valor de bem inválido", OffsetDateTime.now());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ed);
	}

}
