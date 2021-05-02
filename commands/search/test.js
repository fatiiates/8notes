
const { Worker, MessageChannel, isMainThread } = require("worker_threads");

async function runService(workerData) {
  
  const worker = new Worker("./service.js", { workerData, test: 'a' });
  
  /*worker.postMessage("once");
  
  worker.on("message", incoming => worker.postMessage("exit"));
  worker.on("error", code => new Error(`Worker error with exit code ${code}`));
  worker.on("exit", code =>
    console.log(`Worker stopped with exit code ${code}`)
  );
  worker.postMessage("twice");
  worker.postMessage("three times");
  worker.postMessage("exit");
  console.log(111);
  setTimeout(() => worker.postMessage("you won't see me"), 100);*/
}

async function run() {
  const result = runService("let's begin");
  const result2 = runService("await");
  console.log({ isMainThread });
}

(async function name(params) {
  console.log("test");
  run().catch(err => console.error(err));  

  for (let i = 0; i < 10; i++) {
    console.log("test"+i);
    
  }
})()
