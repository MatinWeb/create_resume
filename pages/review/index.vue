<template>
  <v-container>
    <ShowResumeReview :resumeInformation="resumeInformation"/>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ReviewPage",
  computed: {
    ...mapState(["resumeInformation"]),
  },
  created() {
    if (!this.resumeInformation.educational )
      return this.$router.push({ name: "index" });
  },
};
</script>