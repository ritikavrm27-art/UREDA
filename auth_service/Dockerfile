FROM golang:1.26

WORKDIR /app

# 🔥 Fix network issue
ENV GOPROXY=https://goproxy.cn,direct
ENV GOSUMDB=off

# Copy go files first (cache optimization)
COPY go.mod go.sum ./
RUN go mod download

# Copy rest of the code
COPY . .

RUN go build -o main ./cmd

EXPOSE 8002

CMD ["./main"]