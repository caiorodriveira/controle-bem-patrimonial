package com.controlebens.service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.controlebens.DTO.ResponseDefaultDTO;
import com.controlebens.error.exception.InventarioNaoEncontrado;
import com.controlebens.model.Bem;
import com.controlebens.model.Inventario;
import com.controlebens.repository.InventarioRepository;

import org.springframework.transaction.annotation.Transactional;


@Service
public class InventarioService {
	
	@Autowired
	private InventarioRepository inventarioRepository;
	
	public List<Inventario> buscarInventarios(){
		return inventarioRepository.findAll();
	}
	
	@Transactional
	public Inventario salvarInventario(Inventario inventario) throws Exception{
		
		BigDecimal valorTotal = BigDecimal.valueOf(0);
		Timestamp dataAtual = new Timestamp(new Date().getTime());
		
		for(Bem bem : inventario.getBens()) {			
			if(bem.getValorAlugel() != null) valorTotal.add(bem.getValorAlugel());
			else valorTotal.add(bem.getValorAtual());
		}
		
		Inventario newInventario = new Inventario(
				null,
				valorTotal,
				dataAtual,
				inventario.getLocal(),
				inventario.getBens());
		
		return inventarioRepository.save(newInventario);
		
	}
	
	@Transactional
	public Inventario editarInventario(Inventario inventario) throws Exception {
		if(inventarioRepository.findById(inventario.getId()).isEmpty()) {
			throw new InventarioNaoEncontrado();
		}
		
		BigDecimal valorTotal = BigDecimal.valueOf(0);
		
		for(Bem bem : inventario.getBens()) {			
			if(bem.getValorAlugel() != null) valorTotal.add(bem.getValorAlugel());
			else valorTotal.add(bem.getValorAtual());
		}
		
		Inventario newInventario = new Inventario(
				inventario.getId(),
				valorTotal,
				inventario.getData(),
				inventario.getLocal(),
				inventario.getBens());
		
		return inventarioRepository.save(newInventario);
	}
	
	@Transactional
	public ResponseDefaultDTO removerInventario(Long id) throws Exception {
		if(inventarioRepository.findById(id).isEmpty()) {
			throw new InventarioNaoEncontrado();
		}
		
		inventarioRepository.deleteById(id);
		
		return new ResponseDefaultDTO("Excluído com sucesso");
	}
}
