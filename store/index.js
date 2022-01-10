export const state = () => ({
    resumeInformation: {}
    // resumeInformation: {
    //     personalInfo:
    //         { email: "fsdasdf@fasd.co", phone: "77543", city: "lkfad", address: "jklasdfk", maritalStatus: "Single", gender: "Woman", birthYear: "1992", _id: 1641821235276 },
    //     aboutMe: "asdffas sf",
    //     workExperiences: [
    //         { menuDateFrom: false, menuDateTo: false, datePickerFrom: "2022-02", datePickerTo: "2022-11", jobTitle: "asf", companyName: "asf", editingMode: false, _id: 1641821254028, description: "asdfsdaf" },
    //         { menuDateFrom: false, menuDateTo: false, datePickerFrom: "2022-02", datePickerTo: "2022-11", jobTitle: "asf", companyName: "asf", editingMode: false, _id: 1641821254028, description: "asdfsdaf" }],
    //     skills: ["asf", "fas", "fas"],
    //     educational: [{ menuDateFrom: false, menuDateTo: false, datePickerFrom: "2022-02", datePickerTo: "2022-12", studyField: "asfd", institution: "asfd", grade: "3", editingMode: false, _id: 1641821262261, description: "asfd" }, { menuDateFrom: false, menuDateTo: false, datePickerFrom: "2022-02", datePickerTo: "2022-12", studyField: "asfd", institution: "asfd", grade: "3", editingMode: false, _id: 1641821262261, description: "asfd" }],
    //     languages: [{ name: "fasas", level: "Intermediate", _id: 1641821280676, editingMode: false }, { name: "asfasd", level: "Advance", _id: 1641821284892, editingMode: false }]
    // }
})

export const mutations = {
    setResumeInformations(state, payload) {
        debugger
        state.resumeInformation = { ...payload }
    }
}
