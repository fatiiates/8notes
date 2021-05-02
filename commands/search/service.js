const { workerData, parentPort, isMainThread } = require("worker_threads");
// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"
(
  async function(){
    console.log("xxxx");
await setTimeout(() => console.log("you won't see me"), 1000);
  }
)()
/*parentPort.on("message", async message => {
  if (message === "exit") {
    parentPort.postMessage("sold!");
    parentPort.close();
  } else {
    parentPort.postMessage({ going: message });
  }
  
});



parentPort.postMessage({ start: workerData, isMainThread });*/