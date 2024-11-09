FROM node:lts 

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including Fastify
RUN npm install

# Copy the rest of the application files
COPY . .

# These can be overridden at runtime
ENV PORT=${PORT}
ENV HOST=${HOST}
ENV NODE_ENV=${NODE_ENV}
ENV LOG_LEVEL=${LOG_LEVEL}
ENV CORS=${CORS}

# ENV PORT=${PORT}
# Expose port (or whichever port your Fastify app uses)
EXPOSE $PORT

# Start the Fastify application
CMD ["npm", "run", "dev"]
