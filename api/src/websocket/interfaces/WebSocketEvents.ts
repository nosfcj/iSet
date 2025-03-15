export enum WebSocketEvents {
    // Eventos de Atendimento
    ATENDIMENTO_NOVO = 'atendimento:novo',
    ATENDIMENTO_ATUALIZADO = 'atendimento:atualizado',
    ATENDIMENTO_CHAMADA = 'atendimento:chamada',
    ATENDIMENTO_FINALIZADO = 'atendimento:finalizado',
  
    // Eventos de Guichê
    GUICHE_STATUS = 'guiche:status',
    GUICHE_DISPONIBILIDADE = 'guiche:disponibilidade',
  
    // Eventos de Monitor
    MONITOR_ATUALIZACAO = 'monitor:atualizacao',
    MONITOR_STATUS = 'monitor:status',
  
    // Eventos de Dispositivo
    DISPOSITIVO_CONECTADO = 'dispositivo:conectado',
    DISPOSITIVO_DESCONECTADO = 'dispositivo:desconectado',
    DISPOSITIVO_STATUS = 'dispositivo:status',
  
    // Eventos de Sistema
    SISTEMA_ERRO = 'sistema:erro',
    SISTEMA_NOTIFICACAO = 'sistema:notificacao'
  }