<template lang="html">
<Page>
    <GridLayout rows="*, auto" backgroundColor="lightgray">
        <ContentView row="0">
            <Frame>
                <Search />
            </Frame>
        </ContentView>

        <Nav row="1" />
    </GridLayout>
</Page>
</template>

<script>
// Nav bar
import Nav from "./Nav.vue";

import Search from "./Search.vue";

export default {
  components: {
    Nav,
    Search
  },
  methods: {}
};
</script>

<style lang="scss">
// Import custom common variables
@import "~@nativescript/theme/scss/variables/blue";

// Custom styles
.action-bar {
  background-color: #ffffff;
  color: red;
  border-color: rgb(153, 153, 153);
  border-bottom-width: 1px;
  height: 300px;

  image {
    width: 325px;
  }
}
</style>
