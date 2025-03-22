/**
 * @file Validador de Entidades
 * @description Script para validar inicializações de arrays em relacionamentos
 */

import * as fs from 'fs';
import * as path from 'path';

interface ValidationResult {
    file: string;
    issues: string[];
}

class EntityValidator {
    private modelsPath: string;
    
    constructor() {
        this.modelsPath = path.join(__dirname, '..', 'models');
    }

    /**
     * Analisa todos os arquivos de entidade
     */
    public async validateAll(): Promise<ValidationResult[]> {
        const results: ValidationResult[] = [];
        const files = fs.readdirSync(this.modelsPath);

        for (const file of files) {
            if (file.endsWith('.ts')) {
                const content = fs.readFileSync(
                    path.join(this.modelsPath, file), 
                    'utf8'
                );
                const issues = this.validateFile(content);
                
                if (issues.length > 0) {
                    results.push({
                        file,
                        issues
                    });
                }
            }
        }

        return results;
    }

    /**
     * Valida um arquivo específico
     */
    private validateFile(content: string): string[] {
        const issues: string[] = [];
        
        // Verifica inicializações diretas de arrays
        if (content.includes('= [];')) {
            issues.push('Inicialização direta de array encontrada');
        }

        // Verifica decoradores OneToMany sem !
        const oneToManyRegex = /@OneToMany\([^)]+\)\s+\w+:\s*[^!]/g;
        if (content.match(oneToManyRegex)) {
            issues.push('Relacionamento OneToMany sem operador !');
        }

        return issues;
    }
}

export { EntityValidator };