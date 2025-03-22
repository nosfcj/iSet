/**
 * Cache Manager
 * @file api/src/utils/cacheManager.ts
 * @description Gerenciador de cache para otimização de performance
 * @createdBy Nosf!
 * @modifiedBy Jarvis
 */

import { cache } from '../config/cache.config';

export class CacheManager {
  /**
   * Obtém valor do cache ou executa função se não existir
   * @param key Chave do cache
   * @param fn Função a ser executada se não houver cache
   */
  public static async getOrSet<T>(
    key: string, 
    fn: () => Promise<T>
  ): Promise<T> {
    const cached = cache.get(key);
    if (cached) return cached as T;

    const value = await fn();
    cache.set(key, value);
    return value;
  }

  /**
   * Invalida uma chave específica do cache
   * @param key Chave a ser invalidada
   */
  public static invalidate(key: string): void {
    cache.delete(key);
  }
}