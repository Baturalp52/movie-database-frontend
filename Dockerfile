# Install Node.js 20 for Next.js
FROM node:20

ARG NEXT_PUBLIC_API_URL=http://localhost:3001
ARG NEXT_PUBLIC_CDN_URL=http://localhost:3001/uploads

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_CDN_URL=${NEXT_PUBLIC_CDN_URL}

# Set up working directory for Next.js application
WORKDIR /frontend

# Copy Next.js application files
COPY ./ .

# Install dependencies for Next.js application
RUN npm install

# Build Next.js application
RUN npm run build

# Expose ports for Next.js and Nest.js applications
EXPOSE 3000

# Start PostgreSQL, Next.js, and Nest.js applications
CMD npm run start
