<script lang="ts" setup>
import { LoaderCircle } from 'lucide-vue-next';
</script>

<template>
  <teleport to="body">
    <div class="container-loader">
      <div class="loader">
        <LoaderCircle :size="60" />
      </div>
    </div>
  </teleport>
</template>

<style lang="scss">
.container-loader {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  animation: rotate-animation 3s linear infinite;
}

.loader svg {
  color: var(--primary);
  animation: rotate-animation 3s linear infinite;
}

@keyframes rotate-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
