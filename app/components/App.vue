<template lang="html">
    <BottomNavigation class="BottomNavigation">
        <!-- Navigation -->
        <TabStrip>
            <TabStripItem class="navigation__item">
                <Label :text="String.fromCharCode(0xf015)" class="fas icon" />
            </TabStripItem>
            <TabStripItem class="navigation__item">
                <Label :text="String.fromCharCode(0xf002)" class="fas icon" />
            </TabStripItem>
            <TabStripItem class="navigation__item">
                <Label :text="String.fromCharCode(0xf54e)" class="fas icon" />
            </TabStripItem>
            <TabStripItem class="navigation__item">
                <Label :text="String.fromCharCode(0xf004)" class="fas icon" />
            </TabStripItem>
            <TabStripItem class="navigation__item">
                <Label :text="String.fromCharCode(0xf2bd)" class="fas icon" />
            </TabStripItem>
        </TabStrip>

        <!-- Views -->
        <TabContentItem>
            <Frame id="items">
                <Items/>
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame id="search">
                <Search/>
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame id="search">
                <Browse/>
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame id="browse">
                <Search/>
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame id="watched">
                <Search/>
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame id="profile">
                <Search/>
            </Frame>
        </TabContentItem>
    </BottomNavigation>
</template>

<script>
import Items from "./Items.vue";
import Browse from "./Browse.vue";
import Search from "./Search.vue";

export default {
  components: {
    Items,
    Browse,
    Search
  },
  methods: {
      switchTab(tab) {
          console.log("Navigatsing");
          this.$navigateTo(Browse);
      },
      sampleHome() {
          console.log("going home")
      }
  }
};
</script>

<style lang="scss">
// Start custom common variables
@import "~@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
TabStrip {
    background-color: rgb(255, 255, 255);
    selected-item-color: #ff596f;
    un-selected-item-color: #6c678e;;
    highlight-color: green;
}
</style>
