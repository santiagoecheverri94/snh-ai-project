# Use Node 24 base image
FROM node:24.4.0

# Create app directory
WORKDIR /app

# Copy root package.json and package-lock.json
COPY package*.json ./

# Copy client workspace's package.json and package-lock.json for workspace install
COPY client/package*.json ./client/

RUN npm install

# Copy the rest of your code
COPY . .

# Build (if you have a build step)
RUN npm run build

# Expose the port your app uses (edit if your app uses a different port)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
