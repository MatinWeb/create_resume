<template>
  <div>
    <v-card>
      <v-card-title>
        <div class="font-weight-black">Languages</div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div class="pa-4" v-if="!languages.length">
          <h2>
            Add New Languages
            <v-icon>{{ icons.mdiArrowDownThick }}</v-icon>
          </h2>
        </div>
        <div
          class="pa-4"
          v-else
          v-for="(language, index) in languages"
          :key="index"
        >
          <v-form v-if="language.editingMode" ref="languagesForm">
            <v-row>
              <v-col cols="12" md="6">
                <h3 class="font-weight-black mb-4">Name of Language</h3>
                <v-text-field
                  v-model="language.name"
                  label="Language Name"
                  solo
                  hide-details="auto"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <h3 class="font-weight-black mb-4">Mastery level</h3>
                <v-select
                  solo
                  hide-details
                  :items="languageLevelItems"
                  label="Level"
                  v-model="language.level"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn
                  @click="saveLanguage(index)"
                  color="success"
                  class="mr-3 mb-3"
                >
                  save
                </v-btn>
                <v-btn
                  @click="cancelEditing(index)"
                  color="warning"
                  class="mr-3 mb-3"
                >
                  cancle
                </v-btn>
                <v-btn
                  @click="deleteLanguage(index)"
                  color="red"
                  class="mr-3 mb-3"
                  outlined
                >
                  <v-icon class="mr-1">{{ icons.mdiClose }}</v-icon> delete
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
          <v-row v-else>
            <v-col cols="12" class="d-flex justify-space-between align-center">
              <div>
                <span>{{ `${language.name} :` }}</span>
                <span>{{ language.level }}</span>
              </div>
              <v-spacer></v-spacer>
              <v-btn color="primary" outlined @click="goToEditMode(index)">
                <v-icon class="mr-1">
                  {{ icons.mdiCircleEditOutline }}
                </v-icon>
                Edit
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="addNewLanguage" style="width: 100%" color="primary">
          <v-icon>
            {{ icons.mdiPlus }}
          </v-icon>
          Add Language
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import rulesMixin from "@/mixins/rules/rulesMixin.js";
import { mdiCircleEditOutline, mdiPlus, mdiArrowDownThick } from "@mdi/js";
export default {
  name: "CreateResumeLanguages",
  model: {
    event: "updateLanguages",
    prop: "value",
  },
  mixins: [rulesMixin],
  props: {
    value: {
      type: Array,
    },
  },
  data() {
    return {
      icons: {
        mdiCircleEditOutline,
        mdiPlus,
        mdiArrowDownThick,
      },

      editinglanguages: [],
      languages: [],
      languageLevelItems: [
        "Beginner",
        "Intermediate",
        "Advance",
        "Mother tongue",
      ],
    };
  },
  methods: {
    addNewLanguage() {
      this.languages.push({
        name: "",
        level: "",
        _id: Date.now(),
        editingMode: true,
      });
    },

    updateLanguages() {
      this.$emit("updateLanguages", this.languages);
    },

    saveLanguage(index) {
      const refKey = "languagesForm" + index;
      if (this.$refs[refKey] && this.$refs[refKey][0]) {
        if (!this.$refs[refKey][0].validate()) return undefined;
      }
      this.updateLanguages();
      this.languages[index].editingMode = false;
    },
    cancelEditing(index) {
      if (!this.editinglanguages.length) return this.deleteLanguage(index);
      let editingIndex = this.editinglanguages.findIndex(
        (item) => item._id === this.languages[index]._id
      );
      this.languages = [
        ...this.languages.map((item) => {
          if (item._id === this.editinglanguages[editingIndex]._id) {
            return { ...this.editinglanguages[editingIndex] };
          }
          return { ...item };
        }),
      ];
      this.editinglanguages.splice(editingIndex, 1);
    },
    deleteLanguage(index) {
      this.languages.splice(index, 1);
      this.updateLanguages();
    },
    goToEditMode(index) {
      if (!this.editinglanguages.length) {
        this.languages.forEach((item) => {
          this.editinglanguages.push({ ...item });
        });
      }
      this.languages[index].editingMode = true;
    },
  },

  created() {
    if (this.value && this.value.length) {
      return this.value.forEach((item) => {
        this.languages.push({ ...item });
      });
    }
  },
};
</script>