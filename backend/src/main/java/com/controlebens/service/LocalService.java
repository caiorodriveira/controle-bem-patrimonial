package com.controlebens.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlebens.model.Local;
import com.controlebens.repository.LocalRepository;

@Service
public class LocalService {

	
	@Autowired
	private LocalRepository localRepository;
	
	public List<Local> buscarTodos() {
		return localRepository.findAll();
	}
}
