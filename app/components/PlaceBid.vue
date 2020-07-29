<template lang='html'>
    <Page class='page'>
      <ActionBar flat='true' class='action-bar' row='2'>
          <Image src='~/assets/logo.png' />
      </ActionBar>

      <FlexboxLayout class="modal-bid-amount">
        <!-- Input field -->
        <TextField :hint="'Atleast $' + minBid" class="input" v-model="inputBid" keyboardType="number" />

        <!-- btn -->
        <FlexboxLayout flexDirection='row' class='btn' @tap="placeBid">
          <Label text='Place Bid' class='label' />
        </FlexboxLayout>
      </FlexboxLayout>
    </Page>
</template>

<script>
import Vue from 'vue';

// Routes (temporarily here)
import routes from '../routes';
import { goBack } from 'tns-core-modules/ui/frame/frame';

export default {
  props: {
    itemId: {
      type: String,
      default: null,
      required: true
    },
    minBid: {
      type: Number,
      default: null,
      required: true
    }
  },
  data() {
    return {
      inputBid: ''
    };
  },
  methods: {
    async placeBid() {
      // Check for invalid input
      if (this.inputBid == '') {
        return;
      }

      // Check for insuffienct bid
      if (this.inputBid < this.minBid) {
        console.log('Insufficient bid!');
        return;
      }

      await this.$store.dispatch({
        type: 'placeBid',
        itemId: this.itemId,
        bidAmount: this.inputBid,
        bidderId: 12,
        timestamp: '7-28-2020:10:43:58'
      });

      // Navigate back to item
      this.closeModal();
    },
    closeModal() {
      goBack();
    }
  },
  computed: {
    bidFormatted: function() {
      if (this.inputBid != '') {
        return '$' + this.inputBid;
      } else {
        return '';
      }
    }
  },
  mounted() {
    // console.log('Item clicked: ' + this.item.name);
  },
  created() {},
  beforeDestroy() {}
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

.modal-bid-amount {
  width: 0%;
  height: 0%;
  background-color: rgb(255, 255, 255);
  visibility: none;
  align-items: flex-start;
  flex-direction: column;

  .input {
    width: 100%;
    padding: 120px 0 120px 0;
    text-decoration: none;
    font-size: 55px;
    font-weight: 500;
    color: rgb(61, 61, 61);
    align-self: center;
    text-align: center;
    justify-self: center;
    margin-top: 30%;
    background-color: rgb(238, 238, 238);
    border-bottom-width: 1;
    border-bottom-color: transparent;
    placeholder-color: rgb(202, 202, 202);

    &:focus {
      text-decoration: none;
      border-bottom-width: 1;
      border-bottom-color: transparent;
    }
  }

  .btn {
    width: 88%;
    height: 270px;
    border-radius: 13px;
    color: white;
    align-items: center;
    font-size: 19px;
    background-color: #ff596f;
    font-weight: 500;
    justify-self: flex-end;
    margin-top: 40%;
    align-self: center;
    justify-content: center;
  }
}
</style>
