import { defineStore } from 'pinia'

export default defineStore("location", {
    state: () => ({
        location: 1
    }),
    getters: {
        locationInfo() {
            return `現在位置${this.location}`
        }
    },
    actions: {
        setLocation(num) {
            this.location = num;
        }
    }
})