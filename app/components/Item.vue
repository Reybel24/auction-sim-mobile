<template lang='html'>
    <Page class='page'>
      <ActionBar flat='true' class='action-bar' row='2'>
          <Image src='~/assets/logo.png' />
      </ActionBar>
        
      <!-- Content -->
      <ScrollView orientation='vertical' scrollBarIndicatorVisible='false' class='content'>
        <!-- Item -->
        <StackLayout class='item' v-if="item != null">
          <FlexboxLayout class='section main' flexDirection='column'>
            <!-- Item name -->
            <FlexboxLayout flexDirection='row' class='title'>
              <FlexboxLayout class='avatar'>
                <Image :src='getAvatar(`022-summer`)' />
              </FlexboxLayout>
              <FlexboxLayout flexDirection='column'>
                <Label :text='item.name' class='name' />
                <Label text='Auctioned by Bobby Boy' class='seller' />
              </FlexboxLayout>
            </FlexboxLayout>

            <!-- Item image -->
            <FlexboxLayout flexDirection='row' class='img'>
              <Image :src='getImg(item.img)' />
            </FlexboxLayout>

            <!-- Highest bid -->
            <FlexboxLayout flexDirection='column' class='current-bid'>
              <Label text='CURRENT HIGHEST BID' class='label' />
              <Label :text='"$" + item.highestBid' class='bid' />
              <FlexboxLayout class='timer'>
                <Label :text='timeLeft + " left"' class='time-left' />
              </FlexboxLayout>
            </FlexboxLayout>

            <!-- Button -->
            <FlexboxLayout flexDirection='row' class='actions'>
              <FlexboxLayout flexDirection='row' class='btn' @tap="openBidModal">
                <Label text='Place Bid' class='label' />
              </FlexboxLayout>
            </FlexboxLayout>
          </FlexboxLayout>

          <FlexboxLayout class='section bids-group'>
            <Label text='Bids' class='head' />
            <FlexboxLayout class="bid grow" v-for="(bid, index) in itemBids" :key="index">
              <Image :src='getAvatar("022-summer")' />
              <Label :text='"bid"' class='label' />
              <Label :text='"$" + bid.amount' class='value' />
              <Label :text='"just now"' class='time' />
            </FlexboxLayout>
          </FlexboxLayout>

          <FlexboxLayout class='notice'>
            <Label text='All data is updated in real-time' />
          </FlexboxLayout>
        </StackLayout>
      </ScrollView>
    </Page>
</template>

<script>
import Vue from 'vue';
var moment = require('moment');

// Routes (temporarily here)
import routes from '../routes';

export default {
  props: {
    itemId: {
      type: String,
      default: null,
      required: true
    }
  },
  data() {
    return {
      item: null,
      minBid: null,
      isBidding: false,
      inputBid: 15
    };
  },
  methods: {
    getImg(imgName) {
      // Need to load asset in first
      var _img = require('~/assets/items/' + imgName + '.png');

      // After loading it, we can return its path to 'src'
      return '~/assets/items/' + imgName + '.png';
    },
    getAvatar(imgName) {
      // Need to load asset in first
      var _img = require('~/assets/avatars/' + imgName + '.png');

      // After loading it, we can return its path to 'src'
      return '~/assets/avatars/' + imgName + '.png';
    },
    onScoreChanged({ questionId, score }) {
      console.log('item changed');
    },
    openBidModal() {
      // Navigate to item page
      this.$navigateTo(routes['placeBid'], {
        props: { itemId: this.itemId, minBid: this.minBid },
        transition: {
          name: 'slideTop',
          duration: 200
        }
      });
    },
    onBidPlaced(bid) {
      // Insert the new bid into this item's bids
      if (this.item == null) return;
      this.item.bids.push(bid);
      this.item.highestBid = bid.amount;

      // Fetch new minimum bid
      this.getMinimumBid();
    },
    updateTimeLeft() {
      this.item.timeLeft -= 1;
    },
    getMinimumBid() {
      this.$http
        .get(`/api/auction-items/` + this.itemId + '/bid/minimum')
        .then(res => {
          this.minBid = res.data.minimum;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    itemBids: function() {
      // Show last 5 bids
      var bids = this.item.bids.slice(-4);
      return bids.reverse();
    },
    timeLeft: function() {
      return moment({})
        .seconds(this.item.timeLeft)
        .format('H:mm:ss');
    }
  },
  mounted() {
    // console.log('Item clicked: ' + this.item.name);
  },
  created() {
    // Load the item and notify the server we are watching this item
    this.$http
      .get(`/api/auction-items/` + this.itemId)
      .then(res => {
        console.log('recieved item data');
        this.item = res.data;

        // Set timer countdown
        setInterval(() => {
          this.updateTimeLeft();
        }, 1000);

        // Subscribe to changes to this specific item (joins item group)
        return this.$itemHub.itemOpened(this.item.id);
      })
      .catch(error => {
        console.log('something went wrong');
        console.log(error);
      });

      // Get minimum bid as well
      this.getMinimumBid();

    // Listen for incoming bids
    this.$itemHub.$on('bid-placed', this.onBidPlaced);
  },
  beforeDestroy() {
    // Unsubscribe from changes to this specific item
    this.$itemHub.itemClosed(this.item.id);
    this.$itemHub.$off('bid-placed', this.onBidPlaced);
  }
};
</script>

<style lang='scss' scoped>
// Start custom common variables
@import '~@nativescript/theme/scss/variables/blue';

.page {
  background-color: rgb(242, 242, 246);

  .content {
    background-color: #ffffff;
    font-family: 'TT Norms';
    align-items: flex-start;
    justify-content: flex-start;
  }
}

.section {
  border-bottom-width: 5px;
  border-color: rgb(231, 231, 231);
}

.item {
  background-color: rgb(242, 242, 246);

  .title {
    width: 100%;
    height: 7%;
    background-color: rgb(253, 253, 253);
    font-size: 23px;
    padding: 60px 0 70px 70px;
    color: rgb(54, 54, 54);

    .avatar {
      width: 10%;
      margin-right: 60px;

      image {
        width: 100%;
      }
    }

    .name {
      font-size: 18px;
      font-weight: 500;
    }

    .seller {
      font-size: 13px;
      margin-top: -17px;
    }
  }

  .img {
    background-color: white;
    width: 100%;
    height: 90%;
    // background-color: white;
    align-items: center;
    justify-content: center;
    padding-top: 50px;

    image {
      width: auto;
      height: 100%;
      width: 50%;
    }
  }

  .current-bid {
    background-color: white;
    padding: 100px 0 60px 0;
    width: 100%;
    color: rgb(34, 34, 34);
    align-items: center;

    .label {
      font-size: 15px;
      color: rgb(88, 88, 88);
    }

    .bid {
      font-size: 25px;
      font-weight: 500;
      color: rgb(46, 46, 46);
    }

    .timer {
      font-size: 15px;
      color: rgb(82, 82, 82);
      align-items: center;
      justify-content: center;
      background-color: rgb(236, 236, 236);
      border-radius: 60px;
      padding: 10px 45px 10px 45px;
      margin-top: 30px;

      image {
        height: 50px;
        margin-right: 20px;
      }

      .time-left {
      }
    }
  }
}

.actions {
  width: 100%;
  background-color: white;
  align-items: center;
  justify-content: center;
  padding: 40px 0 100px;

  .btn {
    width: 70%;
    height: 170px;
    border-radius: 13px;
    color: white;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    background-color: #ff596f;
    font-family: 'TT Norms';
    font-weight: 500;

    &:pressed {
      background-color: blue;
    }
  }
}

.bids-group {
  width: 100%;
  background-color: white;
  margin-top: 80px;
  margin-bottom: 0px;
  flex-direction: column;
  padding: 30px 0 0 0;

  .head {
    font-size: 22px;
    color: rgb(109, 109, 109);
    font-weight: 500;
    padding: 0 0 20px 50px;
  }

  .bid {
    color: rgb(77, 77, 77);
    font-size: 16px;
    width: 90%;
    padding: 50px 15px 50px 75px;
    background-color: white;
    margin-bottom: 0px;
    align-items: center;
    border-bottom-width: 2px;
    border-color: rgb(231, 231, 231);
    animation-name: grow;
    animation-duration: 250ms;

    @keyframes grow {
      0% {
        transform: scale(0.08, 1);
        opacity: 0;
      }
      100% {
        transform: scale(1, 1);
        opacity: 1;
      }
    }

    image {
      height: 70px;
      margin-right: 28px;
    }

    .label {
    }

    .value {
      margin-left: 22px;
      border-radius: 12px;
      background-color: rgb(236, 236, 236);
      padding: 11px 22px 11px 22px;
      font-weight: 500;
    }

    .time {
      margin-left: 22px;
    }
  }
}

.notice {
  background-color: transparent;
  width: 100%;
  padding: 50px;
  font-size: 15px;
  color: rgb(161, 161, 161);
  text-align: center;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  font-style: italic;
}
</style>
