<template lang="html">
    <Page class="page">
      <!-- Action bar with logo -->
        <ActionBar flat="true" class="action-bar" row="2">
            <Image src="~/assets/logo.png" />
        </ActionBar>

        <!-- Content -->
        <ScrollView orientation="vertical" scrollBarIndicatorVisible="false" class="content">
          <StackLayout>
            <!-- Header -->
            <Label text="Browse Listings" class="head" />
            
            <!-- Categories -->
            <ScrollView orientation="horizontal" class="category-group" scrollBarIndicatorVisible="false">
              <StackLayout orientation="horizontal">
                  <StackLayout orientation="vertical" class="item" v-for="(cat, index) in categories" :key="index" @tap="tapCategory(cat)">
                      <Image :src="getImg(cat.img)" />
                      <Label :text="cat.name" /> 
                  </StackLayout>
              </StackLayout>
            </ScrollView>

            <!-- Filters -->
            <ScrollView orientation="horizontal" class="filter-group" scrollBarIndicatorVisible="false">
              <StackLayout orientation="horizontal">
                  <FlexboxLayout orientation="vertical" class="item" v-for="(filter, index) in filters" :key="index" @tap="tapFilter(filter)">
                      <Label :text="String.fromCharCode('0x' + filter.icon)" class="fas icon" v-if="'icon' in filter" :style="{ color: ('iconColor' in filter) ? filter.iconColor : '#414141' }" />
                      <Label :text="filter.name" /> 
                  </FlexboxLayout>
              </StackLayout>
            </ScrollView>

            <!-- Items list -->
            <StackLayout class="item-group">
                <FlexboxLayout class="itemy" v-for="(item, index) in items" :key="index"> 
                  <FlexboxLayout class="left">
                    <Image :src="getImg(item.img)" />
                  </FlexboxLayout>
                  <FlexboxLayout class="right">
                    <FlexboxLayout class="top">
                      <FlexboxLayout class="seller">
                        <Image src="~/assets/avatars/022-summer.png" class="avatar" />
                        <Label :text="getSellerById(item.sellerId).name" class="name" />
                      </FlexboxLayout>
                      <Label :text="item.name" class="name" />
                      <FlexboxLayout class="bid">
                        <Image src="~/assets/icons/money-bill.png" class="icon" />
                        <Label :text="item.highestBid" class="bid" />
                        <Label text="00" class="small" />
                      </FlexboxLayout>
                    </FlexboxLayout>
                    <FlexboxLayout class="bottom">
                      <FlexboxLayout class="details">
                        <Label :text="item.numBids + ' bids'" class="bids" />
                        <Label text="04:39" class="time" />
                      </FlexboxLayout>
                      <Button text="View" @tap="goToItem(item)" class="btn-view" />
                    </FlexboxLayout>
                  </FlexboxLayout>
                </FlexboxLayout>
              </StackLayout>
            
          </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
// Routes (temporarily here)
import routes from '../routes';

// Util
import { guid_to_base64 } from '@/util/common.js';

export default {
  data() {
    return {
      io: null,
      message: '<!-- Browse page content goes here -->',
      itemsOld: [
        {
          id: 0,
          name: 'Laundry Machine',
          img: 'laundry_0',
          sellerId: 5,
          highestBid: 57,
          numBids: 14,
          exp: '07-09-2020:10:08:37',
          tags: ['home', 'utility']
        },
        {
          id: 0,
          name: 'Red Comfy Sofa',
          img: 'sofa_0',
          sellerId: 7,
          highestBid: 109,
          numBids: 21,
          exp: '07-09-2020:10:08:37',
          tags: ['furniture', 'living room']
        },
        {
          id: 0,
          name: 'Ikeo Garden Plant',
          img: 'vase_plant_0',
          sellerId: 2,
          highestBid: 68,
          numBids: 29,
          exp: '07-09-2020:10:08:37',
          tags: ['home', 'furniture', 'decoration']
        },
        {
          id: 0,
          name: 'Oak Shelf',
          img: 'shelf_0',
          sellerId: 5,
          highestBid: 57,
          numBids: 14,
          exp: '07-09-2020:10:08:37',
          tags: ['home', 'utility']
        },
        {
          id: 0,
          name: 'Samsong Smart Fridge',
          img: 'fridge_0',
          sellerId: 2,
          highestBid: 605,
          numBids: 29,
          exp: '07-09-2020:10:08:37',
          tags: ['home', 'furniture', 'decoration']
        },
        {
          id: 0,
          name: 'Wooden Wardrobe',
          img: 'wardrobe_0',
          sellerId: 7,
          highestBid: 109,
          numBids: 21,
          exp: '07-09-2020:10:08:37',
          tags: ['furniture', 'living room']
        },
        {
          id: 0,
          name: 'Laundry Machine',
          img: 'laundry_0',
          sellerId: 5,
          highestBid: 57,
          numBids: 14,
          exp: '07-09-2020:10:08:37',
          tags: ['home', 'utility']
        },
        {
          id: 0,
          name: 'Red Comfy Sofa',
          img: 'sofa_0',
          sellerId: 7,
          highestBid: 109,
          numBids: 21,
          exp: '07-09-2020:10:08:37',
          tags: ['furniture', 'living room']
        },
        {
          id: 0,
          name: 'Ikeo Garden Plant',
          img: 'vase_plant_0',
          sellerId: 2,
          highestBid: 68,
          numBids: 29,
          exp: '07-09-2020:10:08:37',
          tags: ['home', 'furniture', 'decoration']
        },
        {
          id: 0,
          name: 'Laundry Machine',
          img: 'laundry_0',
          sellerId: 5,
          highestBid: 57,
          numBids: 14,
          exp: '07-09-2020:10:08:37',
          tags: ['home', 'utility']
        },
        {
          id: 0,
          name: 'Red Comfy Sofa',
          img: 'sofa_0',
          sellerId: 7,
          highestBid: 109,
          numBids: 21,
          exp: '07-09-2020:10:08:37',
          tags: ['furniture', 'living room']
        },
        {
          id: 0,
          name: 'Ikeo Garden Plant',
          img: 'vase_plant_0',
          sellerId: 2,
          highestBid: 68,
          numBids: 29,
          exp: '07-09-2020:10:08:37',
          tags: ['home', 'furniture', 'decoration']
        }
      ],
      items: [],
      categories: [
        { name: 'Technology', img: 'stove_0' },
        { name: 'Office', img: 'office_chair_0' },
        { name: 'Food', img: 'salad' },
        { name: 'Decoration', img: 'vase_plant_0' },
        { name: 'Bedroom', img: 'bunk_beds_0' },
        { name: 'Furniture', img: 'office_chair_0' },
        { name: 'Decoration', img: 'office_chair_0' },
        { name: 'Food', img: 'office_chair_0' }
      ],
      filters: [
        {
          name: 'Expiring Soon',
          key: 'exp_soon',
          icon: 'f252',
          iconColor: '#15aabf'
        },
        {
          name: 'Under 100',
          key: 'under_one_hundred',
          icon: 'f53a',
          iconColor: '#15aabf'
        },
        { name: 'Hot', key: 'hot', icon: 'f06d', iconColor: '#e38749' }
      ],
      sellers: [
        { id: 2, name: 'Steve Rogers' },
        { id: 5, name: 'Tony Stark' },
        { id: 7, name: 'Bruce Banners' }
      ],
      signalrCore: null
    };
  },
  methods: {
    getImg(imgName) {
      // Need to load asset in first
      var _img = require('~/assets/items/' + imgName + '.png');

      // After loading it, we can return its path to 'src'
      return '~/assets/items/' + imgName + '.png';
    },
    doSomething(item) {
      console.log('tapped ' + item.name);
      this.placeBid();
      const questionId = 'b00c58c0-df00-49ac-ae85-0a135f75e01b';

      axios
        .get(`https://localhost:5001/api/question`)
        .then(res => {
          console.log('got question data!');
        })
        .catch(error => {
          console.log('something went wrong getting the question');
          console.log(error);
        });

      axios
        .patch(`https://localhost:5001/api/question/${this.questionId}/upvote`)
        .then(res => {
          console.log('upvoted!');
        });
    },
    getSellerById(sellerId) {
      for (var seller of this.sellers) {
        if (seller.id == sellerId) {
          return seller;
        }
      }
      return -1;
    },
    tapCategory(cat) {
      console.log('showing ' + cat.name);
    },
    tapFilter(filter) {
      console.log('Filtering by: ' + filter.name);
    },
    async connectToSocket() {
      return new Promise(resolve => {
        // Connect to server
        this.io = new SocketIO('http://10.0.2.2:3030');
        this.io.connect();
        resolve();
      });
    },
    isConnected() {
      if (this.io != null) {
        return true;
      }
      return false;
    },
    placeBid() {
      // Check that socket is connected
      if (!this.isConnected()) return;

      console.log('placing bid...');

      var _bidDetails = { itemId: 4, amt: 8, user: 'me' };
      this.io.emit('place_bid', _bidDetails);
    },
    updateItem() {
      var rand = Math.floor(Math.random() * (35 - 3 + 1) + 3);
      this.items[1].highestBid += rand;
    },
    goToItem(item) {
      console.log('viewing an item');

      // Convert item guid to short string
      console.log(item.id);
      var idAsBase64 = guid_to_base64(item.id, true);

      // Navigate to item page
      this.$navigateTo(routes['item'], {
        props: { itemId: idAsBase64 },
        transition: {
          name: 'fade',
          duration: 200
        }
      });
    },
    fetchItems() {
      // Load items from api
      this.$http
        .get(`/api/auction-items`)
        .then(res => {
          this.items = res.data;
        })
        .catch(error => {
          console.log('something went wrong');
          console.log(error);
        });
    }
  },
  async mounted() {
    // Get items
    this.fetchItems();
  }
};
</script>

<style lang="scss" scoped>
// Start custom common variables
@import '~@nativescript/theme/scss/variables/blue';
// End custom common variables

// Custom styles
ActionBar {
  background-color: #ffffff;
  color: red;
  border-color: rgb(153, 153, 153);
  border-bottom-width: 1px;
  height: 250px;

  image {
    width: 325px;
  }
}

.content {
  background-color: #ffffff;
  font-family: 'TT Norms';

  .head {
    color: rgb(49, 49, 49);
    font-size: 17px;
    margin-left: 3%;
    margin-top: 20px;
  }

  .category-group {
    background-color: white;
    height: 230px;
    margin-top: 20px;

    .item {
      height: 100%;
      justify-content: center;
      vertical-align: center;
      text-align: center;
      background-color: white;
      color: rgb(49, 49, 49);
      font-size: 13px;
      font-weight: 500;

      image {
        object-fit: cover;
        width: 280px;
        height: 60%;
        margin-bottom: 17px;
      }
    }
  }

  .filter-group {
    background-color: white;
    height: 100px;
    margin-top: 30px;

    .item {
      height: 90%;
      border-radius: 50px;
      padding: 0px 40px 0px 40px;
      border-color: rgb(44, 44, 44);
      border-width: 1px;
      font-size: 14px;
      align-items: center;
      justify-content: center;
      margin-left: 45px;
      font-weight: 400;
      color: rgb(49, 49, 49);

      &:active {
        background-color: green;
      }

      .icon {
        font-size: 10px;
        margin-right: 20px;
      }
    }
  }

  .item-group {
    background-color: white;
    margin-top: 40px;

    .itemy {
      background-color: rgb(255, 255, 255);
      width: 100%;
      height: 510px;
      color: rgb(49, 49, 49);
      border-width: 1px;
      border-color: rgb(214, 214, 214);
      font-weight: 300;

      .left {
        margin-left: 8%;
        width: 33%;
        text-align: center;
        vertical-align: center;
        // background-color: rgb(180, 180, 180);
      }

      .right {
        margin-left: 90px;
        flex-direction: column;
        flex: 1;

        .top {
          padding-top: 13%;
          flex-direction: column;
          // background-color: rgb(82, 82, 82);
          height: 60%;

          .seller {
            margin-bottom: 0px;
            padding-bottom: 0px;

            .name {
              font-size: 11px;
            }

            .avatar {
              width: 36px;
              margin-right: 15px;
            }
          }

          .name {
            font-size: 17px;
          }

          .bid {
            font-size: 17px;
            font-weight: 500;

            .icon {
              width: 50px;
              margin-right: 14px;
              align-self: center;
            }

            .small {
              font-size: 10px;
              margin-top: 4px;
              margin-left: 6px;
            }
          }
        }

        .bottom {
          // background-color: rgb(90, 90, 196);

          .details {
            width: 50%;
            background-color: white;
            flex-direction: column;
            font-size: 14px;
            font-weight: 400;
          }

          .btn-view {
            background-color: #15aabf;
            color: white;
            border-radius: 18px;
            width: 36%;
            height: 150px;
            font-weight: 500;
            box-shadow: rgb(153, 153, 153);
            border-width: 1;
            border-color: transparent;

            &:active {
              background-color: #138e9e;
            }
          }
        }
      }
    }
  }
}
</style>
