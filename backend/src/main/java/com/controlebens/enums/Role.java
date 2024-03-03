package com.controlebens.enums;

public enum Role {
	 ADMIN("admin"),
	    USER("user");

	    public String role;

	    Role(String role){
	        this.role = role;
	    }

	    String getRole(){
	        return this.role;
	    }

}
