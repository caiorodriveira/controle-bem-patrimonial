package com.controlebens.model;

import java.math.BigDecimal;
import java.sql.Date;

import com.controlebens.enums.EstadosManutencao;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_manutencao")
public class Manutencao {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String motivo;
	
	private BigDecimal valor;
	
	@ManyToOne
	@JoinColumn(name = "id_bem")
	private Bem bem;
	
	@Enumerated(EnumType.STRING)
	private EstadosManutencao estado;
	
	private Date data;
	
	@Column(name = "nota_fiscal")
	private String notaFiscal;
}
