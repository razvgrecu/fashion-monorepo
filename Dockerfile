FROM node:20-alpine3.16 AS app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY ["package.json", "pnpm-lock.yaml", "pnpm-workspace.yaml", "/app/"]
COPY ["packages", "/app/packages/"]
WORKDIR /app

FROM app AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm build

FROM app as dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile --ignore-scripts

FROM app as common-package
#COPY --from=dependencies /app/packages/common/node_modules/ /app/packages/common/node_modules
COPY --from=dependencies /app/packages/search-lens/node_modules /app/packages/search-lens/node_modules
COPY --from=build /app/packages/common/dist /app/packages/common/dist
COPY --from=build /app/packages/search-lens/dist /app/packages/search-lens/dist
COPY --from=build /app/node_modules /app/node_modules

FROM common-package as fashion-server
COPY --from=dependencies /app/packages/poc-api/node_modules/ /app/packages/poc-api/node_modules
COPY --from=build /app/packages/poc-api/dist /app/packages/poc-api/dist
EXPOSE 3000
CMD [ "pnpm", "server:start"]

#FROM common-package as zoa-ui
#COPY --from=prod-deps /app/packages/poc-ui/node_modules/ /app/packages/poc-ui/node_modules
#COPY --from=build /app/packages/poc-ui/dist /app/packages/poc-ui/dist
