<template>
  <FlexBoxLayout class="nav">
    <FlexBoxLayout class="item" @tap="goTo('home')">
      <Label :text="String.fromCharCode(0xf015)" class="fas icon" />
    </FlexBoxLayout>
    <FlexBoxLayout class="item" @tap="goTo('search')">
      <Label :text="String.fromCharCode(0xf002)" class="fas icon" />
    </FlexBoxLayout>
    <FlexBoxLayout class="item" @tap="goTo('browse')">
      <Label :text="String.fromCharCode(0xf54e)" class="fas icon" />
    </FlexBoxLayout>
    <FlexBoxLayout class="item" @tap="goTo('home')">
      <Label :text="String.fromCharCode(0xf004)" class="fas icon" />
    </FlexBoxLayout>
    <FlexBoxLayout class="item" @tap="goTo('home')">
      <Label :text="String.fromCharCode(0xf2bd)" class="fas icon" />
    </FlexBoxLayout>
  </FlexBoxLayout>
</template>

<script>
// Routes
import routes from "../routes";

export default {
  data() {
    return {};
  },
  methods: {
    goTo(name) {
      this.$navigateTo(routes[name]);
    }
  }
};
</script>

<style lang="scss">
.nav {
  background-color: white;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 50px 0 50px 0;
  box-shadow: 0px -4px 5px 0px rgba(235, 235, 235, 1);

  .item {
    align-items: center;
    justify-content: center;
    flex: 1;

    .icon {
      font-size: 20px;
      color: #6c678e;

      &:selected {
        color: #ff596f;
      }
    }
  }
}
</style>