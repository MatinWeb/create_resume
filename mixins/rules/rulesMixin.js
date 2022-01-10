export default {
    data() {
        return {
            rules: {
                required: (value) => {
                    const errorMessage = "The field is required"
                    return !!value || errorMessage
                },
                email: (value) => {
                    const errorMessage = 'Email is invalid'
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return !value || pattern.test(value.trim()) || errorMessage
                },
                phone: (value) => {
                    const errorMessage = 'Phone number is invalid'
                    const pattern = /^(0|[0-9]*)$/
                    return !value || pattern.test(value) || errorMessage
                },
                year: (value) => {
                    const errorMessage = 'Year of birth is invalid (it should be between 1910 - 2040)'
                    const pattern = /^(19[1-9]\d|20[0-3]\d|2040)$/
                    return !value || pattern.test(value) || errorMessage
                }
            }
        }
    }
}