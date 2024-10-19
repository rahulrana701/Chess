FROM node

WORKDIR /chessgame

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

COPY . .

RUN npx prisma generate


CMD ["sh", "-c", "(npx prisma migrate deploy && npm run dev)"]

EXPOSE 3000

