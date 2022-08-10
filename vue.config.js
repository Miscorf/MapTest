module.exports = {
    devServer: {
        proxy: {
            '/socket.io': {
                
                target: 'http://localhost:9088',
                ws: true,
                changeOrigin: true
            },
            
        }
    }
}