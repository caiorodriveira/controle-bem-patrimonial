package com.controlebens.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.controlebens.model.InventarioBem;

public interface InventarioBemRepository extends JpaRepository<InventarioBem, Long> {

	public void deleteByIdInventario(Long idInventario);
	
	public List<InventarioBem> findAllByIdInventario(Long idInventario);
}
