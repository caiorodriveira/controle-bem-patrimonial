package com.controlebens.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories("com.controlebens.repository") // Pacote onde estão os repositórios
public class JpaConfig {
    // Outras configurações da aplicação
}
