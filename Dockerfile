# Install Node.js 20 for Next.js
FROM node:20

# Set up working directory for Next.js application
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies for Next.js application
RUN npm install

# Copy Next.js application files
COPY ./ .

# Build Next.js application
RUN npm run build

# Expose ports for Next.js and Nest.js applications
EXPOSE 3000

# Start PostgreSQL, Next.js, and Nest.js applications
CMD npm run start
