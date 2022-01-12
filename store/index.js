export const state = () => ({
    resumeInformation: {}
})

export const mutations = {
    setResumeInformations(state, payload) {
        state.resumeInformation = { ...payload }
    }
}
