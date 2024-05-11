FROM node:20-alpine3.19 as build

WORKDIR /app

COPY package*.json ./
RUN npm install 
COPY . . 
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine3.19

WORKDIR /app
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma/
COPY --from=build /app/.env  ./.env
EXPOSE 3333
CMD [  "npm", "run", "start:migrate:prod" ]
RUN npm install --only=production
