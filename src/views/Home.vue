<template>
  <div class="h-screen bg-gray-800">
    <div class="relative overflow-auto p-8">
      <div class="grid grid-cols-2 gap-8">
        <div class="bg-gray-200 rounded-lg p-4">
          <ravencoin />
        </div>
        <div class="bg-gray-200 rounded-lg p-4">
          <flux />
        </div>
      </div>
    </div>
    <div class="relative overflow-auto pb-8 px-8">
      <div class="bg-gray-200 rounded-lg p-4">
        <total />
      </div>
    </div>
  </div>
</template>

<script>
import Flux from "@/components/Flux.vue";
import Ravencoin from "@/components/Ravencoin.vue";
import Total from "@/components/Total.vue";
export default {
  name: "Home",
  components: {
    Flux,
    Ravencoin,
    Total,
  },
};
</script>
