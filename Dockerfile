FROM mcr.microsoft.com/playwright:v1.65.0-noble

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# auth.json is created at runtime by the setup project
CMD ["npx", "playwright", "test"]