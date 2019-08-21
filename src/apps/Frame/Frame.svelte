<script>
  export let src;
  export let title;

  let started = false;

  export function start() {
    started = true;
  }

</script>

<style src='./Frame.pcss'></style>

{#if !started}
  <h1>{title}</h1>
{:else}
  <iframe class='frame' {src} {title}></iframe>
{/if}
