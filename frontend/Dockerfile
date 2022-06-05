FROM node:16.15-alpine
WORKDIR /home/katip_front
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@5.0.0 -g

COPY . ./

CMD ["npm", "start"]

# docker build --tag katip_front .
# docker run -d -p 3000:3000 katip_front
