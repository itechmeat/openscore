<template>
  <div class="layout">
    <slot name="header" />
    <main>
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: $c_bg;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
