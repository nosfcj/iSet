# Instruções para o Copilot (Jarvis)

## 1. Padrão de Cabeçalho
```typescript
/**
 * Nome da Entidade
 * @file caminho/completo/do/arquivo
 * @lastModified YYYY-MM-DD HH:mm:ss
 * @createdBy Nosf!
 * @modifiedBy Jarvis
 * @description Descrição detalhada do propósito da entidade
 */
```

## 2. Regras de Documentação

### 2.1 Enums
```typescript
/**
 * Enum para definir os tipos de status
 */
export enum Status {
    INATIVO = 0,  // Descrição do status
    ATIVO = 1     // Descrição do status
}
```

### 2.2 Propriedades
```typescript
@Column({
    type: "tipo_sql",
    comment: "Descrição detalhada do campo"
})
propriedade: tipo;
```

### 2.3 Relacionamentos
```typescript
/**
 * Relacionamento com a entidade X
 */
@ManyToOne(() => Entidade)
@JoinColumn({ name: "ID_entidade" })
entidade!: Entidade;
```

## 3. Regras Críticas

### 3.1 Banco de Dados
- Consultar `/home/nosfcj/iSet/Documentacao/iSet-017.sql`
- Proibido modificar estrutura sem autorização
- Manter consistência com o modelo existente

### 3.2 Regras de Negócio
- Consultar `/home/nosfcj/iSet/Documentacao/Regra de negócio para Interface de Triagem de Atendimento.txt`
- Priorizar processamento no cliente
- Salvar no banco apenas dados finalizados

### 3.3 TypeORM
- Evitar inicialização direta de arrays
- Usar `!` para propriedades obrigatórias
- Validar dados antes de persistir

## 4. Performance

### 4.1 Prioridades
- Minimizar requisições à API
- Reduzir tráfego de rede
- Processar no cliente quando possível

### 4.2 Validações
- Validar dados no cliente
- Confirmar consistência antes de salvar
- Tratar erros adequadamente

## 5. Checklist de Implementação

### Antes de Codificar:
- [ ] Verificou documentação do banco?
- [ ] Consultou regras de negócio?
- [ ] Confirmou estrutura da entidade?

### Durante a Codificação:
- [ ] Aplicou padrão de cabeçalho?
- [ ] Documentou adequadamente?
- [ ] Seguiu padrões TypeORM?
- [ ] Priorizou performance?

### Após Implementação:
- [ ] Removeu inicializações diretas?
- [ ] Validou relacionamentos?
- [ ] Verificou consistência?
- [ ] Atualizou documentação?