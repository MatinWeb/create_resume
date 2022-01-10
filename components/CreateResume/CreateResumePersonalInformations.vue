<template>
  <div>
    <v-card>
      <v-card-title>
        <div class="font-weight-black">Personal Information</div>
        <v-spacer></v-spacer>
        <div v-if="!editingMode">
          <v-btn
            color="primary"
            v-if="!personal._id"
            @click="createPersonalInfo"
          >
            <v-icon class="mr-1">
              {{ icons.mdiPlus }}
            </v-icon>
            Create
          </v-btn>
          <v-btn v-else color="primary" outlined @click="goToEditMode">
            <v-icon class="mr-1">
              {{ icons.mdiCircleEditOutline }}
            </v-icon>
            Edit
          </v-btn>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form class="pa-4" v-if="editingMode" ref="personalInformationForm">
          <v-row>
            <v-col cols="12" md="6">
              <h3 class="font-weight-black mb-4">E-mail Address</h3>
              <v-text-field
                v-model="personal.email"
                hide-details="auto"
                label="Email"
                solo
                :rules="[rules.email, rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="font-weight-black mb-4">Phone Number</h3>
              <v-text-field
                v-model="personal.phone"
                hide-details="auto"
                label="Phone"
                solo
                :rules="[rules.phone, rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="font-weight-black mb-4">City of Residence</h3>
              <v-text-field
                v-model="personal.city"
                hide-details="auto"
                label="City"
                solo
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="font-weight-black mb-4">Residence Address</h3>
              <v-text-field
                v-model="personal.address"
                hide-details="auto"
                label="Address"
                solo
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="font-weight-black mb-4">Year of Birth</h3>
              <v-text-field
                v-model="personal.birthYear"
                hide-details="auto"
                label="Birth"
                solo
                :rules="[rules.year, rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="font-weight-black">Marital Status</h3>
              <v-radio-group
                hide-details="auto"
                class="mt-6"
                :rules="[rules.required]"
                v-model="personal.maritalStatus"
                row
              >
                <v-radio label="single" value="Single"></v-radio>
                <v-radio label="marride" value="Marride"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="font-weight-black">Gender</h3>
              <v-radio-group
                class="mt-6"
                hide-details="auto"
                :rules="[rules.required]"
                v-model="personal.gender"
                row
              >
                <v-radio label="woman" value="Woman"></v-radio>
                <v-radio label="man" value="Man"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                @click="savePersonalInformations"
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
          <v-row v-if="!personal._id">
            <v-col cols="12">
              <h2 class="pa-4">Create Personal Information</h2>
            </v-col>
          </v-row>
          <v-row class="pa-4" v-else>
            <v-col cols="12" md="6">
              <h3 class="font-weight-black mb-4">E-mail Address</h3>
              <p>{{ personal.email }}</p>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="font-weight-black mb-4">Phone Number</h3>
              <p>{{ personal.phone }}</p>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="font-weight-black mb-4">City of Residence</h3>
              <p>{{ personal.city }}</p>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="font-weight-black mb-4">Residence Address</h3>
              <p>{{ personal.address }}</p>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="font-weight-black mb-4">Year of Birth</h3>
              <p>{{ personal.birthYear }}</p>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="font-weight-black">Marital Status</h3>
              <p>{{ personal.maritalStatus }}</p>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="font-weight-black">Gender</h3>
              <p>{{ personal.gender }}</p>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import rulesMixin from "@/mixins/rules/rulesMixin.js";
import { mdiClose, mdiCircleEditOutline, mdiPlus } from "@mdi/js";
export default {
  name: "CreateResumePersonalInformations",
  model: {
    event: "updatePersonalInformations",
    prop: "value",
  },
  mixins: [rulesMixin],
  props: {
    value: {
      type: Object,
    },
  },
  data() {
    return {
      icons: {
        mdiClose,
        mdiCircleEditOutline,
        mdiPlus,
      },
      validationPersonalInfo: false,
      editingMode: false,
      editingPersonalObject: null,
      personal: {
        email: null,
        phone: null,
        city: null,
        address: null,
        maritalStatus: null,
        gender: null,
        birthYear: null,
        _id: null,
      },
    };
  },
  methods: {
    createPersonalInfo() {
      this.personal._id = Date.now();
      this.editingMode = true;
    },
    putValueInPersonalObject(value, obj) {
      Object.keys(value).forEach((key) => {
        this.$set(obj, key, value[key]);
      });
    },
    updateNewPersonalInfo() {
      this.$emit("updatePersonalInformations", this.personal);
      this.editingMode = false;
    },
    savePersonalInformations() {
      if (!this.$refs.personalInformationForm.validate()) return undefined;
      this.updateNewPersonalInfo();
    },
    cancelEditing() {
      if (!this.editingPersonalObject) return undefined;
      this.putValueInPersonalObject(this.editingPersonalObject, this.personal);
      this.updateNewPersonalInfo();
    },
    goToEditMode() {
      this.editingMode = true;
      this.editingPersonalObject = { ...this.personal };
    },

    checkFieldsForEmpty() {
      if (
        Object.values(this.personal).filter(Boolean).length ===
        Object.keys(this.personal).length
      )
        return (this.validationPersonalInfo = true);
    },
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal && newVal.email) {
          this.putValueInPersonalObject(newVal, this.personal);
        }
      },
    },
  },
};
</script>