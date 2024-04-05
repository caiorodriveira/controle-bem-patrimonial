package com.controlebens.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlebens.DTO.ResponseDefaultDTO;
import com.controlebens.error.exception.LocalJaExiste;
import com.controlebens.error.exception.LocalNaoEncontrado;
import com.controlebens.model.Local;
import com.controlebens.repository.LocalRepository;

import jakarta.transaction.Transactional;

@Service
public class LocalService {

	
	@Autowired
	private LocalRepository localRepository;
	
	public List<Local> buscarTodos() {
		return localRepository.findAll();
	}
	
	public Local buscarLocalPorId(Long id) throws Exception{
		Optional<Local> optLocal = localRepository.findById(id);
		
		if(optLocal.isEmpty()) throw new LocalNaoEncontrado();
		
		return optLocal.get();
	}
	
	@Transactional
	public Local salvarLocal(Local local) throws Exception {
		
		if(localRepository.findById(local.getId()).isPresent()) throw new LocalJaExiste();
		
		return localRepository.save(local);
	}
	
	@Transactional
	public Local editaLocal(Local local) throws Exception {
		if(localRepository.findById(local.getId()).isEmpty()) throw new LocalNaoEncontrado();
		
		return localRepository.save(local);
	}
	
	@Transactional
	public ResponseDefaultDTO removerLocal(Long id) throws Exception {
		Optional<Local> optLocal = localRepository.findById(id);
		if(optLocal.isEmpty()) throw new LocalNaoEncontrado();
		
		localRepository.deleteById(id);
		
		return new ResponseDefaultDTO("Local deletado com sucesso");
	}
}
