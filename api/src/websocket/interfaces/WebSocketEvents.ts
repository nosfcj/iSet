/**
 * WebSocket Events Enum
 * @lastModified 2025-03-15 21:27:15
 * @modifiedBy nosfcj
 */
export enum WebSocketEvents {
    // Eventos de Atendimento
    ATENDIMENTO_CRIADO = 'atendimento:criado',
    ATENDIMENTO_STATUS = 'atendimento:status',

    // Eventos de Ação (Serviço)
    ACAO_CHAMADA = 'acao:chamada',
    ACAO_INICIADA = 'acao:iniciada',
    ACAO_FINALIZADA = 'acao:finalizada',
    ACAO_ADIADA = 'acao:adiada',
    
    // Eventos de Guichê
    GUICHE_STATUS = 'guiche:status',
    GUICHE_DISPONIVEL = 'guiche:disponivel',
    GUICHE_OCUPADO = 'guiche:ocupado',

    // Eventos de Monitor
    MONITOR_ATUALIZACAO = 'monitor:atualizacao',
    PAINEL_SENHA = 'painel:senha',

    // Eventos de Dispositivo
    DISPOSITIVO_CONECTADO = 'dispositivo:conectado',
    DISPOSITIVO_DESCONECTADO = 'dispositivo:desconectado',
    DISPOSITIVO_STATUS = 'dispositivo:status',
  
    // Eventos de Sistema
    SISTEMA_ERRO = 'sistema:erro',
    SISTEMA_NOTIFICACAO = 'sistema:notificacao'
}