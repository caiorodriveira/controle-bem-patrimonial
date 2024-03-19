package com.controlebens.error;

import java.time.OffsetDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.controlebens.error.exception.ExceptionDefault;
import com.controlebens.error.exception.NotFoundBem;

@ControllerAdvice
public class Advice {
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ExceptionDefault> erroGenerico(Exception e) {
		ExceptionDefault ed = new ExceptionDefault(e.getMessage(), OffsetDateTime.now());
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ed);
	}
	
	@ExceptionHandler(NotFoundBem.class)
	public ResponseEntity<ExceptionDefault> bemNaoEncontrado(Exception e) {
		ExceptionDefault ed = new ExceptionDefault("Bem não encontrado", OffsetDateTime.now());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ed);
	}

}
