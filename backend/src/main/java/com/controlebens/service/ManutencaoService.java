package com.controlebens.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlebens.DTO.ResponseDefaultDTO;
import com.controlebens.error.exception.ManutencaoNaoEncontrada;
import com.controlebens.model.Bem;
import com.controlebens.model.Manutencao;
import com.controlebens.model.ManutencaoRepository;

import jakarta.transaction.Transactional;

@Service
public class ManutencaoService {

	@Autowired
	private ManutencaoRepository manutencaoRepository;
	
	private BemService bemService;
	
	public List<Manutencao> buscarTodasManutencoes() {
		return manutencaoRepository.findAll();
	}
	
	public List<Manutencao> buscarManutencoesPorBem(Long idBem) throws Exception {
		Bem bem = bemService.bucarBemPorId(idBem);
		
		return manutencaoRepository.findByBem(bem);
	}
	
	@Transactional
	public Manutencao salvarManutencao(Manutencao manutencao) throws Exception {
		return manutencaoRepository.save(manutencao);
	}
	
	@Transactional
	public Manutencao editarManutencao(Manutencao manutencao) throws Exception {
		if(manutencaoRepository.findById(manutencao.getId()).isEmpty()) throw new ManutencaoNaoEncontrada();
		
		return manutencaoRepository.save(manutencao);
	}
	
	@Transactional
	public ResponseDefaultDTO removerManutencao(Long id) throws Exception {
		Optional<Manutencao> optManutencao = manutencaoRepository.findById(id);
		
		if(optManutencao.isEmpty()) throw new ManutencaoNaoEncontrada();
		
		manutencaoRepository.deleteById(id);
		
		return new ResponseDefaultDTO("Manutenção removida com sucesso");
	}
}
