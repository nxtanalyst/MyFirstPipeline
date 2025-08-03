# Use the official Node.js base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json .

RUN npm install

# Copy all app files
COPY . .

# Expose the app port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
