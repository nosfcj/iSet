/**
 * @file Corretor de Entidades
 * @description Script para corrigir inicializações de arrays em relacionamentos
 */

import * as fs from 'fs';
import * as path from 'path';

class EntityFixer {
    private modelsPath: string;
    
    constructor() {
        this.modelsPath = path.join(__dirname, '..', 'models');
    }

    /**
     * Corrige todas as entidades
     */
    public async fixAll(): Promise<void> {
        const files = fs.readdirSync(this.modelsPath);

        for (const file of files) {
            if (file.endsWith('.ts')) {
                await this.fixFile(file);
            }
        }
    }

    /**
     * Corrige um arquivo específico
     */
    private async fixFile(fileName: string): Promise<void> {
        const filePath = path.join(this.modelsPath, fileName);
        let content = fs.readFileSync(filePath, 'utf8');

        // Remove inicializações diretas de arrays
        content = content.replace(/:\s*\w+\[\]\s*=\s*\[\];/g, '!: $1[];');

        // Adiciona ! em relacionamentos OneToMany
        content = content.replace(
            /@OneToMany\([^)]+\)\s+(\w+):\s*([^!]\w+)\[\];/g,
            '@OneToMany($1) $2!: $3[];'
        );

        fs.writeFileSync(filePath, content);
    }
}

export { EntityFixer };