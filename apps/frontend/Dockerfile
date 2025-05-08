# # #
# STAGE 1

# Setup a stage to install the necessary packages
# and build the project using the turbo monorepo tool.

FROM node:lts-alpine AS base

RUN apk update

RUN apk add --no-cache libc6-compat

RUN npm install -g turbo@^2

# Set the project slug to be used
# as the directory source for the build files.

ENV PROJECT=frontend

# Set the working directory to /app
# and make the full repository available to the build step.
# Use the turbo prune command to extract only the unnecessary
# files from the current project and its dependencies.

WORKDIR /app

COPY package.json ./

COPY . .

RUN turbo prune --scope=@carrismetropolitana/website-${PROJECT} --docker

# Copy the pruned files to the out directory
# and install the necessary packages with npm.

# COPY /app/out/json/ .

# COPY /app/out/package-lock.json ./package-lock.json

RUN npm ci

# Actually build the project
# using the turbo monorepo tool.

# COPY /app/out/full/ .

RUN turbo run build --filter=@carrismetropolitana/website-${PROJECT}

RUN ls -la /app/out


# # # # # # # # #


# PHASE 3
# Setup the final Docker image with only the required files.

FROM node:lts-alpine

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=base --chown=nextjs:nodejs /app/out/apps/${PROJECT}/public ./apps/${PROJECT}/public
COPY --from=base --chown=nextjs:nodejs /app/out/apps/${PROJECT}/.next/standalone ./
COPY --from=base --chown=nextjs:nodejs /app/out/apps/${PROJECT}/.next/static ./apps/${PROJECT}/.next/static

CMD node /app/apps/${PROJECT}/server.js
