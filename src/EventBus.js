
import { ref } from 'vue';
const eventBus = ref({});

export const EventBus = {
    emit(event, ...args) {
        if (eventBus.value[event]) {
            eventBus.value[event].forEach((callback) => {
                callback(...args);
            });
        }
    },
    on(event, callback) {
        if (!eventBus.value[event]) {
            eventBus.value[event] = [];
        }
        eventBus.value[event].push(callback);
    },
    off(event, callback) {
        if (eventBus.value[event]) {
            const index = eventBus.value[event].indexOf(callback);
            if (index !== -1) {
                eventBus.value[event].splice(index, 1);
            }
        }
    },
};
