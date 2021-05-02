const { Worker, isMainThread, parentPort } = require('worker_threads');

const MESSAGE_COUNT = 10;

function main() {
    
  if (isMainThread){ 
        const worker = new Worker(__filename);
        
        worker.on('message', (message) => {
            console.log('worker response', message);
        });

        worker.on("exit", (message) => {
            console.log(2);//runService();
        });
        var array = Array.from(Array(100).keys())
        worker.postMessage(array.length);
        worker.postMessage(array);
       /* for (let i = 0; i < 1; i++) 
            worker.postMessage('message ' + parseInt(i));
        setTimeout(() => {
            array.push(Array.from(Array(100).keys()));worker.postMessage(array);
            worker.postMessage("exit");
        }, 3000);*/
        
        
    }
    else {
        let sayi = 0;
        let array = [];
        parentPort.on('message', (message) => {
            
            if (message == 'exit') 
                parentPort.unref();
            else
                array.push(message);
            console.log('worker: message from main', array);   
            //parentPort.postMessage('response to:' + message);
        });
    }
};

/*async function runService() {
    
    const worker = new Worker(__filename);
    
    worker.on('message', (message) => {
      console.log('worker response', message);
    });

    worker.on("exit", (message) => {
        console.log(2);//runService();
    });
    for (let i = 0; i < 1; i++) 
      worker.postMessage('message ' + parseInt(i));

    worker.postMessage("exit");
    
}*/
if(!isMainThread)
    main()
module.exports = main