# Simple TCP Server

This is a simple TCP server implemented in Rust. It listens on `127.0.0.1:7979` and serves HTML, CSS, JavaScript, and image files.

## Prerequisites

- Rust and Cargo (latest stable version)

## Running the Server

To run the server, follow these steps:

1. Clone this repository:

   ```
   git clone https://github.com/yourusername/tcp-server.git
   cd tcp-server
   ```

2. Run the server:

   ```
   cargo run
   ```

3. The server will start and listen on `127.0.0.1:7979`.

## Accessing the Server

Once the server is running, you can access it by opening a web browser and navigating to:

```
http://127.0.0.1:7979
```

## Project Structure

- `src/main.rs`: The main server code
- `html/`: Directory containing static files (HTML, CSS, JS, images)

## Features

- Single command to run (`cargo run`)
- Serves static files from the `html/` directory
- Listens on `127.0.0.1:7979`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
