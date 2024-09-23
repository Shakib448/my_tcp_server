ARG RUST_VERSION=1.80.1
ARG APP_NAME=tcp_server

FROM rust:${RUST_VERSION}-alpine AS build
ARG APP_NAME
WORKDIR /app

RUN apk add --no-cache clang lld musl-dev git
COPY html /app/html

RUN --mount=type=bind,source=src,target=src \
    --mount=type=bind,source=Cargo.toml,target=Cargo.toml \
    --mount=type=bind,source=Cargo.lock,target=Cargo.lock \
    --mount=type=cache,target=/app/target/ \
    cargo build --locked --release && \
    cp ./target/release/$APP_NAME /app/server 

FROM alpine:3.18 AS release

ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

USER appuser

COPY --from=build  /app/server /app/server
COPY --from=build  /app/html /app/html

ENV HOSTNAME "0.0.0.0"

EXPOSE 7979

CMD ["/app/server"]





