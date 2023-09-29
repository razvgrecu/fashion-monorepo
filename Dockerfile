FROM node:20-slim AS app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM app AS full-build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build

FROM app as prod-dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM app as common-package
COPY --from=prod-deps /app/packages/common/node_modules/ /app/packages/common/node_modules
COPY --from=build /app/packages/common/dist /app/packages/common/dist

FROM common-package as zoa-server
COPY --from=prod-deps /app/packages/poc-api/node_modules/ /app/packages/poc-api/node_modules
COPY --from=build /app/packages/poc-api/dist /app/packages/poc-api/dist

FROM common-package as zoa-ui
COPY --from=prod-deps /app/packages/poc-ui/node_modules/ /app/packages/poc-ui/node_modules
COPY --from=build /app/packages/poc-ui/dist /app/packages/poc-ui/dist
