# 1. Use a lightweight Node.js base image
FROM node:20-alpine

# 2. Set working directory inside the container
WORKDIR /app

# 3. Copy dependency files first (for better caching)
COPY package*.json ./

# 4. Install only production dependencies
RUN npm ci --only=production

# 5. Copy the rest of the application code
COPY . .

# 6. Expose the port your app runs on
EXPOSE 3000

# 7. Start the app
CMD ["npm", "start"]
