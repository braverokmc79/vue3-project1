import { createStore } from 'vuex'

export default createStore({
  state: {  
    toastMessage : "",
    toastAllertType: "",
    showToast: false,
    timeout  :null
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

    UDATE_TOAST_TIMEOUT(state, payload) {
      state.timeout = payload;
    }




  },
  actions: {
    triggerToast({ commit} , message, type = "success") {

      commit("UPDATE_TOAST_MESSAGE", message);

      commit("UDATE_TOAST_ALERT_TYPE", type);
      commit("UPDATE_TOAST_STATUS", true);

      commit("UDATE_TOAST_TIMEOUT", message);

      // timeout.value = setTimeout(() => {
      //   commit("UPDATE_TOAST_MESSAGE", '');
      //   commit("UDATE_TOAST_ALERT_TYPE", '');
      //   commit("UPDATE_TOAST_STATUS", false);
      //   commit("UPDATE_TOAST_MESSAGE", timeout);        
      // }, 3000);


    }


  },
  modules: {
  }
})
