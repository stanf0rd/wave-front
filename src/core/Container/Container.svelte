<script>
  export let targetDiv;
  let hidden = true;

  export function hide() {
    hidden = true;
  }

  export function show() {
    hidden = false;
  }

  export function getTarget() {
    return targetDiv;
  }
</script>

<style src='./Container.pcss'></style>

<div
  class:container__hidden={hidden}
  class='container'
  bind:this={targetDiv}
/>
