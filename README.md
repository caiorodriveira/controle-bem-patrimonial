# Backend Controle de Bens Patrimoniais

Este é um projeto inicial que fornece uma estrutura básica para iniciar o desenvolvimento de uma aplicação Spring Boot com JPA (Java Persistence API) e utilizando o banco de dados PostgreSQL.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Java Development Kit (JDK) - 17](https://www.oracle.com/java/technologies/javase-downloads.html)
- [Apache Maven](https://maven.apache.org/download.cgi)
- [PostgreSQL](https://www.postgresql.org/download/)

## Configuração do Banco de Dados

1. Crie um banco de dados no PostgreSQL para a aplicação.
2. Abra o arquivo `src/main/resources/application.properties` e configure as propriedades relacionadas ao banco de dados, como URL, usuário e senha.

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/controle-bens
spring.datasource.username=postgres
spring.datasource.password=root
```

## Executando a aplicação
Para executar a aplicação via terminal execute os comandos
```terminal
mvn clean install -DskipTests
mvn spring-boot:run
```
## Endpoints / APIs com Swagger
O projeto fornece alguns endpoints para interagir com o banco de dados através da documentação de API com Swagger. <br>
Você pode acessar a documentação da API gerada automaticamente em:
- [http://localhost:8080/docs](http://localhost:8080/docs) ou
- [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

Teste o controller `hello` que deverá retornar "Funcionando".
