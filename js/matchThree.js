const matchThree = (function(){
    let scriptQueue = [];
    let numResourcesLoaded = 0;
    let numResources = 0;
    let executeRunning = false;

    function execurtScriptQueue(){
        let next = scriptQueue[0];
        let first, script;
        if(next && next.loaded){
            executeRunning = true;
            scriptQueue.shift();
            first = document.getElementsByTagName("script")[0];
            script = document.createElement("script");
            script.onload = function(){
                if(next.callback){
                    next.callback();
                }
                executeScriptQueue
            };
            script.src = next.src;
            first.parentNode.insertBefore(script, first);
        }
        else{
            executeRunning = false;
        }
    }
    function load(src, callback){
        
        let image, queueEntry;
        numResources++;

        queueEntry = {
            src: src,
            callback: callback,
            loaded: false
        };
        scriptQueue.push(queueEntry);

        image = new Image();
        image.onload = image.onerror = function(){
            numResources++;
            queueEntry.loaded = true;
            if(!executeRunning){
                executeScriptQueue();
            }
        };
        image.src = src;
    };
    function setup(){

    };
    return{
        load: load,
        setup: setup
    };
})();