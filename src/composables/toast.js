import { computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => {
    const store = useStore();
  
    const toastMessage = computed(() => store.state.toastMessage);
    const toastAllertType = computed(() => store.state.toastAllertType);
    const showToast = computed(() => store.state.showToast);
    const timeout = computed(() => store.state.timeout);


    const triggerToast = (message, type = "success") => {
        toastMessage.value = message;
        toastAllertType.value = type;
        showToast.value = true;
        timeout.value = setTimeout(() => {
            toastMessage.value = "";
            toastAllertType.value = "";
            console.log("setTimeOut");
            showToast.value = false;
        }, 3000);
    };
    onUnmounted(() => {
        console.log("onUnmounted");
        clearTimeout(timeout.value);
    });
    return {
        toastMessage,
        toastAllertType,
        showToast,
        triggerToast
    }
}