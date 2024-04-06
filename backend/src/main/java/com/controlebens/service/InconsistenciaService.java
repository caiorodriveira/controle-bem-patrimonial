package com.controlebens.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlebens.DTO.ResponseDefaultDTO;
import com.controlebens.error.exception.InconsistenciaNaoEncontrada;
import com.controlebens.model.Inconsistencia;
import com.controlebens.repository.InconsistenciaRepository;

import jakarta.transaction.Transactional;

@Service
public class InconsistenciaService {
	
	@Autowired
	private InconsistenciaRepository inconsistenciaRepository;
	
	public List<Inconsistencia> buscarTodasInconsistencias(){
		return inconsistenciaRepository.findAll();
	}
	
	@Transactional
	public Inconsistencia salvarInconsistencia(Inconsistencia inconsistencia) throws Exception{
		return inconsistenciaRepository.save(inconsistencia);
	}
	
	@Transactional
	public Inconsistencia editarInconsistencia(Inconsistencia inconsistencia) throws Exception {
		if(inconsistenciaRepository.findById(inconsistencia.getId()).isEmpty() || inconsistencia.getId() == null) throw new InconsistenciaNaoEncontrada();
		
		return inconsistenciaRepository.save(inconsistencia);
	}
	
	@Transactional
	public ResponseDefaultDTO removerInconsistencia(Long id) throws Exception {
		Optional<Inconsistencia> optInconsistencia = inconsistenciaRepository.findById(id);
		
		if(optInconsistencia.isEmpty() || id == null) throw new InconsistenciaNaoEncontrada();
		
		inconsistenciaRepository.deleteById(id);
		
		return new ResponseDefaultDTO("Inconsistencia removida com sucesso");
	}
}
