package com.controlebens.model;

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
@Table(name = "inconsistencia")
public class Inconsistencia {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "id_inventario")
	private Inventario inventario;
	
	private String descricao;
	
	@Column(name = "qt_cadastrada")
	private Long qtdCadastrada;
	
	@Column(name = "qt_atual")
	private Long qtdAtual;
	
	@Column(name = "data_inconsistencia")
	private Timestamp data;
}
