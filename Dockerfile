FROM node:11.13.0
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY  . .
CMD ["npm", "run", "start"]