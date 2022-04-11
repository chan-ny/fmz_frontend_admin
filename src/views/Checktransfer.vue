<template>
  <div>
    <v-card class="ma-1" outlined>
      <div class="fontsize20 ma-2">ກວດສອບການໂອນເງິນ</div>
      <v-divider color="orange"></v-divider>
      <v-row>
        <v-col cols="12">
          <index-transfer></index-transfer>
        </v-col>
      </v-row>
      <v-row class="ma-2">
        <v-col>
          <commit-tranfer></commit-tranfer>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import IndexTransfer from "@/components/Transfer/index";
import CommitTranfer from "@/components/Transfer/TranferCommit";
export default {
  components: {
    "index-transfer": IndexTransfer,
    "commit-tranfer": CommitTranfer
  },
  data() {
    return {
      count: 1
    };
  }
};
</script>
<style></style>
