<template>
  <div>
    <v-card>
      <v-card-title>
        <div class="font-weight-black">Educational Background</div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div class="pa-4" v-if="!educations.length">
          <h2>
            Add Educational Background
            <v-icon>{{ icons.mdiArrowDownThick }}</v-icon>
          </h2>
        </div>
        <div
          v-else
          class="pa-4"
          style="border-bottom: 1px solid rgb(196 196 196 / 42%)"
          v-for="(education, index) in educations"
          :key="index"
        >
          <v-form
            v-if="education.editingMode"
            :ref="'educationExperienceForm' + index"
          >
            <v-row>
              <v-col cols="12" md="6">
                <h3 class="font-weight-black mb-4">Field of Study</h3>
                <v-text-field
                  v-model="education.studyField"
                  label="Majors"
                  solo
                  hide-details="auto"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <h3 class="font-weight-black mb-4">
                  Name of university / educational institution
                </h3>
                <v-text-field
                  v-model="education.institution"
                  label="Institution Name"
                  solo
                  hide-details="auto"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <h3 class="font-weight-black mb-4">Grade</h3>
                <v-radio-group
                  class="mt-6"
                  hide-details="auto"
                  :rules="[rules.required]"
                  v-model="education.grade"
                  row
                >
                  <v-radio label="Diploma" value="1"></v-radio>
                  <v-radio label="Bachelor" value="2"></v-radio>
                  <v-radio label="Master " value="3"></v-radio>
                  <v-radio label="P.H.D" value="4"></v-radio>
                  <v-radio label="Other" value="5"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12">
                <h3 class="font-weight-black mb-4">
                  Start and end date of study
                </h3>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-menu
                      :ref="'fromDate' + index"
                      v-model="education.menuDateFrom"
                      :close-on-content-click="false"
                      :return-value.sync="education.menuDateFrom"
                      transition="scale-transition"
                      offset-y
                      min-width="300"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="education.datePickerFrom"
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
                        v-model="education.datePickerFrom"
                        type="month"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="education.menuDateFrom = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="
                            saveDate(
                              'fromDate',
                              education.datePickerFrom,
                              index
                            )
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
                      v-model="education.menuDateTo"
                      :close-on-content-click="false"
                      :return-value.sync="education.datePickerTo"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="education.datePickerTo"
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
                        v-model="education.datePickerTo"
                        type="month"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="education.menuDateTo = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="
                            saveDate('toDate', education.datePickerTo, index)
                          "
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
                  v-model="education.description"
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
                  @click="saveEducationalBackground(index)"
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
                  @click="deleteEducationalBackground(index)"
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
                <p class="font-weight-black text-h6">
                  {{ education.studyField }}
                </p>
                <div>
                  <span
                    >{{
                      `${education.institution} __ from ${education.datePickerFrom} until ${education.datePickerTo}`
                    }}
                  </span>
                </div>
                <p>{{ education.description }}</p>
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
          @click="addNewEducationlBackground"
          style="width: 100%"
          color="primary"
        >
          <v-icon>
            {{ icons.mdiPlus }}
          </v-icon>
          Add Educational Background
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
  name: "CreateResumeEducationalBackground",
  model: {
    event: "updateEducationalBackgrounds",
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

      editingEducations: [],
      educations: [],
    };
  },
  methods: {
    addNewEducationlBackground() {
      this.educations.push({
        menuDateFrom: false,
        menuDateTo: false,
        datePickerFrom: null,
        datePickerTo: null,
        studyField: null,
        institution: null,
        grade: null,
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

    updateEducations() {
      this.$emit("updateEducationalBackgrounds", this.educations);
    },

    saveEducationalBackground(index) {
      const refKey = "educationExperienceForm" + index;
      if (this.$refs[refKey] && this.$refs[refKey][0]) {
        if (!this.$refs[refKey][0].validate()) return undefined;
      }
      this.updateEducations();
      this.educations[index].editingMode = false;
    },
    cancelEditing(index) {
      if (!this.editingEducations.length)
        return this.deleteEducationalBackground(index);
      let editingIndex = this.editingEducations.findIndex(
        (item) => item._id === this.educations[index]._id
      );
      this.educations = [
        ...this.educations.map((item) => {
          if (item._id === this.editingEducations[editingIndex]._id) {
            return { ...this.editingEducations[editingIndex] };
          }
          return { ...item };
        }),
      ];
      this.editingEducations.splice(editingIndex, 1);
    },
    deleteEducationalBackground(index) {
      this.educations.splice(index, 1);
      this.updateEducations();
    },
    goToEditMode(index) {
      if (!this.editingEducations.length) {
        this.educations.forEach((item) => {
          this.editingEducations.push({ ...item });
        });
      }
      this.educations[index].editingMode = true;
    },
  },
  created() {
    if (this.value && this.value.length)
      this.value.forEach((item) => {
        this.educations.push({ ...item });
      });
  },
};
</script>