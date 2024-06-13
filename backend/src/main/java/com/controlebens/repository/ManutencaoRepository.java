package com.controlebens.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.controlebens.model.Bem;
import com.controlebens.model.Manutencao;

public interface ManutencaoRepository extends JpaRepository<Manutencao, Long>{

	List<Manutencao> findByBem(Bem bem);
}
