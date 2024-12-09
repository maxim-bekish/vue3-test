<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { ITab } from '../types';

const activeBtn = ref('1');
const props = defineProps<{
  tabs: Record<string, ITab>;
}>();

const { tabs } = toRefs(props);

const setActive = (btn: string) => {
  activeBtn.value = btn;
  emit('update:activeBtn', btn);
};

const emit = defineEmits<{
  (e: 'update:activeBtn', btn: string): void;
}>();
</script>

<template>
  <div class="block__tabs">
    <v-button
      v-for="tab in Object.values(tabs)" 
      :key="tab.code"
      :active="activeBtn === tab.code"
      variant="tab"
      @click="setActive(tab.code)">
      {{ tab.name }}
    </v-button>
  </div>
</template>

<style lang="scss" scoped>
.block {
	&__tabs {
		padding: 2px;
		border-radius: 6px;
		background-color: var(--asideHeader);
		display: flex;
	}
}
</style>
