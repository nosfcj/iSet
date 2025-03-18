import { Entity } from 'typeorm';

@Entity({ 
  name: 'Configuracao',
  comment: 'Contém as configurações pertinentes ao funcionamento do sistema.'
})
export class Configuracao {
  // Aguardando definição das colunas no SQL
}