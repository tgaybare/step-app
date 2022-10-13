import { defineStore } from "pinia";
import { RoutineApi } from "@/api/routine";

export const useRoutineStore = defineStore("routine", {
    state: () => ({
        items: [] }
    ),
    getters: {
        findIndex() {
            return (routine) => {
                return this.items.findIndex(item => item.id === routine.id)
            }
        },
    },
    actions: {

        //estos son locales
        push(routine) {
            this.items.push(routine);
        },
        replace(index, routine) {
            this.items[index] = routine;
        },
        splice(index) {
            this.items.splice(index, 1);
        },
        replaceAll(routine) {
            this.items = routine;
        },


        //estos usan la api
        async create(routine) {
            const result = await RoutineApi.add(routine);
            if (!this.findIndex(result))
                this.push(result);
            return result;
        },
        async modify(routine) {
            const result = await RoutineApi.modify(routine);
            const index = this.findIndex(result);
            if (index >= 0)
                this.replace(index, result);
            return result;
        },
        async delete(routine) {
            await RoutineApi.delete(routine.id);
            const index = this.findIndex(routine);
            if (index >= 0)
                this.splice(index);
        },
        async get(routine) {
            const index = this.findIndex(routine);
            if (index >= 0)
                return this.items[index];

            const result = await RoutineApi.get();
            this.push(result);
            return result;
        },
        async getAll(controller) {
            const result = await RoutineApi.getAll(controller);
            return result;
        }
    },
});