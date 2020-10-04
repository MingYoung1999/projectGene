<template>
    <div>
      <transition name="bounce">
        <list v-if="isShowList" @onClickShowDetail="onClickShowDetail"/>
      </transition>
      <transition name="detail">
        <detail v-if="isShowDetail" :ID="ID" :patientData="patientData" @onClickBack="onClickBack"/>
      </transition>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import detail from '@/components/main/detail';
import list from '@/components/main/list';
export default {
    layout: "main",
    components: {
        list,
        detail,
    },
    data(){
        return{
            patientData: {},
            ID: "",
            isShowList: true,
            isShowDetail: false,
        };
    },
    methods:{
        onClickShowDetail(row) {
          this.patientData = row;
          this.ID = row.patient_ID;
          this.isShowList = false;
          setTimeout(() => {
              this.isShowDetail = true;
          }, 1)
        },
        onClickBack() {
            this.isShowDetail = false;
            setTimeout(() => {
                this.isShowList = true;
            }, 1)
        },
    },
    computed:{
        ...mapGetters("modules/auth/", ["token", "auth"]),
    },
    mounted(){
      if(this.auth !== "staff"){
        this.$router.push('/');
      }
    },
}
</script>

<style lang="scss" scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-out 0.1s reverse;
}
.detail-enter-active {
  animation: detail-out 0.5s;
}
.detail-leave-active {
  animation: detail-in 0.1s reverse;
}
@keyframes bounce-out {
  0% {
    opacity: 0;
    transform: translateX(-1000px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: translateX(-1000px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
@keyframes detail-out {
  0% {
    opacity: 0;
    transform: translateX(1000px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
@keyframes detail-in {
  0% {
    opacity: 0;
    transform: translateX(1000px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>