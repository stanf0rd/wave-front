<script>
  export let src;
  export let title;

  let started = false;
  let active = false;

  export function start() {
    started = true;
    active = true;
  }

  export function pause() {
    active = false;
  }

  export function resume() {
    active = true;
  }

</script>

<style src='./Frame.pcss'></style>

{#if !started}
  <h1>{title}</h1>
{:else}
  <iframe class='frame' {src} {title} frameborder="0"></iframe>
{/if}
