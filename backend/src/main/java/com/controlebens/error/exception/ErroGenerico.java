package com.controlebens.error.exception;

public class ErroGenerico extends Exception{

	private static final long serialVersionUID = 1L;
	private String mensagem;

    public ErroGenerico(String mensagem) {
        this.mensagem = mensagem;
    }

    @Override
    public String getMessage() {
        return mensagem;
    }

}
