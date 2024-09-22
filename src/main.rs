use std::{
    fs,
    io::{prelude::*, BufReader},
    net::{TcpListener, TcpStream},
    path::Path,
};
use tcp_server::ThreadPool;

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7979").unwrap();
    println!("Listening on 127.0.0.1:7979");

    let pool = ThreadPool::new(4);

    for steam in listener.incoming() {
        let stream: TcpStream = steam.unwrap();
        pool.execute(|| handle_connection(stream));
    }

    println!("Shutting down.");
}
fn handle_connection(mut stream: TcpStream) {
    let buf_reader = BufReader::new(&mut stream);
    let request_line = buf_reader.lines().next().unwrap().unwrap();
    let base_path = String::from("html");

    let (status_line, filename) = match &request_line[..] {
        "GET / HTTP/1.1" => ("HTTP/1.1 200 OK", format!("{}/index.html", base_path)),
        req if req.starts_with("GET") && req.contains("HTTP/1.1") => {
            let requested_file = &req[4..req.find("HTTP/1.1").unwrap() - 1];
            let full_path = format!("{}{}", base_path, requested_file);

            if Path::new(&full_path).exists() {
                ("HTTP/1.1 200 OK", full_path)
            } else {
                ("HTTP/1.1 404 NOT FOUND", format!("{}/404.html", base_path))
            }
        }
        _ => (
            "HTTP/1.1 400 BAD REQUEST",
            format!("{}/400.html", base_path),
        ),
    };

    let content_type = match &filename {
        f if f.ends_with(".html") => "text/html",
        f if f.ends_with(".js") => "application/javascript",
        f if f.ends_with(".css") => "text/css",
        _ => "application/octet-stream",
    };

    let contents = fs::read(&filename).unwrap_or_else(|_| Vec::new());
    let length = contents.len();

    let response = format!(
        "{status_line}\r\nContent-Length: {length}\r\nContent-Type: {content_type}\r\n\r\n"
    );

    stream.write_all(response.as_bytes()).unwrap();
    stream.write_all(&contents).unwrap();
}
