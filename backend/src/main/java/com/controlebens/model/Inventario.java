package com.controlebens.model;

import java.math.BigDecimal;
import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "inventario")
public class Inventario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nome;
	
	@Column(name = "valor_total")
	private BigDecimal valorTotal;
	
	@Column(name = "data_cadastro")
	private Timestamp data;
	
	@Column(name = "data_ultima_edicao")
	private Timestamp dataUltimaEdicao;
	
	@ManyToOne
	@JoinColumn(name = "id_local_inventario")
	private Local local;
	
}
