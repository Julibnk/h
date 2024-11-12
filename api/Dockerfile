# NOTE: Base image for all stges

FROM node:lts as api-base

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including Fastify
RUN npm install

# Copy the rest of the application files
COPY . .

# Adjust prima database
RUN npx prisma generate

# NOTE: Local development image 

FROM api-base as api-dev

# Expose port (or whichever port your Fastify app uses)
EXPOSE 4512

# Start the Fastify application
CMD ["npm", "run", "dev"]

# NOTE: Production stage
FROM api-base as api-prod

ENV NODE_ENV=production

RUN npm run build

EXPOSE 4512
CMD ["npm","start"]
