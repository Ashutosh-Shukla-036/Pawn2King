# Use the official Node.js image with Alpine Linux for a small image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Install dependencies required for building the app (e.g., git, etc.)
RUN apk add --no-cache git

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install --legacy-peer-deps

# Copy the rest of the application code into the container
COPY . .

# Compile the TypeScript code (using the local tsc)
RUN npm run build

# Generate Prisma client (if applicable)
RUN npx prisma generate

# Expose the required port (if applicable)
EXPOSE 5432

# Command to run the app (e.g., `npm start`)
CMD ["npm", "start"]
