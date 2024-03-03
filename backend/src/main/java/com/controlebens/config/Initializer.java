
package com.controlebens.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.controlebens.enums.Role;
import com.controlebens.model.Funcionario;
import com.controlebens.repository.FuncionarioRepository;

@Component
public class Initializer implements CommandLineRunner{

	FuncionarioRepository funcionarioRepository;

	@Autowired
	public Initializer(FuncionarioRepository funcionarioRepository) {
		this.funcionarioRepository = funcionarioRepository;
	}

	@Override
	public void run(String... args) throws Exception {
		String encryptedPassword = new BCryptPasswordEncoder().encode("admin@123");
		if(funcionarioRepository.findByLogin("admin").isEmpty()) {
			Funcionario funcionario = new Funcionario(
					null,
					"Administrador",
					"12345678909",
					"admin",
					"admin",
					encryptedPassword,
					Role.ADMIN
			);
			funcionarioRepository.save(funcionario);
		}
	}
}
