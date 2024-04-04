package com.controlebens.model;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_inventario")
public class Inventario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "valor_total")
	private BigDecimal valorTotal;
	
	@Column(name = "data_cadastro")
	private Timestamp data;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_local")
	private Local local;
	
	@ManyToMany
    @JoinTable(
            name = "tb_inventario_bem",
            joinColumns = @JoinColumn(name = "id_iventario"),
            inverseJoinColumns = @JoinColumn(name = "id_bem")
        )
	private Set<Bem> bens;
}
