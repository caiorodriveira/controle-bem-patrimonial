package com.controlebens.DTO;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Set;

import com.controlebens.model.Bem;
import com.controlebens.model.Local;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventarioDTO {
	
	private Long id;
	
	private String nome;
	
	private BigDecimal valorTotal;
	
	private Timestamp data;
	

	private Timestamp dataUltimaEdicao;

	private Local local;
	
	private Set<Bem> bens;
}
