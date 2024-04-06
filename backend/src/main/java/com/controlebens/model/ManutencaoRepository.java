package com.controlebens.model;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ManutencaoRepository extends JpaRepository<Manutencao, Long>{

	List<Manutencao> findByBem(Bem bem);
}
