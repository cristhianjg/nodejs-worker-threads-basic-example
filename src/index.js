import express from "express";
import { Worker } from "node:worker_threads";

const app = express();

const port = 3010;

app.get("/normal", (req, res) => {
  const tick = performance.now();

  res.status(200).send("Normal");

  const tock = performance.now();

  console.log(
    `Normal took ${Math.trunc(tock - tick) / 1000} seconds to execute`
  );
});

app.get("/slow-non-blocking", (req, res) => {
  const worker = new Worker("./src/counter.js");

  worker.on("message", (data) => {
    res.status(200).send("Slow non-blocking count: " + data);
  });

  worker.on("error", (error) => {
    res.status(400).send(error);
  });
});

app.get("/slow-blocking", (req, res) => {
  let count = 0;

  const tick = performance.now();

  for (let i = 0; i < 20_000_000_000; i++) {
    count++;
  }

  const tock = performance.now();

  console.log("Final count: ", count);
  console.log(
    `Count took ${Math.trunc(tock - tick) / 1000} seconds to execute`
  );

  res.status(200).send("Slow blocking count: " + count);
});

app.listen(port, () => {
  console.log("Server listening on port ", port);
});
