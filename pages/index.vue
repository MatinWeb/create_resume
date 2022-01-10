<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <CreateResumePersonalInformations
        v-model="resume.personalInfo"
        :value="resume.personalInfo"
        class="mb-10"
      />
    </v-col>
    <v-col cols="12">
      <CreateResumeAboutMe
        v-model="resume.aboutMe"
        :value="resume.aboutMe"
        class="mb-10"
      />
    </v-col>
    <v-col cols="12">
      <CreateResumeWorkExperiences
        v-model="resume.workExperiences"
        :value="resume.workExperiences"
        class="mb-10"
      />
    </v-col>
    <v-col cols="12">
      <CreateResumeSkills
        v-model="resume.skills"
        :value="resume.skills"
        class="mb-10"
      />
    </v-col>
    <v-col cols="12">
      <CreateResumeEducationalBackground
        v-model="resume.educational"
        :value="resume.educational"
        class="mb-10"
      />
    </v-col>
    <v-col cols="12">
      <CreateResumeLanguages
        v-model="resume.languages"
        :value="resume.languages"
        class="mb-10"
      />
    </v-col>
    <v-col cols="12" class="d-flex justify-end">
      <v-btn color="primary" @click="goToReviewPage"> Review </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "makingResumePage",
  data() {
    return {
      resume: {
        personalInfo: {},
        aboutMe: null,
        workExperiences: [],
        skills: [],
        educational: [],
        languages: [],
      },
    };
  },
  computed: {
    ...mapState(["resumeInformation"]),
  },
  methods: {
    ...mapMutations(["setResumeInformations"]),
    validateObjects(objectResumeName) {
      let validate =
        Object.keys(objectResumeName).length != 0 &&
        Object.keys(objectResumeName).length ===
          Object.values(objectResumeName).filter(Boolean).length;
      return validate;
    },
    validateArray(arrayResumeName) {
      let arrayValidation = arrayResumeName.some((item) => {
        return (
          Object.keys(item).length != Object.values(item).filter(Boolean).length
        );
      });
      return arrayValidation;
    },
    validateResumeInformation() {
      let validateWorkExperiences = this.validateArray(
        this.resume.workExperiences
      );
      let validateEducational = this.validateArray(this.resume.educational);
      let validateLanguages = this.validateArray(this.resume.languages);
      let validatePersonalInfo = this.validateObjects(this.resume.personalInfo);
      let validateSkills = !!this.resume.skills.length;
      let validateAboutMe = !!this.resume.aboutMe;

      return (
        validateWorkExperiences &&
        validateEducational &&
        validateLanguages &&
        validatePersonalInfo &&
        validateSkills &&
        validateAboutMe
      );
    },
    goToReviewPage() {
      if (!this.validateResumeInformation())
        return alert("please fill fiels");
      this.setResumeInformations(this.resume);
      this.$router.push({ name: "review" });
    },
  },
  created() {
    if (this.resumeInformation.educational)
      return (this.resume = { ...this.resumeInformation });
  },
  watch: {
    resume: {
      deep: true,
      handler(newVal) {
        console.log(newVal);
      },
    },
  },
};
</script>