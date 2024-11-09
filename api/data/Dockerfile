
# Use the official PostgreSQL image from Docker Hub
FROM postgres:latest

# Set environment variables for PostgreSQL
# These can be overridden at runtime
ENV POSTGRES_DB=${POSTGRES_DB}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

# Copy any additional scripts or SQL files to the container
# These will run during container startup
# COPY ./init.sql /docker-entrypoint-initdb.d/

# Expose PostgreSQL port
EXPOSE 5432

# Optional: Set custom configuration (if needed)
# COPY ./custom-postgresql.conf /etc/postgresql/postgresql.conf
# RUN echo "include '/etc/postgresql/postgresql.conf'" >> /usr/share/postgresql/postgresql.conf.sample

# Start PostgreSQL server (already handled by entrypoint in base image)
CMD ["postgres"]
