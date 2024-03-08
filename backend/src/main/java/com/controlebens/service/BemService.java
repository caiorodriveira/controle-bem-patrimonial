package com.controlebens.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlebens.model.Bem;
import com.controlebens.repository.BemRepository;

@Service
public class BemService {
	
	@Autowired
	private BemRepository bemRepository;

	public List<Bem> buscarTodosBens (){
		return bemRepository.findAll();
	}
	
	public Bem salvarBem(Bem bem) {
		bemRepository.save(bem);
		return bem;
	}
}
