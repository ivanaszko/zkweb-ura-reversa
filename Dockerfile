FROM node:18-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia arquivos do backend e frontend
COPY backend ./backend
COPY frontend ./frontend
COPY package*.json ./

# Instala dependências
RUN npm install

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "backend/server.js"]
