export default {

    namespaced: true,

    state: {
        toasts:[],
        toastMessage: "",
        toastAllertType: "",
        showToast: false
    },
    mutations: {

        UPDATE_TOAST_MESSAGE(state, payload) {
            state.toastMessage = payload;
        },

        UDATE_TOAST_ALERT_TYPE(state, payload) {
            state.toastAllertType = payload;
        },

        UPDATE_TOAST_STATUS(state, payload) {
            state.showToast = payload;
        },


        ADD_TOAST(state, payload) {
            state.toasts.push(payload);
        },


        REMOVE_TOAST(state) {
            state.toasts.shift();
        }


    },
    actions: {
        triggerToast({ commit }, message, type = "success") {

            // commit("UPDATE_TOAST_MESSAGE", message);
            // commit("UDATE_TOAST_ALERT_TYPE", type);
            // commit("UPDATE_TOAST_STATUS", true);

            commit('ADD_TOAST', {
                id:Date.now(),
                message,
                type
            })


            setTimeout(() => {
                // commit("UPDATE_TOAST_MESSAGE", '');
                // commit("UDATE_TOAST_ALERT_TYPE", '');
                // commit("UPDATE_TOAST_STATUS", false);
                commit('REMOVE_TOAST');

            }, 8000);
        },
    },
    getters: {
        toastMessageWithSmile(state) {
            return state.toastMessage + "^-^";
        }
    },

}