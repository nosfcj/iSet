import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ 
  name: 'Configuracoes',
  comment: 'Configurações globais do sistema' 
})
export class Configuracoes {
  @PrimaryColumn({
    type: 'int',
    width: 2,
    comment: 'Quantidade de senhas exibidas nos monitores',
  })
  qtdSenhasExibidasNoMonitor!: number; // Forçando PK mesmo sem AUTO_INCREMENT
}