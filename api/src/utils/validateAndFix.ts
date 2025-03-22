/**
 * @file Validação e Correção
 * @description Script principal para validar e corrigir entidades
 */

import { EntityValidator } from './validateEntities';
import { EntityFixer } from './fixEntities';

async function main() {
    const validator = new EntityValidator();
    const fixer = new EntityFixer();

    console.log('Iniciando validação...');
    const results = await validator.validateAll();

    if (results.length > 0) {
        console.log('Problemas encontrados:');
        console.table(results);

        console.log('Iniciando correções...');
        await fixer.fixAll();
        
        console.log('Verificando correções...');
        const newResults = await validator.validateAll();
        
        if (newResults.length === 0) {
            console.log('Todas as correções foram aplicadas com sucesso!');
        } else {
            console.log('Alguns problemas persistem:');
            console.table(newResults);
        }
    } else {
        console.log('Nenhum problema encontrado!');
    }
}

main().catch(console.error);