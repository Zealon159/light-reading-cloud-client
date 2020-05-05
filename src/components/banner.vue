<template>
  <v-carousel
    cycle
    height="150"
    hide-delimiter-background
    :show-arrows="false"
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(banner, i) in items"
      :key="i"
    >
      <v-sheet
        height="100%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <v-img
              height="150"
              :src="banner.imgUrl"
          ></v-img>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    // 传入子组件的参数写到props
    props: {
      items: {}
    }
  }
</script>
