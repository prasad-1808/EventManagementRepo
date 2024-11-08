# Dockerfile.client (Development)
FROM node

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client files
COPY . .

# Expose the port for the development server
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]
