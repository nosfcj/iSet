import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDispositivoRotuloNotNull1741391069606 implements MigrationInterface {
    name = 'FixDispositivoRotuloNotNull1741391069606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` ADD \`rotulo\` varchar(45) NOT NULL COMMENT 'Rótulo que identifica o dispositivo'`);
        await queryRunner.query(`ALTER TABLE \`Monitor\` CHANGE \`rotulo\` \`rotulo\` varchar(255) NULL COMMENT 'Rótulo para identificação do monitor'`);
        await queryRunner.query(`ALTER TABLE \`Monitor\` CHANGE \`dataCadastro\` \`dataCadastro\` timestamp NULL COMMENT 'Data de cadastro do monitor' DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`Monitor\` DROP COLUMN \`guiches\``);
        await queryRunner.query(`ALTER TABLE \`Monitor\` ADD \`guiches\` json NULL COMMENT 'Lista de guichês associados ao monitor (formato JSON)'`);
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` DROP FOREIGN KEY \`FK_30ab90c85f6a53f6f733c5b05a3\``);
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` DROP FOREIGN KEY \`FK_818e77e86b5018e0e480353ba8a\``);
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` CHANGE \`Usuario_ID\` \`Usuario_ID\` int NULL COMMENT 'Identificador único do usuário'`);
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` CHANGE \`Cidadao_ID\` \`Cidadao_ID\` int NULL COMMENT 'Identificador único do cidadão'`);
        await queryRunner.query(`ALTER TABLE \`Cidadao\` CHANGE \`cidade\` \`cidade\` text NULL COMMENT 'Cidade de residência do cidadão'`);
        await queryRunner.query(`ALTER TABLE \`Cidadao\` CHANGE \`telefone\` \`telefone\` text NULL COMMENT 'Telefones do cidadão, separados por ponto e vírgula'`);
        await queryRunner.query(`ALTER TABLE \`Cidadao\` CHANGE \`email\` \`email\` text NULL COMMENT 'Endereço de email do cidadão'`);
        await queryRunner.query(`ALTER TABLE \`Cidadao\` CHANGE \`auth0\` \`auth0\` text NULL COMMENT 'Dados de autenticação via Google ou Facebook (formato JSON)'`);
        await queryRunner.query(`ALTER TABLE \`Cidadao\` CHANGE \`dataHoraCadastro\` \`dataHoraCadastro\` timestamp NOT NULL COMMENT 'Data e hora do cadastro do cidadão' DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`Cidadao\` CHANGE \`prioridade\` \`prioridade\` int NULL COMMENT 'Prioridade no atendimento: 1 - Idoso, 2 - Patologia'`);
        await queryRunner.query(`ALTER TABLE \`Cidadao\` CHANGE \`dataNascimento\` \`dataNascimento\` date NULL COMMENT 'Data de nascimento do cidadão'`);
        await queryRunner.query(`ALTER TABLE \`Cidadao\` CHANGE \`ultimoAcesso\` \`ultimoAcesso\` timestamp NULL COMMENT 'Último acesso do cidadão ao sistema' DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`Local\` DROP FOREIGN KEY \`FK_6c248ba5f55b09a1d1abf98e0a7\``);
        await queryRunner.query(`ALTER TABLE \`Local\` DROP FOREIGN KEY \`FK_ce835d1dc03811939b677a4d1f1\``);
        await queryRunner.query(`ALTER TABLE \`Local\` CHANGE \`endereco\` \`endereco\` text NULL COMMENT 'Endereço completo do local de atendimento'`);
        await queryRunner.query(`ALTER TABLE \`Local\` CHANGE \`linkMaps\` \`linkMaps\` text NULL COMMENT 'Link do Google Maps com a localização exata'`);
        await queryRunner.query(`ALTER TABLE \`Local\` CHANGE \`telefone\` \`telefone\` text NULL COMMENT 'Telefones do local, separados por ponto e vírgula'`);
        await queryRunner.query(`ALTER TABLE \`Local\` CHANGE \`CEP\` \`CEP\` varchar(15) NULL COMMENT 'CEP do local de atendimento'`);
        await queryRunner.query(`ALTER TABLE \`Local\` CHANGE \`Agregador_ID\` \`Agregador_ID\` int NULL COMMENT 'Identificador único do agregador'`);
        await queryRunner.query(`ALTER TABLE \`Local\` CHANGE \`SubAgregado_ID\` \`SubAgregado_ID\` int NULL COMMENT 'Identificador único do sub-agregador'`);
        await queryRunner.query(`ALTER TABLE \`Avaliacao\` CHANGE \`comentario\` \`comentario\` text NULL COMMENT 'Comentário do cidadão sobre o atendimento'`);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` DROP FOREIGN KEY \`FK_25a50daf6603557150f59e9ef56\``);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` DROP FOREIGN KEY \`FK_90d296b374d2947bf494499a275\``);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` CHANGE \`dataCadastro\` \`dataCadastro\` timestamp NOT NULL COMMENT 'Data de solicitação do atendimento' DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` CHANGE \`dataFinal\` \`dataFinal\` timestamp NULL COMMENT 'Data de finalização do atendimento'`);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` CHANGE \`Usuario_ID\` \`Usuario_ID\` int NULL COMMENT 'Identificador único do usuário'`);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` CHANGE \`Local_ID\` \`Local_ID\` int NULL COMMENT 'Identificador único do local'`);
        await queryRunner.query(`ALTER TABLE \`Acao\` DROP FOREIGN KEY \`FK_4a0c0eb22196d5e94570f8d67f8\``);
        await queryRunner.query(`ALTER TABLE \`Acao\` DROP FOREIGN KEY \`FK_c49578aa0e6a82d161af1a7bc6f\``);
        await queryRunner.query(`ALTER TABLE \`Acao\` DROP FOREIGN KEY \`FK_6f6b95908be2047467f5901a39c\``);
        await queryRunner.query(`ALTER TABLE \`Acao\` CHANGE \`data\` \`data\` date NULL COMMENT 'Data efetiva do atendimento deste serviço'`);
        await queryRunner.query(`ALTER TABLE \`Acao\` CHANGE \`horaInicio\` \`horaInicio\` time NULL COMMENT 'Hora de início do atendimento'`);
        await queryRunner.query(`ALTER TABLE \`Acao\` CHANGE \`horaFim\` \`horaFim\` time NULL COMMENT 'Hora de conclusão do atendimento'`);
        await queryRunner.query(`ALTER TABLE \`Acao\` CHANGE \`anotacao\` \`anotacao\` text NULL COMMENT 'Observações registradas pelo atendente'`);
        await queryRunner.query(`ALTER TABLE \`Acao\` CHANGE \`Guiche_ID\` \`Guiche_ID\` int NULL COMMENT 'Identificador único do guichê'`);
        await queryRunner.query(`ALTER TABLE \`Acao\` CHANGE \`Atendimento_ID\` \`Atendimento_ID\` int NULL COMMENT 'Identificador único do atendimento'`);
        await queryRunner.query(`ALTER TABLE \`Acao\` CHANGE \`Servico_ID\` \`Servico_ID\` int NULL COMMENT 'Identificador único do serviço'`);
        await queryRunner.query(`ALTER TABLE \`Auditoria\` CHANGE \`timestamp\` \`timestamp\` timestamp NULL COMMENT 'Data e hora do evento registrado'`);
        await queryRunner.query(`ALTER TABLE \`Usuario\` CHANGE \`nivel\` \`nivel\` int NOT NULL COMMENT 'Nível de acesso: 0 - Cidadão, 1 - Administrador, 2 - Atendente, 3 - Supervisor, 4 - Editor, 5 - Gestor'`);
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` ADD CONSTRAINT \`FK_30ab90c85f6a53f6f733c5b05a3\` FOREIGN KEY (\`Usuario_ID\`) REFERENCES \`Usuario\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` ADD CONSTRAINT \`FK_818e77e86b5018e0e480353ba8a\` FOREIGN KEY (\`Cidadao_ID\`) REFERENCES \`Cidadao\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Local\` ADD CONSTRAINT \`FK_6c248ba5f55b09a1d1abf98e0a7\` FOREIGN KEY (\`Agregador_ID\`) REFERENCES \`Agregador\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Local\` ADD CONSTRAINT \`FK_ce835d1dc03811939b677a4d1f1\` FOREIGN KEY (\`SubAgregado_ID\`) REFERENCES \`SubAgregado\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` ADD CONSTRAINT \`FK_25a50daf6603557150f59e9ef56\` FOREIGN KEY (\`Usuario_ID\`) REFERENCES \`Usuario\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` ADD CONSTRAINT \`FK_90d296b374d2947bf494499a275\` FOREIGN KEY (\`Local_ID\`) REFERENCES \`Local\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Acao\` ADD CONSTRAINT \`FK_4a0c0eb22196d5e94570f8d67f8\` FOREIGN KEY (\`Guiche_ID\`) REFERENCES \`Guiche\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Acao\` ADD CONSTRAINT \`FK_c49578aa0e6a82d161af1a7bc6f\` FOREIGN KEY (\`Atendimento_ID\`) REFERENCES \`Atendimento\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Acao\` ADD CONSTRAINT \`FK_6f6b95908be2047467f5901a39c\` FOREIGN KEY (\`Servico_ID\`) REFERENCES \`Servico\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Acao\` DROP FOREIGN KEY \`FK_6f6b95908be2047467f5901a39c\``);
        await queryRunner.query(`ALTER TABLE \`Acao\` DROP FOREIGN KEY \`FK_c49578aa0e6a82d161af1a7bc6f\``);
        await queryRunner.query(`ALTER TABLE \`Acao\` DROP FOREIGN KEY \`FK_4a0c0eb22196d5e94570f8d67f8\``);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` DROP FOREIGN KEY \`FK_90d296b374d2947bf494499a275\``);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` DROP FOREIGN KEY \`FK_25a50daf6603557150f59e9ef56\``);
        await queryRunner.query(`ALTER TABLE \`Local\` DROP FOREIGN KEY \`FK_ce835d1dc03811939b677a4d1f1\``);
        await queryRunner.query(`ALTER TABLE \`Local\` DROP FOREIGN KEY \`FK_6c248ba5f55b09a1d1abf98e0a7\``);
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` DROP FOREIGN KEY \`FK_818e77e86b5018e0e480353ba8a\``);
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` DROP FOREIGN KEY \`FK_30ab90c85f6a53f6f733c5b05a3\``);
        await queryRunner.query(`ALTER TABLE \`Usuario\` CHANGE \`nivel\` \`nivel\` int NOT NULL COMMENT 'Nível de acesso: 0 - Administrador, 1 - Atendente, 2 - Editor, 3 - Supervisor, 4 - Gestor'`);
        await queryRunner.query(`ALTER TABLE \`Auditoria\` CHANGE \`timestamp\` \`timestamp\` timestamp NULL COMMENT 'Data e hora do evento registrado' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Acao\` CHANGE \`Servico_ID\` \`Servico_ID\` int NULL COMMENT 'Identificador único do serviço' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Acao\` CHANGE \`Atendimento_ID\` \`Atendimento_ID\` int NULL COMMENT 'Identificador único do atendimento' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Acao\` CHANGE \`Guiche_ID\` \`Guiche_ID\` int NULL COMMENT 'Identificador único do guichê' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Acao\` CHANGE \`anotacao\` \`anotacao\` text NULL COMMENT 'Observações registradas pelo atendente' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Acao\` CHANGE \`horaFim\` \`horaFim\` time NULL COMMENT 'Hora de conclusão do atendimento' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Acao\` CHANGE \`horaInicio\` \`horaInicio\` time NULL COMMENT 'Hora de início do atendimento' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Acao\` CHANGE \`data\` \`data\` date NULL COMMENT 'Data efetiva do atendimento deste serviço' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Acao\` ADD CONSTRAINT \`FK_6f6b95908be2047467f5901a39c\` FOREIGN KEY (\`Servico_ID\`) REFERENCES \`Servico\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Acao\` ADD CONSTRAINT \`FK_c49578aa0e6a82d161af1a7bc6f\` FOREIGN KEY (\`Atendimento_ID\`) REFERENCES \`Atendimento\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Acao\` ADD CONSTRAINT \`FK_4a0c0eb22196d5e94570f8d67f8\` FOREIGN KEY (\`Guiche_ID\`) REFERENCES \`Guiche\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` CHANGE \`Local_ID\` \`Local_ID\` int NULL COMMENT 'Identificador único do local' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` CHANGE \`Usuario_ID\` \`Usuario_ID\` int NULL COMMENT 'Identificador único do usuário' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` CHANGE \`dataFinal\` \`dataFinal\` timestamp NULL COMMENT 'Data de finalização do atendimento' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` CHANGE \`dataCadastro\` \`dataCadastro\` timestamp NOT NULL COMMENT 'Data de solicitação do atendimento' DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` ADD CONSTRAINT \`FK_90d296b374d2947bf494499a275\` FOREIGN KEY (\`Local_ID\`) REFERENCES \`Local\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Atendimento\` ADD CONSTRAINT \`FK_25a50daf6603557150f59e9ef56\` FOREIGN KEY (\`Usuario_ID\`) REFERENCES \`Usuario\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Avaliacao\` CHANGE \`comentario\` \`comentario\` text NULL COMMENT 'Comentário do cidadão sobre o atendimento' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Local\` CHANGE \`SubAgregado_ID\` \`SubAgregado_ID\` int NULL COMMENT 'Identificador único do sub-agregador' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Local\` CHANGE \`Agregador_ID\` \`Agregador_ID\` int NULL COMMENT 'Identificador único do agregador' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Local\` CHANGE \`CEP\` \`CEP\` varchar(15) NULL COMMENT 'CEP do local de atendimento' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Local\` CHANGE \`telefone\` \`telefone\` text NULL COMMENT 'Telefones do local, separados por ponto e vírgula' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Local\` CHANGE \`linkMaps\` \`linkMaps\` text NULL COMMENT 'Link do Google Maps com a localização exata' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Local\` CHANGE \`endereco\` \`endereco\` text NULL COMMENT 'Endereço completo do local de atendimento' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Local\` ADD CONSTRAINT \`FK_ce835d1dc03811939b677a4d1f1\` FOREIGN KEY (\`SubAgregado_ID\`) REFERENCES \`SubAgregado\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Local\` ADD CONSTRAINT \`FK_6c248ba5f55b09a1d1abf98e0a7\` FOREIGN KEY (\`Agregador_ID\`) REFERENCES \`Agregador\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Cidadao\` CHANGE \`ultimoAcesso\` \`ultimoAcesso\` timestamp NULL COMMENT 'Último acesso do cidadão ao sistema' DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`Cidadao\` CHANGE \`dataNascimento\` \`dataNascimento\` date NULL COMMENT 'Data de nascimento do cidadão' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Cidadao\` CHANGE \`prioridade\` \`prioridade\` int NULL COMMENT 'Prioridade no atendimento: 1 - Idoso, 2 - Patologia' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Cidadao\` CHANGE \`dataHoraCadastro\` \`dataHoraCadastro\` timestamp NOT NULL COMMENT 'Data e hora do cadastro do cidadão' DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`Cidadao\` CHANGE \`auth0\` \`auth0\` text NULL COMMENT 'Dados de autenticação via Google ou Facebook (formato JSON)' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Cidadao\` CHANGE \`email\` \`email\` text NULL COMMENT 'Endereço de email do cidadão' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Cidadao\` CHANGE \`telefone\` \`telefone\` text NULL COMMENT 'Telefones do cidadão, separados por ponto e vírgula' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Cidadao\` CHANGE \`cidade\` \`cidade\` text NULL COMMENT 'Cidade de residência do cidadão' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` CHANGE \`Cidadao_ID\` \`Cidadao_ID\` int NULL COMMENT 'Identificador único do cidadão' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` CHANGE \`Usuario_ID\` \`Usuario_ID\` int NULL COMMENT 'Identificador único do usuário' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` ADD CONSTRAINT \`FK_818e77e86b5018e0e480353ba8a\` FOREIGN KEY (\`Cidadao_ID\`) REFERENCES \`Cidadao\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` ADD CONSTRAINT \`FK_30ab90c85f6a53f6f733c5b05a3\` FOREIGN KEY (\`Usuario_ID\`) REFERENCES \`Usuario\`(\`ID\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Monitor\` DROP COLUMN \`guiches\``);
        await queryRunner.query(`ALTER TABLE \`Monitor\` ADD \`guiches\` longtext COLLATE "utf8mb4_bin" NULL COMMENT 'Lista de guichês associados ao monitor (formato JSON)' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Monitor\` CHANGE \`dataCadastro\` \`dataCadastro\` timestamp NULL COMMENT 'Data de cadastro do monitor' DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`Monitor\` CHANGE \`rotulo\` \`rotulo\` varchar(255) NULL COMMENT 'Rótulo para identificação do monitor' DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Dispositivo\` DROP COLUMN \`rotulo\``);
    }

}
