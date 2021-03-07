<template>
  <div class="loader">
    <div class="spinner-container">
      <div class="spinner"></div>
      <div class="spinner"></div>
      <div class="spinner"></div>
    </div>
    <p>my<br>expenses</p>
  </div>
</template>

<script>
export default {
  name: "Loader",
}
</script>

<style lang="scss">
$animation-count: infinite;
$duration: 1s;

.loader {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 10;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;

  .spinner-container {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .spinner {
    border: 3px solid transparent;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    animation: sp1n linear $animation-count;

    &:nth-child(1) {
      width: 100px;
      height: 100px;
      border-top-color: var(--link-color);
      border-bottom-color: var(--link-color);
      animation-duration: 1.5s;
    }
    &:nth-child(2) {
      width: 120px;
      height: 120px;
      border-top-color: var(--link-color);
      border-bottom-color: var(--link-color);
      animation-duration: 2s;
    }
    &:nth-child(3) {
      width: 140px;
      height: 140px;
      border-left-color: var(--link-color);
      border-right-color: var(--link-color);
      animation-duration: 2.5s;
    }
  }
}

@keyframes sp1n {
  0%  { transform: translate(-50%, -50%) rotate(0deg); }
  100%  { transform: translate(-50%, -50%) rotate(360deg); }
}
</style>
