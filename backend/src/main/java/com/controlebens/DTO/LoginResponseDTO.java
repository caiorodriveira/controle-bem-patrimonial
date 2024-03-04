package com.controlebens.DTO;

import com.controlebens.model.Funcionario;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDTO {
	String token;
	
	Funcionario funcionario;
}
