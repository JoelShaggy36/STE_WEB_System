import http from "node:http";
import { URL } from "node:url";

const port = Number(process.env.PORT ?? 3012);

function json(res, statusCode, body) {
  const payload = JSON.stringify(body);
  res.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(payload),
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "access-control-allow-headers": "content-type,authorization"
  });
  res.end(payload);
}

const server = http.createServer((req, res) => {
  if (!req.url) return json(res, 400, { error: "missing url" });

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "access-control-allow-headers": "content-type,authorization"
    });
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "GET" && url.pathname === "/api/health") {
    return json(res, 200, { ok: true, time: new Date().toISOString() });
  }

  return json(res, 404, { error: "not found" });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Backend escuchando en http://127.0.0.1:${port}`);
});
