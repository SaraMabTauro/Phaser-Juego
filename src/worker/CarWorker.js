let playerData = {
    x: 0,
    y: 0,
    speed: 0
};

self.addEventListener('message', function(e) {
    const { type, data } = e.data;
    
    switch(type) {
        case 'UPDATE':
            playerData = { ...playerData, ...data };
            

            playerData.x += playerData.speed * 0.01;
            
            console.log('Car Worker: Processing update', playerData);
            
            self.postMessage({
                type: 'UPDATED',
                data: playerData
            });
            break;
        case 'INIT':
            playerData = { ...data };
            console.log('Car Worker: Initialized', playerData);
            break;
    }
});