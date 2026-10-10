# Imagen base de Node, la version alpine es mas liviana
FROM node:20-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Primero copiamos solo los package*.json para aprovechar la cache de Docker
COPY package*.json ./
RUN npm install --omit=dev

# Despues copiamos el resto del codigo
COPY . .

# Puerto donde escucha la app
EXPOSE 3000

CMD ["node", "app.js"]
