FROM node:18-alpine

# Create app directory
WORKDIR /app
# Install yarn
# RUN npm install -g yarn
# Copy package.json and package-lock.json
COPY package.json yarn.lock ./
# Install app dependencies
RUN yarn install
COPY . .
EXPOSE 8080
CMD ["yarn","dev"]