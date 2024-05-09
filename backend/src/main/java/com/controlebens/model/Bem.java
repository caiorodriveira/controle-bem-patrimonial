package com.controlebens.model;

import java.math.BigDecimal;

import com.controlebens.enums.EstadosBem;

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
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_bem")
public class Bem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true)
	private String codigo;
	
	private String descricao;
	
	private BigDecimal valorInicial;
	
	private BigDecimal valorAtual;
	
	@ManyToOne
	@JoinColumn(name = "id_local")
	private Local local; //clase Local
	
	@Enumerated(EnumType.STRING)
	private EstadosBem estadoBem; //enum
	
	private boolean alugado;
	
	private BigDecimal valorAluguel;
}
