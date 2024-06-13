package com.controlebens.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlebens.model.InventarioBem;
import com.controlebens.repository.InventarioBemRepository;

import jakarta.transaction.Transactional;

@Service
public class InventarioBemService {

	@Autowired
	private InventarioBemRepository inventarioBemRepository;
	
	public InventarioBem salvarInventarioBem(Long idInventario, Long idBem) throws Exception {
		InventarioBem inventarioBem = new InventarioBem(null, idBem, idInventario);
		return inventarioBemRepository.save(inventarioBem);
	}
	
	@Transactional
	public void removerInventarioBemPorIdInventario(Long idInventario) throws Exception {
		inventarioBemRepository.deleteByIdInventario(idInventario);
	}
}
