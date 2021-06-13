# bitfinex-order-book
A simple react app to visualize bitfinex's order book in both chart and tabular format.

# Setup Instructions:
1. Clone the repository using 'git clone <repository path>'
2. Install necessary packages using 'npm install'
2. Start application using 'npm start'

# Concepts used:
1. d3.js for chart visualization
2. redux for state management
2. WebSocket for realtime communication

# Configuration:
Below are the configuration settings available in order book. The settings can be changed in configuration interface which can be accessed by clicking ⚙ icon.

1. Tabular column order:
    Default:
    Bids -> Count Amount Total Price
    Asks -> Price Total Amount Count
    
    Other options:
    1. Bids -> Count Price Amount Total
       Asks -> Total Amount Price Count

    2. Bids -> Count Total Price Amount
       Asks -> Amount Price Total Count
2. Chart visualization:
   Default: Cumulative (Total)
   Other option: Amount