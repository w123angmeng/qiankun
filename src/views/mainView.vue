<template>
  <div class="page">
    <HeaderComp></HeaderComp>
    <div class="mainw">
        <div class="lw">
            <NavMenu></NavMenu>
        </div>
        <div class="rw" id="container">
            <!-- <router-view /> -->
        </div>
    </div>
  </div>
</template>

<script>
import NavMenu from "@/views/common/NavMenu";
import HeaderComp from "@/views/common/HeaderComp"

export default {
  name: "mainView",
  components: {
    HeaderComp,
    NavMenu
  },
};
</script>
<style lang="scss" scoped>
.page {
    width: 100%;
    height: 100%;
}
.mainw {
    display: flex;
    .lw {
        width: 180px;
    }
    .rw {
        flex: 1;
    }
}

</style>
