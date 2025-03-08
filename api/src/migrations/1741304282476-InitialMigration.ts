import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1741304282476 implements MigrationInterface {
    name = 'InitialMigration1741304282476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Monitor\` (\`Dispositivo_ID\` int NOT NULL COMMENT 'ID do dispositivo que atua como monitor de senhas', \`status\` tinyint NOT NULL COMMENT 'Status do monitor: 0 - Inativo, 1 - Ativo' DEFAULT '1', \`rotulo\` varchar(255) NULL COMMENT 'Rótulo para identificação do monitor', \`dataCadastro\` timestamp NULL COMMENT 'Data de cadastro do monitor' DEFAULT CURRENT_TIMESTAMP, \`guiches\` json NULL COMMENT 'Lista de guichês associados ao monitor (formato JSON)', \`Usuario_ID\` int NOT NULL COMMENT 'Identificador único do usuário', PRIMARY KEY (\`Dispositivo_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Dispositivo\` (\`ID\` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único do dispositivo', \`status\` tinyint NOT NULL COMMENT 'Status: 0 - Inativo, 1 - Ativo' DEFAULT '1', \`tipo\` int(1) NOT NULL COMMENT 'Tipo: 1 - Web, 2 - Desktop, 3 - Portátil', \`identificacao\` varchar(45) NOT NULL COMMENT 'Chave hash que identifica o dispositivo', \`Usuario_ID\` int NULL COMMENT 'Identificador único do usuário', \`Cidadao_ID\` int NULL COMMENT 'Identificador único do cidadão', PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`LoginCidadao\` (\`Cidadao_ID\` int NOT NULL COMMENT 'ID do cidadão vinculado ao login', \`CPF\` varchar(32) NOT NULL COMMENT 'CPF formatado (ex: 123.456.789-09)', \`senha\` varchar(32) NOT NULL COMMENT 'Senha criptografada. Valor padrão: ''Default''' DEFAULT 'Default', UNIQUE INDEX \`IDX_ad6ab152d16e2dbb8806db2af1\` (\`CPF\`), PRIMARY KEY (\`Cidadao_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Cidadao\` (\`ID\` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único do cidadão', \`nome\` text NOT NULL COMMENT 'Nome completo do cidadão', \`status\` tinyint NOT NULL COMMENT 'Status: 0 - Inativo, 1 - Ativo' DEFAULT '1', \`cidade\` text NULL COMMENT 'Cidade de residência do cidadão', \`telefone\` text NULL COMMENT 'Telefones do cidadão, separados por ponto e vírgula', \`email\` text NULL COMMENT 'Endereço de email do cidadão', \`auth0\` text NULL COMMENT 'Dados de autenticação via Google ou Facebook (formato JSON)', \`dataHoraCadastro\` timestamp NOT NULL COMMENT 'Data e hora do cadastro do cidadão' DEFAULT CURRENT_TIMESTAMP, \`prioridade\` int NULL COMMENT 'Prioridade no atendimento: 1 - Idoso, 2 - Patologia', \`dataNascimento\` date NULL COMMENT 'Data de nascimento do cidadão', \`ultimoAcesso\` timestamp NULL COMMENT 'Último acesso do cidadão ao sistema' DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Cidade\` (\`ID\` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único da cidade', \`status\` tinyint NOT NULL COMMENT 'Status: 0 - Inativa, 1 - Ativa' DEFAULT '1', \`nome\` text NOT NULL COMMENT 'Nome da cidade', \`estado\` text NOT NULL COMMENT 'Nome do estado onde a cidade está localizada', PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`SubAgregado\` (\`ID\` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único do sub-agregador', \`status\` tinyint NOT NULL COMMENT 'Status: 0 - Desativado, 1 - Ativado' DEFAULT '1', \`nome\` text NOT NULL COMMENT 'Nome do sub-agregador de serviços', \`Agregador_ID\` int NOT NULL COMMENT 'Identificador único do agregador', PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Agregador\` (\`ID\` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único do agregador', \`status\` tinyint NOT NULL COMMENT 'Status: 0 - Desativado, 1 - Ativado' DEFAULT '1', \`nome\` varchar(45) NOT NULL COMMENT 'Nome do agregador de serviços', PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Rotulo\` (\`ID\` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único do rótulo', \`status\` tinyint NOT NULL COMMENT 'Status: 0 - Inativo, 1 - Ativo' DEFAULT '1', \`rotulo\` varchar(255) NOT NULL COMMENT 'Rótulo com o título do pré-requisito para padronização de conteúdos', PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Requisito\` (\`ID\` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único do pré-requisito', \`status\` tinyint NOT NULL COMMENT 'Status: 0 - Indisponível, 1 - Disponível' DEFAULT '1', \`conteudo\` text NOT NULL COMMENT 'Conteúdo do pré-requisito em HTML', \`Conteudo_ID\` int NOT NULL COMMENT 'Identificador único do conteúdo', \`Rotulo_ID\` int NOT NULL COMMENT 'Identificador único do rótulo', PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Conteudo\` (\`ID\` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único do conteúdo', \`status\` tinyint NOT NULL COMMENT 'Status: 0 - Indisponível, 1 - Disponível' DEFAULT '1', \`descricao\` text NOT NULL COMMENT 'Descrição detalhada do serviço em HTML', \`Servico_ID\` int NOT NULL COMMENT 'Identificador único do serviço', \`Local_ID\` int NOT NULL COMMENT 'Identificador único do local', PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Guiche\` (\`ID\` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único do guichê', \`status\` tinyint NOT NULL COMMENT 'Status: 0 - Indisponível, 1 - Disponível' DEFAULT '1', \`numero\` int(3) NOT NULL COMMENT 'Número do guichê (formato 000)', \`Local_ID\` int NOT NULL COMMENT 'Identificador único do local', \`Usuario_ID\` int NOT NULL COMMENT 'Identificador único do usuário', PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Local\` (\`ID\` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único do local', \`status\` tinyint NOT NULL COMMENT 'Status: 0 - Desativado, 1 - Ativado' DEFAULT '1', \`endereco\` text NULL COMMENT 'Endereço completo do local de atendimento', \`linkMaps\` text NULL COMMENT 'Link do Google Maps com a localização exata', \`telefone\` text NULL COMMENT 'Telefones do local, separados por ponto e vírgula', \`CEP\` varchar(15) NULL COMMENT 'CEP do local de atendimento', \`Orgao_ID\` int NOT NULL COMMENT 'Identificador único do órgão', \`Cidade_ID\` int NOT NULL COMMENT 'Identificador único da cidade', \`Agregador_ID\` int NULL COMMENT 'Identificador único do agregador', \`SubAgregado_ID\` int NULL COMMENT 'Identificador único do sub-agregador', PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Avaliacao\` (\`Atendimento_ID\` int NOT NULL COMMENT 'ID do atendimento avaliado', \`estrelas\` int NOT NULL COMMENT 'Nota: 1 - Péssimo, 2 - Ruim, 3 - Razoável, 4 - Ótimo, 5 - Perfeito', \`comentario\` text NULL COMMENT 'Comentário do cidadão sobre o atendimento', PRIMARY KEY (\`Atendimento_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Atendimento\` (\`ID\` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único do atendimento', \`status\` int NOT NULL COMMENT 'Status: 0 - Não finalizado, 1 - Em atendimento, 2 - Finalizado, 3 - Aguardando retorno' DEFAULT '0', \`tipo\` int NOT NULL COMMENT 'Tipo: 0 - Comum, 1 - Prioridade, 2 - Retorno, 3 - Retorno com prioridade', \`senha\` varchar(9) NOT NULL COMMENT 'Senha no formato ''LLL-000''', \`dataCadastro\` timestamp NOT NULL COMMENT 'Data de solicitação do atendimento' DEFAULT CURRENT_TIMESTAMP, \`dataFinal\` timestamp NULL COMMENT 'Data de finalização do atendimento', \`Cidadao_ID\` int NOT NULL COMMENT 'Identificador único do cidadão', \`Usuario_ID\` int NULL COMMENT 'Identificador único do usuário', \`Local_ID\` int NULL COMMENT 'Identificador único do local', PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Acao\` (\`ID\` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único da ação', \`status\` int NOT NULL COMMENT 'Situação: 0 - Aguardando, 1 - Em atendimento, 2 - Finalizado, 3 - Adiado' DEFAULT '0', \`posicao\` int NOT NULL COMMENT 'Posição do serviço na fila do atendimento', \`data\` date NULL COMMENT 'Data efetiva do atendimento deste serviço', \`horaInicio\` time NULL COMMENT 'Hora de início do atendimento', \`horaFim\` time NULL COMMENT 'Hora de conclusão do atendimento', \`anotacao\` text NULL COMMENT 'Observações registradas pelo atendente', \`Guiche_ID\` int NULL COMMENT 'Identificador único do guichê', \`Atendimento_ID\` int NULL COMMENT 'Identificador único do atendimento', \`Servico_ID\` int NULL COMMENT 'Identificador único do serviço', \`Usuario_ID\` int NULL COMMENT 'Identificador único do usuário', PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Servico\` (\`ID\` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único do serviço', \`status\` tinyint NOT NULL COMMENT 'Status: 0 - Desativado, 1 - Disponível' DEFAULT '1', \`identificacao\` varchar(5) NOT NULL COMMENT 'Identificação do serviço para composição de senhas', \`titulo\` varchar(255) NOT NULL COMMENT 'Título descritivo do serviço', \`Orgao_ID\` int NOT NULL COMMENT 'Identificador único do órgão', PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Orgao\` (\`ID\` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único do órgão', \`status\` tinyint NOT NULL COMMENT 'Status: 0 - Inativo, 1 - Ativo' DEFAULT '1', \`nome\` varchar(45) NOT NULL COMMENT 'Nome do órgão no sistema', PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Auditoria\` (\`ID\` int NOT NULL AUTO_INCREMENT, \`codigo\` varchar(45) NOT NULL COMMENT 'Código do evento de auditoria', \`timestamp\` timestamp NULL COMMENT 'Data e hora do evento registrado', \`usuarioRefID\` int NOT NULL COMMENT 'Identificador único do usuário', PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`LoginUsuario\` (\`Usuario_ID\` int NOT NULL COMMENT 'ID do usuário vinculado ao login', \`usuario\` text NOT NULL COMMENT 'Nome de usuário para autenticação', \`senha\` text NOT NULL COMMENT 'Senha criptografada para segurança', PRIMARY KEY (\`Usuario_ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Usuario\` (\`ID\` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador único do usuário', \`status\` tinyint NOT NULL COMMENT 'Status do usuário: 0 - Inativo, 1 - Ativo' DEFAULT '1', \`disponibilidade\` tinyint NOT NULL COMMENT 'Disponibilidade para atendimento: 0 - Indisponível, 1 - Disponível' DEFAULT '1', \`nivel\` int NOT NULL COMMENT 'Nível de acesso: 0 - Administrador, 1 - Atendente, 2 - Editor, 3 - Supervisor, 4 - Gestor', \`nome\` varchar(45) NOT NULL COMMENT 'Nome completo do usuário', \`Orgao_ID\` int NOT NULL COMMENT 'Identificador único do órgão', PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Configuracoes\` (\`ID\` int NOT NULL, \`qtdSenhasExibidasNoMonitor\` int(2) NOT NULL COMMENT 'Quantidade de senhas exibidas no monitor de chamadas', PRIMARY KEY (\`ID\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Monitor\` ADD CONSTRAINT \`FK_34ced1e1560b9eace850e23a424\` FOREIGN KEY (\`Dispositivo_ID\`) REFERENCES \`Dispositivo\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Monitor\` ADD CONSTRAINT \`FK_88bacd5f4eade404c9f9db563f2\` FOREIGN KEY (\`Usuario_ID\`) REFERENCES \`Usuario\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` ADD CONSTRAINT \`FK_30ab90c85f6a53f6f733c5b05a3\` FOREIGN KEY (\`Usuario_ID\`) REFERENCES \`Usuario\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` ADD CONSTRAINT \`FK_818e77e86b5018e0e480353ba8a\` FOREIGN KEY (\`Cidadao_ID\`) REFERENCES \`Cidadao\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`LoginCidadao\` ADD CONSTRAINT \`FK_fb673fb22d54f1dd99298f0773f\` FOREIGN KEY (\`Cidadao_ID\`) REFERENCES \`Cidadao\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`SubAgregado\` ADD CONSTRAINT \`FK_46d9d6f67f5d0c5bf38cbd5099f\` FOREIGN KEY (\`Agregador_ID\`) REFERENCES \`Agregador\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Requisito\` ADD CONSTRAINT \`FK_153d5c9555c9e12c20a41f8075e\` FOREIGN KEY (\`Conteudo_ID\`) REFERENCES \`Conteudo\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Requisito\` ADD CONSTRAINT \`FK_fb733acbf5a893769678e192f55\` FOREIGN KEY (\`Rotulo_ID\`) REFERENCES \`Rotulo\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Conteudo\` ADD CONSTRAINT \`FK_595a32b60dae4f548fe15572791\` FOREIGN KEY (\`Servico_ID\`) REFERENCES \`Servico\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Conteudo\` ADD CONSTRAINT \`FK_291c34c971b812fd3399c25c18e\` FOREIGN KEY (\`Local_ID\`) REFERENCES \`Local\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Guiche\` ADD CONSTRAINT \`FK_c933344d00d6b16fcf1566b5a84\` FOREIGN KEY (\`Local_ID\`) REFERENCES \`Local\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Guiche\` ADD CONSTRAINT \`FK_c6b5861984a164f66f44c077a11\` FOREIGN KEY (\`Usuario_ID\`) REFERENCES \`Usuario\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Local\` ADD CONSTRAINT \`FK_43868f1ccf68d30c744e665b82a\` FOREIGN KEY (\`Orgao_ID\`) REFERENCES \`Orgao\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Local\` ADD CONSTRAINT \`FK_333efabf632ebf13f53bf8299b0\` FOREIGN KEY (\`Cidade_ID\`) REFERENCES \`Cidade\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Local\` ADD CONSTRAINT \`FK_6c248ba5f55b09a1d1abf98e0a7\` FOREIGN KEY (\`Agregador_ID\`) REFERENCES \`Agregador\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Local\` ADD CONSTRAINT \`FK_ce835d1dc03811939b677a4d1f1\` FOREIGN KEY (\`SubAgregado_ID\`) REFERENCES \`SubAgregado\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Avaliacao\` ADD CONSTRAINT \`FK_d9b15735f8ff9e2510edca00bc2\` FOREIGN KEY (\`Atendimento_ID\`) REFERENCES \`Atendimento\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` ADD CONSTRAINT \`FK_94136eed977b8bc08033379c198\` FOREIGN KEY (\`Cidadao_ID\`) REFERENCES \`Cidadao\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` ADD CONSTRAINT \`FK_25a50daf6603557150f59e9ef56\` FOREIGN KEY (\`Usuario_ID\`) REFERENCES \`Usuario\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` ADD CONSTRAINT \`FK_90d296b374d2947bf494499a275\` FOREIGN KEY (\`Local_ID\`) REFERENCES \`Local\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Acao\` ADD CONSTRAINT \`FK_4a0c0eb22196d5e94570f8d67f8\` FOREIGN KEY (\`Guiche_ID\`) REFERENCES \`Guiche\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Acao\` ADD CONSTRAINT \`FK_c49578aa0e6a82d161af1a7bc6f\` FOREIGN KEY (\`Atendimento_ID\`) REFERENCES \`Atendimento\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Acao\` ADD CONSTRAINT \`FK_6f6b95908be2047467f5901a39c\` FOREIGN KEY (\`Servico_ID\`) REFERENCES \`Servico\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Acao\` ADD CONSTRAINT \`FK_81d8aaa180f951427e6f7a53c44\` FOREIGN KEY (\`Usuario_ID\`) REFERENCES \`Usuario\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Servico\` ADD CONSTRAINT \`FK_41dcbbc17f020c41b5b4d1a4e23\` FOREIGN KEY (\`Orgao_ID\`) REFERENCES \`Orgao\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Auditoria\` ADD CONSTRAINT \`FK_1f4e9039fc5f64667e4693d2742\` FOREIGN KEY (\`usuarioRefID\`) REFERENCES \`Usuario\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`LoginUsuario\` ADD CONSTRAINT \`FK_2edf88b662ccf08e1e3d23bd629\` FOREIGN KEY (\`Usuario_ID\`) REFERENCES \`Usuario\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Usuario\` ADD CONSTRAINT \`FK_ac16fdcbf57da5794c6e221b44a\` FOREIGN KEY (\`Orgao_ID\`) REFERENCES \`Orgao\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Usuario\` DROP FOREIGN KEY \`FK_ac16fdcbf57da5794c6e221b44a\``);
        await queryRunner.query(`ALTER TABLE \`LoginUsuario\` DROP FOREIGN KEY \`FK_2edf88b662ccf08e1e3d23bd629\``);
        await queryRunner.query(`ALTER TABLE \`Auditoria\` DROP FOREIGN KEY \`FK_1f4e9039fc5f64667e4693d2742\``);
        await queryRunner.query(`ALTER TABLE \`Servico\` DROP FOREIGN KEY \`FK_41dcbbc17f020c41b5b4d1a4e23\``);
        await queryRunner.query(`ALTER TABLE \`Acao\` DROP FOREIGN KEY \`FK_81d8aaa180f951427e6f7a53c44\``);
        await queryRunner.query(`ALTER TABLE \`Acao\` DROP FOREIGN KEY \`FK_6f6b95908be2047467f5901a39c\``);
        await queryRunner.query(`ALTER TABLE \`Acao\` DROP FOREIGN KEY \`FK_c49578aa0e6a82d161af1a7bc6f\``);
        await queryRunner.query(`ALTER TABLE \`Acao\` DROP FOREIGN KEY \`FK_4a0c0eb22196d5e94570f8d67f8\``);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` DROP FOREIGN KEY \`FK_90d296b374d2947bf494499a275\``);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` DROP FOREIGN KEY \`FK_25a50daf6603557150f59e9ef56\``);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` DROP FOREIGN KEY \`FK_94136eed977b8bc08033379c198\``);
        await queryRunner.query(`ALTER TABLE \`Avaliacao\` DROP FOREIGN KEY \`FK_d9b15735f8ff9e2510edca00bc2\``);
        await queryRunner.query(`ALTER TABLE \`Local\` DROP FOREIGN KEY \`FK_ce835d1dc03811939b677a4d1f1\``);
        await queryRunner.query(`ALTER TABLE \`Local\` DROP FOREIGN KEY \`FK_6c248ba5f55b09a1d1abf98e0a7\``);
        await queryRunner.query(`ALTER TABLE \`Local\` DROP FOREIGN KEY \`FK_333efabf632ebf13f53bf8299b0\``);
        await queryRunner.query(`ALTER TABLE \`Local\` DROP FOREIGN KEY \`FK_43868f1ccf68d30c744e665b82a\``);
        await queryRunner.query(`ALTER TABLE \`Guiche\` DROP FOREIGN KEY \`FK_c6b5861984a164f66f44c077a11\``);
        await queryRunner.query(`ALTER TABLE \`Guiche\` DROP FOREIGN KEY \`FK_c933344d00d6b16fcf1566b5a84\``);
        await queryRunner.query(`ALTER TABLE \`Conteudo\` DROP FOREIGN KEY \`FK_291c34c971b812fd3399c25c18e\``);
        await queryRunner.query(`ALTER TABLE \`Conteudo\` DROP FOREIGN KEY \`FK_595a32b60dae4f548fe15572791\``);
        await queryRunner.query(`ALTER TABLE \`Requisito\` DROP FOREIGN KEY \`FK_fb733acbf5a893769678e192f55\``);
        await queryRunner.query(`ALTER TABLE \`Requisito\` DROP FOREIGN KEY \`FK_153d5c9555c9e12c20a41f8075e\``);
        await queryRunner.query(`ALTER TABLE \`SubAgregado\` DROP FOREIGN KEY \`FK_46d9d6f67f5d0c5bf38cbd5099f\``);
        await queryRunner.query(`ALTER TABLE \`LoginCidadao\` DROP FOREIGN KEY \`FK_fb673fb22d54f1dd99298f0773f\``);
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` DROP FOREIGN KEY \`FK_818e77e86b5018e0e480353ba8a\``);
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` DROP FOREIGN KEY \`FK_30ab90c85f6a53f6f733c5b05a3\``);
        await queryRunner.query(`ALTER TABLE \`Monitor\` DROP FOREIGN KEY \`FK_88bacd5f4eade404c9f9db563f2\``);
        await queryRunner.query(`ALTER TABLE \`Monitor\` DROP FOREIGN KEY \`FK_34ced1e1560b9eace850e23a424\``);
        await queryRunner.query(`DROP TABLE \`Configuracoes\``);
        await queryRunner.query(`DROP TABLE \`Usuario\``);
        await queryRunner.query(`DROP TABLE \`LoginUsuario\``);
        await queryRunner.query(`DROP TABLE \`Auditoria\``);
        await queryRunner.query(`DROP TABLE \`Orgao\``);
        await queryRunner.query(`DROP TABLE \`Servico\``);
        await queryRunner.query(`DROP TABLE \`Acao\``);
        await queryRunner.query(`DROP TABLE \`Atendimento\``);
        await queryRunner.query(`DROP TABLE \`Avaliacao\``);
        await queryRunner.query(`DROP TABLE \`Local\``);
        await queryRunner.query(`DROP TABLE \`Guiche\``);
        await queryRunner.query(`DROP TABLE \`Conteudo\``);
        await queryRunner.query(`DROP TABLE \`Requisito\``);
        await queryRunner.query(`DROP TABLE \`Rotulo\``);
        await queryRunner.query(`DROP TABLE \`Agregador\``);
        await queryRunner.query(`DROP TABLE \`SubAgregado\``);
        await queryRunner.query(`DROP TABLE \`Cidade\``);
        await queryRunner.query(`DROP TABLE \`Cidadao\``);
        await queryRunner.query(`DROP INDEX \`IDX_ad6ab152d16e2dbb8806db2af1\` ON \`LoginCidadao\``);
        await queryRunner.query(`DROP TABLE \`LoginCidadao\``);
        await queryRunner.query(`DROP TABLE \`Dispositivo\``);
        await queryRunner.query(`DROP TABLE \`Monitor\``);
    }

}
