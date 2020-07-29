// Import to use signalr
require('nativescript-websockets')
var SignalrCore = require('nativescript-signalr-core').SignalrCore

// Create plugin
export default {
  install(Vue) {
    // console.log('Attempting connection to hub..');
    var connection = new SignalrCore()
    connection
      .start(`${Vue.prototype.$http.defaults.baseURL}/question-hub`)
      .then(isConnected => {
        console.log('Connected to items hub.')
      })
      .catch(error => {
        console.log('Connection error')
        console.log(error)
      });

    connection.close(() => {
      console.log('connection to hub closed')
    })

    // use new Vue instance as an event bus
    const itemHub = new Vue()

    // every component will use this.$itemHub to access the event bus
    Vue.prototype.$itemHub = itemHub

    // Forward server side SignalR events through $itemHub, where components will listen to them
    connection.on('ItemBidChange', (itemId, bid) => {
      itemHub.$emit('bid-changed', { itemId, bid })
    })

    // Subscriptions
    connection.on('BidPlaced', bid => {
      itemHub.$emit('bid-placed', bid.arguments[0])
    })

    // Handle groups
    itemHub.itemOpened = (itemId) => {
      return connection.invoke('JoinItemGroup', itemId)
    }
    itemHub.itemClosed = (itemId) => {
      return connection.invoke('LeaveItemGroup', itemId)
    }
  }
}