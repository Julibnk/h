`docker compose watch` for development

This binds the `api/src` folder with the container
Also binds `api/prisma/client` to maintain the prisma client always updated.
Also whatches for changes in the `/api/prisma/schema`. If this occurs rebuilds the container and regenerate prisma client 

If any changes in the schema causes data loss 
`npx prisma db push --accept-data-loss`
for forcing drop columns or tables
