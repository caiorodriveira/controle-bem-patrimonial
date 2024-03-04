package com.controlebens.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controlebens.DTO.FuncionarioDTO;
import com.controlebens.DTO.LoginDTO;
import com.controlebens.DTO.LoginResponseDTO;
import com.controlebens.config.TokenSecurity;
import com.controlebens.model.Funcionario;
import com.controlebens.service.FuncionarioService;

import jakarta.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/funcionario")
public class FuncionarioController {

	@Autowired
	private TokenSecurity tokenSecurity;

	@Autowired
	private FuncionarioService funcionarioService;

	@Autowired
	private AuthenticationManager authManager;

	@PostMapping("/login")
	ResponseEntity login(@RequestBody @Valid LoginDTO login) throws Exception {
		var userAuthentication = new UsernamePasswordAuthenticationToken(login.getLogin(), login.getSenha());
		var auth = authManager.authenticate(userAuthentication);

		var token = tokenSecurity.generateToken((Funcionario) auth.getPrincipal());
		
		LoginResponseDTO responseDTO = new LoginResponseDTO(
				token,
				funcionarioService.buscarFuncionarioPorLogin(login.getLogin())
				);

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(responseDTO);
	}

	@PostMapping
	ResponseEntity salvarFuncionario(@RequestBody @Valid FuncionarioDTO funcionario) throws Exception {

			String encryptedPassword = new BCryptPasswordEncoder().encode(funcionario.getSenha());

			Funcionario newFunc = new Funcionario(null, funcionario.getNome(), funcionario.getCpf(),
					funcionario.getCargo(), funcionario.getLogin(), encryptedPassword, funcionario.getRole()

			);

			Funcionario userCreated = funcionarioService.salvarFuncionario(newFunc);

			return ResponseEntity.status(HttpStatus.CREATED).body(userCreated);

	}

}
