package com.controlebens.DTO;

import com.controlebens.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FuncionarioDTO {
private String nome;
	
	private String cpf;
	
	private String cargo;
	
	private String login;
	
	private String senha;
	
	private Role role;


}
