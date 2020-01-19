<script>
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

<style src='./Terminal.pcss'></style>

<div></div>

{#if !started}
  <h1>Terminal</h1>
{:else}
  <div class='terminal'>Terminal started</div>
{/if}
