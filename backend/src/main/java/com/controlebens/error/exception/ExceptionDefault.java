package com.controlebens.error.exception;

import java.time.OffsetDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExceptionDefault {

	private String message;
	private OffsetDateTime data;
}
