let obstacleData = {
    x: 0,
    y: 0,
    playerSpeed: 0,
    screenWidth: 0
};

self.addEventListener('message', function(e) {
    const { type, data } = e.data;
    
    switch(type) {
        case 'UPDATE':
            obstacleData = { ...obstacleData, ...data };
            
            obstacleData.x -= obstacleData.playerSpeed * 0.01;
            
            if (obstacleData.x < -100) {
                obstacleData.x = obstacleData.screenWidth + 100;
                obstacleData.y = Math.random() * (self.innerHeight - 100) + 50;
            }
            
            console.log('Obstacle Worker: Processing update', obstacleData);
            
            self.postMessage({
                type: 'UPDATED',
                data: obstacleData
            });
            break;
        case 'INIT':
            obstacleData = { ...data };
            console.log('Obstacle Worker: Initialized', obstacleData);
            break;
    }
});