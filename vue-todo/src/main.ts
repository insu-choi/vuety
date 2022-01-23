import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
    render: (h) => h(App),
}).$mount('#app');

/**
 * 할 일 리스트 업 (CRUD)
 * - 조회
 * - 추가
 * - 수정
 * - 삭제
 */
