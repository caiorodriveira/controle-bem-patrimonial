package com.controlebens.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.controlebens.enums.EstadosBem;
import com.controlebens.model.Bem;
import com.controlebens.model.Local;

public interface BemRepository extends JpaRepository<Bem, Long>{
	
	public List<Bem> findByEstadoBem(EstadosBem estadoBem);  
	
	public List<Bem> findByLocal(Local local);

}
