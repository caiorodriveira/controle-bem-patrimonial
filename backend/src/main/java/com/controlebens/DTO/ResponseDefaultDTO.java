package com.controlebens.DTO;

import java.sql.Timestamp;
import java.util.Date;

import lombok.Data;

@Data
public class ResponseDefaultDTO {
	String menssagem;
	Timestamp timestamp;
	
	public ResponseDefaultDTO(String mensagem){
		this.menssagem = mensagem;
		timestamp = new Timestamp(new Date().getTime());
	}
}
