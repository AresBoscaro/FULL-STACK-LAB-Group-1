# pull Immagine Node (ULTIMA VERSIONE) in Alpine
FROM node:alpine

# Impostazione directory di lavoro
WORKDIR /app

# Copia risorse ed installazione dipendenze

COPY . .

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent


# Avviamento webapp
CMD ["npm", "start"]

# Espone la webapp sulla porta 3000
EXPOSE 3000