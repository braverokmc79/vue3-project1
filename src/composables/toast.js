import { computed } from 'vue';
import { useStore } from 'vuex';

export const useToast = () => {
    const store = useStore();
    const toastMessage = computed(() => store.getters['toast/toastMessageWithSmile'] );
    const toastAllertType = computed(() => store.state.toast.toastAllertType);
    const showToast = computed(() => store.state.toast.showToast);
   
    const triggerToast = (message, type = "success") => {
        store.dispatch('toast/triggerToast', message, type);
   };

    
   return {
        toastMessage,
        toastAllertType,
        showToast,
        triggerToast
    }
}