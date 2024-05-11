FROM node:20-alpine3.19 as build

WORKDIR /home/node/app

COPY package.json package-lock.json ./
RUN npm install 
COPY . . 
RUN npx prisma migrate deploy
RUN npm run build
RUN npm install --only=production



FROM node:20-alpine3.19

WORKDIR /home/node/app

COPY --from=build /home/node/app/package.json ./package.json
COPY --from=build /home/node/app/build ./build
COPY --from=build /home/node/app/node_modules ./node_modules
EXPOSE 3333

CMD [ "npm","run","start" ]