package com.controlebens.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.controlebens.enums.EstadosBem;
import com.controlebens.model.Bem;

public interface BemRepository extends JpaRepository<Bem, Long>{
	
	public List<Bem> findByEstadoBem(EstadosBem estadoBem);  

}
