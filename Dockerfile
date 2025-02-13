# Build Stage 1
# This build created a staging docker image
#
FROM node:18-alpine AS appbuild
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY ./src ./tsconfig.json ./
RUN yarn run build

# Build Stage 2
# This build takes the production build from staging build
#
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --prod
COPY --from=appbuild /usr/src/app/dist ./dist


EXPOSE 8080
CMD yarn start
