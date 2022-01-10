<template>
  <v-row>
    <v-col cols="12">
      <h2 class="mb-4">Personal Information</h2>
      <div class="rowInfo">
        <v-divider vertical></v-divider>
        <div class="pl-4">
          <div class="rowInfo mb-2">
            <h5 class="font-weight-black">E-mail Address :</h5>
            <p class="mb-0 ml-4">{{ resumeInformation.personalInfo.email }}</p>
          </div>
          <div class="rowInfo mb-2">
            <h5 class="font-weight-black">Phone Number :</h5>
            <p class="mb-0 ml-4">{{ resumeInformation.personalInfo.phone }}</p>
          </div>
          <div class="rowInfo mb-2">
            <h5 class="font-weight-black">City of Residence :</h5>
            <p class="mb-0 ml-4">{{ resumeInformation.personalInfo.city }}</p>
          </div>
          <div class="rowInfo mb-2">
            <h5 class="font-weight-black">Residence Address :</h5>
            <p class="mb-0 ml-4">
              {{ resumeInformation.personalInfo.address }}
            </p>
          </div>
          <div class="rowInfo mb-2">
            <h5 class="font-weight-black">Year of Birth :</h5>
            <p class="mb-0 ml-4">
              {{ resumeInformation.personalInfo.birthYear }}
            </p>
          </div>
          <div class="rowInfo mb-2">
            <h5 class="font-weight-black">Marital Status :</h5>
            <p class="mb-0 ml-4">
              {{ resumeInformation.personalInfo.maritalStatus }}
            </p>
          </div>
          <div class="rowInfo mb-2">
            <h5 class="font-weight-black">Gender :</h5>
            <p class="mb-0 ml-4">{{ resumeInformation.personalInfo.gender }}</p>
          </div>
        </div>
      </div>
    </v-col>
    <v-col cols="12">
      <h2 class="mb-4">About Me</h2>
      <div class="rowInfo">
        <v-divider vertical></v-divider>
        <div class="pl-4">
          {{ resumeInformation.aboutMe }}
        </div>
      </div>
    </v-col>
    <v-col cols="12">
      <h2 class="mb-4">Work Experience</h2>
      <v-row>
        <v-col
          cols="12"
          v-for="(work, index) in resumeInformation.workExperiences"
          :key="index"
          class="rowInfo"
        >
          <v-divider vertical></v-divider>
          <div class="pl-4">
            <div class="rowInfo mb-2">
              <h5>Job Title :</h5>
              <p class="mb-0 ml-4">{{ work.jobTitle }}</p>
            </div>
            <div class="rowInfo mb-2">
              <h5>Company :</h5>
              <p class="mb-0 ml-4">{{ work.companyName }}</p>
            </div>
            <div class="rowInfo mb-2">
              <h5>From - To :</h5>
              <p class="mb-0 ml-4">
                {{ `${work.datePickerFrom} ---> ${work.datePickerTo}` }}
              </p>
            </div>
            <div class="rowInfo mb-2">
              <h5>Work Description :</h5>
              <p class="mb-0 ml-4">
                {{ work.description }}
              </p>
            </div>
            <v-divider></v-divider>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <h2 class="mb-4">Skills</h2>
      <div class="rowInfo mb-2">
        <v-divider vertical></v-divider>
        <p class="pl-4">
          {{ showSkills }}
        </p>
      </div>
    </v-col>
    <v-col cols="12">
      <h2 class="mb-4">Educational Background</h2>
      <v-row>
        <v-col
          cols="12"
          v-for="(education, index) in resumeInformation.educational"
          :key="index"
          class="rowInfo"
        >
          <v-divider vertical></v-divider>
          <div class="pl-4">
            <div class="rowInfo mb-2">
              <h5>Field of Study :</h5>
              <p class="mb-0 ml-4">{{ education.studyField }}</p>
            </div>
            <div class="rowInfo mb-2">
              <h5>Name of educational institution :</h5>
              <p class="mb-0 ml-4">{{ education.institution }}</p>
            </div>
            <div class="rowInfo mb-2">
              <h5>From - To :</h5>
              <p class="mb-0 ml-4">
                {{
                  `${education.datePickerFrom} ---> ${education.datePickerTo}`
                }}
              </p>
            </div>
            <div class="rowInfo mb-2">
              <h5>Education Description :</h5>
              <p class="mb-0 ml-4">{{ education.description }}</p>
            </div>
            <v-divider></v-divider>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <h2 class="mb-4">Languages</h2>
      <v-row>
        <v-col
          cols="12"
          v-for="(language, index) in resumeInformation.languages"
          :key="index"
          class="rowInfo"
        >
          <v-divider vertical></v-divider>
          <div class="pl-4">
            <div class="rowInfo mb-2">
              <h5>Name of Language :</h5>
              <p class="mb-0 ml-4">{{ language.name }}</p>
            </div>
            <div class="rowInfo mb-2">
              <h5>Mastery level :</h5>
              <p class="mb-0 ml-4">{{ language.level }}</p>
            </div>
            <v-divider></v-divider>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-btn color="primary" @click="backToCreateResume">
        Back To Resume
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ShowResumeReview",
  props: {
    resumeInformation: {
      type: Object,
    },
  },
  computed: {
    showSkills() {
      return this.resumeInformation.skills.join(", ");
    },
  },
  methods: {
    backToCreateResume() {
      this.$router.push({ name: "index" });
    },
  },
};
</script>

<style scoped>
.rowInfo {
  display: flex;
  justify-content: start;
  align-items: center;
}

</style>