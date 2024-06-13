package com.controlebens.service;

import java.util.Optional;

import org.antlr.v4.runtime.atn.SemanticContext.AND;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.controlebens.model.Funcionario;
import com.controlebens.repository.FuncionarioRepository;


@Service
public class FuncionarioService implements UserDetailsService{
	@Autowired
	private FuncionarioRepository funcionarioRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		if (funcionarioRepository.findByLogin(username).isPresent())
			return funcionarioRepository.findByLogin(username).get();
		return null;
	}
	
	public Funcionario salvarFuncionario (Funcionario funcionario) throws Exception{
		if(funcionario.getId() == null && funcionarioRepository.findByLogin(funcionario.getLogin()).isEmpty()) {
			return funcionarioRepository.save(funcionario);
		}
		throw new Exception("Funcionário já cadastrado");//temporário até implantação do controller advicer
	}
	
	public Funcionario buscarFuncionarioPorLogin(String login) throws Exception{
		Optional<Funcionario> encontrado = funcionarioRepository.findByLogin(login);
		if(encontrado.isPresent()) {
			return encontrado.get();
		}
		else {
			throw new Exception("Funcionário não encontrado");
		}
	}
}
