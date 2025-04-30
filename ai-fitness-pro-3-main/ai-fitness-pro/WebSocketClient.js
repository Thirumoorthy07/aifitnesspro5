class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.connect();
  }

  connect() {
    try {
      this.ws = new WebSocket(this.url);
      
      this.ws.onclose = () => {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          console.log('WebSocket connection closed. Attempting to reconnect...');
          this.reconnectAttempts++;
          setTimeout(() => this.connect(), 2000); // Retry after 2 seconds
        } else {
          console.error('WebSocket connection failed after maximum retry attempts');
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
    }
  }
} 