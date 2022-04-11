<template lang="">
  <div>
    <!-- <v-breadcrumbs :items="items" class="black--text" divider="/">
      <template slot="item" slot-scope="props" >
        <router-link  to="{name: props.item.href}">{{
          props.item.name
        }}</router-link>
      </template>
    </v-breadcrumbs> -->

    <v-breadcrumbs :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :href="item.href" class="black--text">
          <h2>{{ item.name }}</h2>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    Upbreadcrumbs() {
      this.items = this.$route.meta.breadcrumbs;
    }
  },
  mounted() {
    this.Upbreadcrumbs();
  },
  watch: {
    $route() {
      this.Upbreadcrumbs();
    }
  }
};
</script>
<style lang=""></style>
