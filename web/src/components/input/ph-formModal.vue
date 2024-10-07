<script setup>
import {ref} from "vue";

const DrawerStatus = ref(false)
const props = defineProps({
  title:{type:String},
  width:{type:String},
  cancelText:{type:String},
  okText:{type:String},
  okEvent:{type:Function},
  cancelEvent:{type:Function},
  hideButton:{type:Boolean,default:false}
})
</script>

<template>
  <div @click="DrawerStatus = true">
    <slot name="show_modal">
    </slot>
  </div>

  <div v-if="DrawerStatus">
    <a-modal
        @ok="okEvent"
        @cancel="DrawerStatus=false"
        v-model:open="DrawerStatus"
        :width="width"
        :title="title"
        :cancel-text="cancelText"
        :ok-text="okText"
        :ok-button-props="{hidden:hideButton}"
        :cancel-button-props="{hidden:hideButton}"
    >
      <slot>
      </slot>
    </a-modal>
  </div>
</template>

<style scoped>

</style>