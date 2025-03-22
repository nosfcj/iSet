/**
 * Cache Configuration
 * @file api/src/config/cache.config.ts
 * @description Configuração do LRU Cache para otimização de performance
 * @createdBy Nosf!
 * @modifiedBy Jarvis
 */

import { LRUCache } from 'lru-cache';

const options = {
  max: 500,                    // Máximo de itens no cache
  ttl: 1000 * 60 * 5,         // Time To Live: 5 minutos
  allowStale: false,           // Não permite dados obsoletos
  updateAgeOnGet: true,        // Atualiza idade ao acessar
  updateAgeOnHas: false,       // Não atualiza idade ao verificar existência
  maxSize: 5000000,           // Tamanho máximo em bytes (5MB)
  sizeCalculation: (value: any, key: any) => {
    return JSON.stringify(value).length + JSON.stringify(key).length;
  }
};

export const cache = new LRUCache(options);