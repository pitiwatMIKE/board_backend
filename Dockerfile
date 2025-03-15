FROM --platform=linux/amd64 node:22.14.0-alpine3.20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port
ENV NODE_ENV=production
EXPOSE 3001

# Command to run the application
CMD ["node", "dist/src/main"]