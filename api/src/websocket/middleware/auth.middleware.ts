import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import jwt from 'jsonwebtoken';

// Interface para o payload do token JWT
interface TokenPayload {
  id: number;
  login: string;
  tipo: string;
  iat?: number;
  exp?: number;
}

// Interface para socket com dados do usuário
export interface AuthenticatedSocket extends Socket {
  user?: {
    id: number;
    login: string;
    tipo: string;
  };
}

export const authMiddleware = (
  socket: AuthenticatedSocket,
  next: (err?: ExtendedError) => void
) => {
  try {
    // Obtém o token do handshake
    const token = socket.handshake.auth.token || socket.handshake.headers['authorization'];

    if (!token) {
      return next(new Error('Token de autenticação não fornecido'));
    }

    // Remove o prefixo 'Bearer ' se existir
    const tokenString = token.replace('Bearer ', '');

    // Verifica o token
    const decoded = jwt.verify(
      tokenString,
      process.env.JWT_SECRET || 'sua_chave_secreta'
    ) as TokenPayload;

    // Adiciona os dados do usuário ao socket
    socket.user = {
      id: decoded.id,
      login: decoded.login,
      tipo: decoded.tipo
    };

    // Log de autenticação bem-sucedida
    console.log(`WebSocket autenticado - Usuário: ${decoded.login} (${decoded.tipo}) - ${new Date().toISOString()}`);

    next();
  } catch (error) {
    // Log do erro de autenticação
    console.error('Erro na autenticação do WebSocket:', error);
    
    return next(new Error('Token de autenticação inválido'));
  }
};

// Middleware para verificação de permissões
export const checkPermission = (requiredType: string[] = []) => {
  return (socket: AuthenticatedSocket, next: (err?: ExtendedError) => void) => {
    if (!socket.user) {
      return next(new Error('Usuário não autenticado'));
    }

    if (requiredType.length > 0 && !requiredType.includes(socket.user.tipo)) {
      return next(new Error('Usuário não tem permissão para esta operação'));
    }

    next();
  };
};