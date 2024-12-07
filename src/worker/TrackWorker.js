let trackData = {
    speed: 0
};

self.addEventListener('message', function(e) {
    const { type, data } = e.data;
    
    switch(type) {
        case 'UPDATE':
            trackData = { ...trackData, ...data };
            
            console.log('Track Worker: Processing update', trackData);
            
            self.postMessage({
                type: 'UPDATED',
                data: trackData
            });
            break;
        case 'INIT':
            trackData = { ...data };
            console.log('Track Worker: Initialized', trackData);
            break;
    }
});