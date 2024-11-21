# Use the official Node.js 20 image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the correct application port
EXPOSE 4000

# Command to run the application
CMD ["node", "server.js"]
