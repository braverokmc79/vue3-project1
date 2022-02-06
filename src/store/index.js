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

    // UDATE_TOAST_TIMEOUT(state, payload) {
    //   state.timeout = payload;
    // }




  },
  actions: {
    triggerToast({ commit} , message, type = "success") {

      commit("UPDATE_TOAST_MESSAGE", message);
      commit("UDATE_TOAST_ALERT_TYPE", type);
      commit("UPDATE_TOAST_STATUS", true);

      setTimeout(() => {
        commit("UPDATE_TOAST_MESSAGE", '');
        commit("UDATE_TOAST_ALERT_TYPE", '');
        commit("UPDATE_TOAST_STATUS", false);       
      }, 3000);

     // commit("UDATE_TOAST_TIMEOUT", timeout);

    },
    
  },

  getters: {
    toastMessageWithSmile(state) {
      return state.toastMessage + "^-^";
    }
  },



  modules: {


  }
})
