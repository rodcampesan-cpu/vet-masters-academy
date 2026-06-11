import server from "../dist/server/index.mjs";
export default async function handler(req, res) {
  try {
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const url = new URL(req.url, `${protocol}://${host}`);
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (Array.isArray(value)) {
        value.forEach(v => headers.append(key, v));
      } else if (value) {
        headers.set(key, value);
      }
    }
    const init = { method: req.method, headers };
    if (req.method !== "GET" && req.method !== "HEAD") {
      const chunks = [];
      for await (const chunk of req) { chunks.push(chunk); }
      init.body = Buffer.concat(chunks);
    }
    const request = new Request(url.href, init);
    const response = await server.fetch(request, {});
    res.statusCode = response.status;
    response.headers.forEach((value, key) => { res.setHeader(key, value); });
    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    } else {
      res.end();
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
