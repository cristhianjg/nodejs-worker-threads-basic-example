import { parentPort } from "worker_threads";

const tick = performance.now();

let count = 0;

for (let i = 0; i < 20_000_000_000; i++) {
  count++;
}

const tock = performance.now();

console.log("Final count: ", count);
console.log(`Count took ${Math.trunc(tock - tick) / 1000} seconds to execute`);

parentPort.postMessage(count);
