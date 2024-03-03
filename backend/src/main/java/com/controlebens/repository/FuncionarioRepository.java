package com.controlebens.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.controlebens.model.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long>{
	Optional<Funcionario> findByLogin(String login);
}
