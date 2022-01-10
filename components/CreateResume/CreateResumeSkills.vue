<template>
  <div>
    <v-card>
      <v-card-title>
        <div class="font-weight-black">Skills</div>
        <v-spacer></v-spacer>
        <v-btn
          :outlined="!!skills.length"
          v-if="!editingMode"
          color="primary"
          @click="goToEditMode"
        >
          <v-icon class="mr-1">
            {{ skills.length ? icons.mdiCircleEditOutline : icons.mdiPlus }}
          </v-icon>
          {{ skills.length ? "Edit" : "Add" }}
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div class="pa-4" v-if="editingMode">
          <v-row>
            <v-col cols="12" class="d-flex align-center">
              <div v-for="(skillItem, index) in editingSkills" :key="index">
                <v-chip
                  class="ma-2"
                  close
                  color="primary"
                  text-color="white"
                  @click:close="removeSkill(index)"
                >
                  {{ skillItem }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
          <v-form ref="skillsForm">
            <v-row>
              <v-col cols="12" class="d-flex align-center">
                <v-text-field
                  v-model="newSkill"
                  label="Your Skill..."
                  solo
                  hide-details
                  style="max-width: 400px"
                ></v-text-field>
                <v-btn icon color="primary" class="ml-2" @click="addNewSkill">
                  <v-icon>
                    {{ icons.mdiPlusCircleOutline }}
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-btn @click="saveSkills" color="success" class="mr-3 mb-3">
                  save
                </v-btn>
                <v-btn @click="cancelEditing" color="warning" class="mr-3 mb-3">
                  cancle
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </div>

        <div v-else>
          <v-row v-if="!skills.length">
            <v-col cols="12">
              <h2 class="pa-4">Add Skills</h2>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12" class="d-flex align-center">
              <div v-for="(skillItem, index) in skills" :key="index">
                <v-chip outlined class="ma-2" color="primary">
                  {{ skillItem }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import rulesMixin from "@/mixins/rules/rulesMixin.js";
import { mdiCircleEditOutline, mdiPlus, mdiPlusCircleOutline } from "@mdi/js";
export default {
  name: "CreateResumeSkills",
  model: {
    event: "updateSkills",
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
        mdiPlusCircleOutline,
      },
      editingMode: false,
      newSkill: null,
      editingSkills: [],
      skills: [],
    };
  },
  methods: {
    addNewSkill() {
      if (!this.newSkill) return undefined;
      this.editingSkills.push(this.newSkill);
      this.newSkill = null;
    },

    removeSkill(index) {
      this.editingSkills.splice(index, 1);
    },

    updateSkills() {
      this.$emit("updateSkills", this.skills);
      this.editingMode = false;
    },
    saveSkills() {
      this.skills = [...this.editingSkills];
      this.updateSkills();
    },
    cancelEditing() {
      if (!this.editingSkills.length) {
        this.newSkill = null;
        return (this.editingMode = false);
      }
      this.editingSkills = [...this.skills];
      this.updateSkills();
    },
    goToEditMode() {
      this.editingMode = true;
      if (this.skills.length) return (this.editingSkills = [...this.skills]);
    },
  },

  created() {
    if (this.value && this.value.length) {
      return this.value.forEach((item) => {
        this.skills.push(item);
      });
    }
  },
};
</script>