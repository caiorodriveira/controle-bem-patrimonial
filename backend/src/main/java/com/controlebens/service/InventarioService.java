package com.controlebens.service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.controlebens.DTO.InventarioDTO;
import com.controlebens.DTO.ResponseDefaultDTO;
import com.controlebens.error.exception.InventarioJaExiste;
import com.controlebens.error.exception.InventarioNaoEncontrado;
import com.controlebens.model.Bem;
import com.controlebens.model.Inventario;
import com.controlebens.model.InventarioBem;
import com.controlebens.repository.BemRepository;
import com.controlebens.repository.InventarioBemRepository;
import com.controlebens.repository.InventarioRepository;


@Service
public class InventarioService {
	
	@Autowired
	private InventarioRepository inventarioRepository;
	
	@Autowired
	private InventarioBemRepository inventarioBemRepository;
	
	@Autowired 
	private InventarioBemService inventarioBemService;
	
	@Autowired
	private BemRepository bemRepository;
	
	
	
	//gabiarra pra driblar o JPA (não faça, fiz por preguiça)
	public List<InventarioDTO> buscarTodosInventarios() {
		List<InventarioDTO> inventarios = new ArrayList<>();
		List<InventarioBem> idsInventariosBens = inventarioBemRepository.findAll();
		List<Long> idsInventarios = new ArrayList<>();
		
		for(InventarioBem idInventarioBem: idsInventariosBens) {
			if(!idsInventarios.contains(idInventarioBem.getIdInventario()))
				idsInventarios.add(idInventarioBem.getIdInventario());
		}
		
		for(Long idInventario: idsInventarios) {
			Inventario inventario = inventarioRepository.findById(idInventario).get();
			List<Bem> bens = new ArrayList<>();
			for(InventarioBem inventarioBem: idsInventariosBens) {
				if(idInventario == inventarioBem.getIdInventario()) {
					bens.add(bemRepository.findById(inventarioBem.getIdBem()).get());
				}
			}
			inventarios.add(converterParaInventarioDTO(inventario, bens));
		}
        
        return inventarios;
    }
	
	private InventarioDTO converterParaInventarioDTO(Inventario inventario, List<Bem> bens) {
		InventarioDTO inventarioDTO = new InventarioDTO();
		inventarioDTO.setId(inventario.getId());
		inventarioDTO.setData(inventario.getData());
		inventarioDTO.setNome(inventario.getNome());
		inventarioDTO.setValorTotal(inventario.getValorTotal());
		inventarioDTO.setLocal(inventario.getLocal());
		inventarioDTO.setBens(new HashSet<>(bens));
		
		return inventarioDTO;
	}
	
	public InventarioDTO buscarInventarioPorId(Long idInventario) throws Exception{
	    Optional<Inventario> optionalInventario = inventarioRepository.findById(idInventario);
	    
	    if (!optionalInventario.isPresent()) {
	        throw new InventarioNaoEncontrado();
	    }

	    Inventario inventario = optionalInventario.get();
	    
	    List<InventarioBem> inventarioBens = inventarioBemRepository.findAllByIdInventario(idInventario);
	    List<Bem> bens = inventarioBens.stream()
	                                   .map(inventarioBem -> bemRepository.findById(inventarioBem.getIdBem()).orElse(null))
	                                   .filter(Objects::nonNull)
	                                   .collect(Collectors.toList());
	    
	    return converterParaInventarioDTO(inventario, bens);
	}
	
	public Inventario salvarInventarioEInventarioBem(InventarioDTO inventario) throws Exception{
		
		Inventario inventarioSalvo = salvarInventario(inventario);
		
		for(Bem bem : inventario.getBens()) {
			inventarioBemService.salvarInventarioBem(inventarioSalvo.getId(), bem.getId());
		}
		
		return inventarioSalvo;
		
	}
	
	@Transactional
	private Inventario salvarInventario(InventarioDTO inventario) throws Exception{
		if(inventario.getId() != null)
			if(inventarioRepository.findById(inventario.getId()).isPresent()) throw new InventarioJaExiste();
		
		
		BigDecimal valorTotal = BigDecimal.valueOf(0);
		Timestamp dataAtual = new Timestamp(new Date().getTime());
		
		for(Bem bem : inventario.getBens()) {			
			if(bem.isAlugado()) valorTotal = valorTotal.add(bem.getValorAluguel());
			else valorTotal = valorTotal.add(bem.getValorAtual());
		}
		
		Inventario newInventario = new Inventario(
				null,
				inventario.getNome(),
				valorTotal,
				dataAtual,
				null,
				inventario.getLocal());
		
		return inventarioRepository.save(newInventario);
	}
	
	

	public Inventario editarInventario(InventarioDTO inventario) throws Exception {
		if(inventarioRepository.findById(inventario.getId()).isEmpty()) {
			throw new InventarioNaoEncontrado();
		}
		
		Timestamp dataAtual = new Timestamp(new Date().getTime());
		BigDecimal valorTotal = BigDecimal.valueOf(0);
		
		for(Bem bem : inventario.getBens()) {			
			if(bem.getValorAluguel() != null) valorTotal = valorTotal.add(bem.getValorAluguel());
			else valorTotal = valorTotal.add(bem.getValorAtual());
		}

		Inventario newInventario = new Inventario(
				inventario.getId(),
				inventario.getNome(),
				valorTotal,
				inventario.getData(),
				dataAtual,
				inventario.getLocal());
		
		
		inventarioBemService.removerInventarioBemPorIdInventario(inventario.getId());
		Inventario inventarioEditado = inventarioRepository.save(newInventario);
		
		for(Bem bem : inventario.getBens()) {
			inventarioBemService.salvarInventarioBem(inventarioEditado.getId(), bem.getId());
		}
		
		return inventarioEditado;
	}
	
	
	public ResponseDefaultDTO removerInventario(Long id) throws Exception {
		if(inventarioRepository.findById(id).isEmpty()) {
			throw new InventarioNaoEncontrado();
		}
		
		inventarioBemService.removerInventarioBemPorIdInventario(id);
		inventarioRepository.deleteById(id);
		
		return new ResponseDefaultDTO("Excluído com sucesso");
	}
}
