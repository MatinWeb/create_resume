<template>
  <div>
    <v-card>
      <v-card-title>
        <div class="font-weight-black">Work Experience</div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div class="pa-4" v-if="!works.length">
          <h2>
            Add Work Experience
            <v-icon>{{ icons.mdiArrowDownThick }}</v-icon>
          </h2>
        </div>
        <div
          v-else
          class="pa-4"
          style="border-bottom: 1px solid rgb(196 196 196 / 42%)"
          v-for="(work, index) in works"
          :key="index"
        >
          <v-form v-if="work.editingMode" :ref="'workExperienceForm' + index">
            <v-row>
              <v-col cols="12" md="6">
                <h3 class="font-weight-black mb-4">Job Title (Position)</h3>
                <v-text-field
                  v-model="work.jobTitle"
                  label="Job title"
                  solo
                  hide-details="auto"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <h3 class="font-weight-black mb-4">Company Name</h3>
                <v-text-field
                  v-model="work.companyName"
                  label="Company Name"
                  solo
                  hide-details="auto"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <h3 class="font-weight-black mb-4">Date of employment</h3>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-menu
                      :ref="'fromDate' + index"
                      v-model="work.menuDateFrom"
                      :close-on-content-click="false"
                      :return-value.sync="work.menuDateFrom"
                      transition="scale-transition"
                      offset-y
                      min-width="300"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="work.datePickerFrom"
                          label="From"
                          solo
                          hide-details="auto"
                          prepend-icon="mdi-calendar"
                          readonly
                          :rules="[rules.required]"
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="work.datePickerFrom"
                        type="month"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="work.menuDateFrom = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="
                            saveDate('fromDate', work.datePickerFrom, index)
                          "
                        >
                          OK
                        </v-btn></v-date-picker
                      >
                    </v-menu>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-menu
                      :ref="'toDate' + index"
                      v-model="work.menuDateTo"
                      :close-on-content-click="false"
                      :return-value.sync="work.datePickerTo"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="work.datePickerTo"
                          label="To"
                          :rules="[rules.required]"
                          solo
                          hide-details="auto"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="work.datePickerTo"
                        type="month"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="work.menuDateTo = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="saveDate('toDate', work.datePickerTo, index)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <h3 class="font-weight-black mb-4">Description</h3>
                <v-textarea
                  v-model="work.description"
                  label="Description"
                  solo
                  :rules="[rules.required]"
                  hide-details="auto"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-btn
                  @click="saveWorkExperience(index)"
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
                  @click="deleteWorkExperience(index)"
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
                <p class="font-weight-black text-h6">{{ work.jobTitle }}</p>
                <div>
                  <span
                    >{{
                      `${work.companyName} __  ${work.datePickerFrom} until ${work.datePickerTo}`
                    }}
                  </span>
                </div>
                <p v-if="work.description">{{ work.description }}</p>
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
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          @click="addNewWorkExperience"
          style="width: 100%"
          color="primary"
        >
          <v-icon>
            {{ icons.mdiPlus }}
          </v-icon>
          Add Work Experience
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import rulesMixin from "@/mixins/rules/rulesMixin.js";
import {
  mdiClose,
  mdiCircleEditOutline,
  mdiPlus,
  mdiArrowDownThick,
} from "@mdi/js";
export default {
  name: "CreateResumeWorkExperiences",
  model: {
    event: "updateWorkExperience",
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
        mdiClose,
        mdiCircleEditOutline,
        mdiPlus,
        mdiArrowDownThick,
      },

      editingWorks: [],
      works: [],
    };
  },
  methods: {
    addNewWorkExperience() {
      this.works.push({
        menuDateFrom: false,
        menuDateTo: false,
        datePickerFrom: null,
        datePickerTo: null,
        jobTitle: null,
        companyName: null,
        editingMode: true,
        _id: Date.now(),
      });
    },

    saveDate(ref, picker, index) {
      const refKeyMenu = ref + index;
      if (this.$refs[refKeyMenu] && this.$refs[refKeyMenu][0]) {
        this.$refs[refKeyMenu][0].save(picker);
      }
    },

    updateWorks() {
      this.$emit("updateWorkExperience", this.works);
    },

    saveWorkExperience(index) {
      const refKey = "workExperienceForm" + index;
      if (this.$refs[refKey] && this.$refs[refKey][0]) {
        if (!this.$refs[refKey][0].validate()) return undefined;
      }
      this.updateWorks();
      this.works[index].editingMode = false;
    },
    cancelEditing(index) {
      if (!this.editingWorks.length) return this.deleteWorkExperience(index);
      let editingIndex = this.editingWorks.findIndex(
        (item) => item._id === this.works[index]._id
      );
      this.works = [
        ...this.works.map((item) => {
          if (item._id === this.editingWorks[editingIndex]._id) {
            return { ...this.editingWorks[editingIndex] };
          }
          return { ...item };
        }),
      ];
      this.editingWorks.splice(editingIndex, 1);
    },
    deleteWorkExperience(index) {
      this.works.splice(index, 1);
      this.updateWorks();
    },
    goToEditMode(index) {
      if (!this.editingWorks.length) {
        this.works.forEach((item) => {
          this.editingWorks.push({ ...item });
        });
      }
      this.works[index].editingMode = true;
    },
  },
  created() {
    if (this.value && this.value.length)
      this.value.forEach((item) => {
        this.works.push({ ...item });
      });
  },
};
</script>