import { ref, onUnmounted } from 'vue';

export const useToast = () => {
    const showToast = ref(true);
    const toastMessage = ref("");
    const toastAllertType = ref("");
    const timeout = ref("");
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