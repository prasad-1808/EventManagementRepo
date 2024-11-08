# Dockerfile.server
FROM node

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server files
COPY . .

# Expose the API port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "dev"]


