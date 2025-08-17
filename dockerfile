FROM node:20-alpine

WORKDIR /app

# System deps for Playwright browsers
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    bash \
    git \
    curl \
    wget \
    xvfb

COPY package*.json ./

RUN npm ci

COPY . .

# Install Playwright browsers inside the image
RUN npx playwright install --with-deps

ENV CI=true

CMD ["npx", "cucumber-js"]
