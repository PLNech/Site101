FROM node:18-alpine AS base

# 1. Installation des dépendances uniquement lorsqu'elles changent
FROM base AS deps
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json* ./

# Installer les dépendances
RUN npm ci

# 2. Rebuild l'application source uniquement lorsque nécessaire
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build de l'application Next.js
RUN npm run build

# 3. Image de production, copie tous les fichiers et exécute next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier le dossier public et .next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Changer le propriétaire des dossiers d'application
USER nextjs

# Exposer le port 3000
EXPOSE 3000

# Commande pour exécuter l'application
CMD ["npm", "start"]