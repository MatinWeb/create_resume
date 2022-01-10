<template>
  <div>
    <v-card>
      <v-card-title>
        <div class="font-weight-black">About Me</div>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!editingMode"
          color="primary"
          :outlined="!!aboutMeDescription"
          @click="goToEditMode"
        >
          <v-icon class="mr-1">
            {{
              aboutMeDescription ? icons.mdiCircleEditOutline : icons.mdiPlus
            }}
          </v-icon>
          {{ aboutMeDescription ? "Edit" : "Create" }}
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form class="pa-4" v-if="editingMode" ref="aboutMeInformationForm">
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="aboutMeDescription"
                label="Description"
                solo
                hide-details="auto"
                :rules="[rules.required]"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-btn
                @click="saveAboutMeInformation"
                color="success"
                class="mr-3 mb-3"
              >
                save
              </v-btn>
              <v-btn @click="cancelEditing" color="warning" class="mr-3 mb-3">
                cancle
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <div v-else>
          <v-row v-if="!aboutMeDescription">
            <v-col cols="12">
              <h2 class="pa-4">Create About Me</h2>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <p>{{ aboutMeDescription }}</p>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import rulesMixin from "@/mixins/rules/rulesMixin.js";
import { mdiCircleEditOutline, mdiPlus } from "@mdi/js";
export default {
  name: "CreateResumeAboutMe",
  model: {
    event: "updateAboutMeInformations",
    prop: "value",
  },
  mixins: [rulesMixin],
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      icons: {
        mdiCircleEditOutline,
        mdiPlus,
      },
      editingMode: false,
      editingaboutMeDescription: null,
      aboutMeDescription: null,
    };
  },
  methods: {

    updateNewAboutMeInfo() {
      this.$emit("updateAboutMeInformations", this.aboutMeDescription);
      this.editingMode = false;
    },
    saveAboutMeInformation() {
      if (!this.$refs.aboutMeInformationForm.validate()) return undefined;
      this.updateNewAboutMeInfo();
    },
    cancelEditing() {
      if (!this.editingaboutMeDescription) return undefined;
      this.aboutMeDescription = this.editingaboutMeDescription;
      this.updateNewAboutMeInfo();
    },
    goToEditMode() {
      this.editingMode = true;
      if (this.aboutMeDescription)
        return (this.editingaboutMeDescription = this.aboutMeDescription);
    },
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.aboutMeDescription = newVal;
        }
      },
    },
  },
};
</script>