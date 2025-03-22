/**
 * @file index.ts
 * @description Script principal para execução da validação e correção
 */

import { EntityValidator } from './validation/EntityValidator';
import { EntityFixer } from './correction/EntityFixer';

async function main() {
    const validator = new EntityValidator();
    const fixer = new EntityFixer();
    
    try {
        // Validação inicial
        console.log('🚀 Iniciando processo de validação e correção...\n');
        const resultadosIniciais = await validator.validarEntidades();
        
        if (resultadosIniciais.length > 0) {
            console.log('📊 Problemas encontrados:');
            console.table(resultadosIniciais);
            
            // Aplicar correções
            await fixer.corrigirEntidades();
            
            // Validação final
            const resultadosFinais = await validator.validarEntidades();
            
            if (resultadosFinais.length === 0) {
                console.log('\n✨ Todas as entidades foram corrigidas com sucesso!');
            } else {
                console.log('\n⚠️ Alguns problemas persistem. Verificação manual necessária.');
            }
        } else {
            console.log('✅ Nenhum problema encontrado nas entidades!');
        }
    } catch (erro) {
        console.error('❌ Erro durante o processo:', erro);
        process.exit(1);
    }
}

main();