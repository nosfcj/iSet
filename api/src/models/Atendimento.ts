import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Cidadao } from './Cidadao';
import { Usuario } from './Usuario';
import { Local } from './Local';
import { Acao } from './Acao';
import { Avaliacao } from './Avaliacao';

@Entity({ 
  name: 'Atendimento',
  comment: 'Essa tabela contém informações de um atendimento gerado para oferecer um ou mais serviços ao cidadão. Pode ser inserido por um atendente de triagem ou cidadão pelo app do Protocolo Cidadão.'
})
export class Atendimento {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'int',
    default: 0,
    nullable: false,
    comment: 'Status do atendimento que define o estado do atendimento dos serviços: 0 - Não finalizado, 1 - em atendimento, 2 - finalizado, 3 - aguardando retorno de atendimento adiado para outra data.'
  })
  status!: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: 'Define qual a prioridade na fila do atendimento. 0 - comum, 1 - prioridade, 2 - retorno. Quanto maior for o tipo, maior celeridade no atendimento. Quanto mais velho for o cidadão marcado como status 1, maior prioridade na fila de atendimento do tipo 1.'
  })
  tipo!: number;

  @Column({
    type: 'varchar',
    length: 11,
    nullable: false,
    comment: 'Senha do atendimento, no formato \'LLLLL-NNNNN\', onde a letras (llll) serão coletadas no nome do serviço e a numero relativo à ordem de cadastro de atendimento na fila.'
  })
  senha!: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    comment: 'Data em que o atendimento foi solicitado.'
  })
  dataCadastro!: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
    comment: 'Data em que o serviço foi finalizado.'
  })
  dataFinal!: Date | null;

  // Relação com Cidadao
  @ManyToOne(() => Cidadao, (cidadao) => cidadao.atendimentos)
  @JoinColumn({ name: 'Cidadao_ID' })
  cidadao!: Cidadao;

  // Relação com Usuario (opcional)
  @ManyToOne(() => Usuario, (usuario) => usuario.atendimentos)
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario | null;

  // Relação com Local (opcional)
  @ManyToOne(() => Local, (local) => local.atendimentos)
  @JoinColumn({ name: 'Local_ID' })
  local!: Local | null;

  // Relação com Acao
  @OneToMany(() => Acao, (acao) => acao.atendimento)
  acoes!: Acao[];

  // Relação com Avaliacao
  @OneToOne(() => Avaliacao, (avaliacao) => avaliacao.atendimento)
  avaliacao!: Avaliacao;
}