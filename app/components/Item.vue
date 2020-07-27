<template lang="html">
    <Page class="page">
      <ActionBar flat="true" class="action-bar" row="2">
            <Image src="~/assets/logo.png" />
        </ActionBar>
        
        <!-- Content -->
        <ScrollView orientation="vertical" scrollBarIndicatorVisible="false" class="content">
          <!-- Item -->
          <StackLayout class="item">
            <!-- Item name -->
            <FlexboxLayout flexDirection="row" class="section title">
              <FlexboxLayout class="avatar">
                <Image :src="getAvatar('022-summer')" />
              </FlexboxLayout>
              <FlexboxLayout flexDirection="column">
                <Label :text="item.name" class="name" />
                <Label text="Auctioned by Bobby Boy" class="seller" />
              </FlexboxLayout>
            </FlexboxLayout>

            <!-- Item image -->
            <FlexboxLayout flexDirection="row" class="section img">
              <Image :src="getImg(item.img)" />
            </FlexboxLayout>

            <!-- Highest bid -->
            <FlexboxLayout flexDirection="column" class="section current-bid">
              <Label text="Current Highest Bid" class="label" />
              <Label text="$130" class="bid" />
              <FlexboxLayout class="bidder">
                <Image :src="getAvatar('022-summer')" />
                <Label text="Stewart M." class="name" />
              </FlexboxLayout>
            </FlexboxLayout>

            <!-- Button -->
            <FlexboxLayout flexDirection="row" class="actions">
              <FlexboxLayout flexDirection="row" class="btn">
                <Label text="Place Bid" class="label" />
              </FlexboxLayout>
            </FlexboxLayout>

            <FlexboxLayout class="history">
              <Label text="Some history here" class="seller" />
            </FlexboxLayout>
          </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
// Signalr
require("nativescript-websockets");
var SignalrCore = require("nativescript-signalr-core").SignalrCore;
var signalrCore = new SignalrCore();

// Axios
const axios = require("axios");

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
      required: false
    }
  },
  data() {
    return {
      signalrCore: null
    };
  },
  methods: {
    getImg(imgName) {
      // Need to load asset in first
      var _img = require("~/assets/items/" + imgName + ".png");

      // After loading it, we can return its path to 'src'
      return "~/assets/items/" + imgName + ".png";
    },
    getAvatar(imgName) {
      // Need to load asset in first
      var _img = require("~/assets/avatars/" + imgName + ".png");

      // After loading it, we can return its path to 'src'
      return "~/assets/avatars/" + imgName + ".png";
    }
  },
  async mounted() {
    console.log("Item clicked: " + this.item.name);
  }
};
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";

.page {
  background-color: rgb(242, 242, 246);

  .content {
    background-color: #ffffff;
    font-family: "TT Norms";
    align-items: flex-start;
    justify-content: flex-start;
  }
}

.item {
  background-color: rgb(242, 242, 246);

  .title {
    width: 100%;
    height: 7%;
    background-color: white;
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
    height: 50%;
    // background-color: white;
    align-items: center;
    justify-content: center;

    image {
      width: auto;
      height: 50%;
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
      font-size: 17px;
    }

    .bid {
      font-size: 25px;
      font-weight: 500;
      color: rgb(46, 46, 46);
    }

    .bidder {
      font-size: 15px;
      color: rgb(82, 82, 82);
      align-items: center;
      justify-content: center;
      background-color: rgb(231, 231, 231);
      border-radius: 15px;
      padding: 10px 45px 10px 45px;
      margin-top: 30px;

      image {
        height: 50px;
        margin-right: 20px;
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
    font-family: "TT Norms";

    .btn:active {
      background-color: blue;
    }
  }
}

.history {
  width: 100%;
  height: 750px;
  background-color: white;
  margin-top: 90px;
  margin-bottom: 90px;
}
</style>
