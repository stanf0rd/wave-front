<script>
  import Tile from './Tile/Tile.svelte';

  import { home } from '../../../../modules/data';

  let apps = [];
  $: apps = $home.apps;
</script>

<style src='./Feed.pcss'></style>

{#if apps}
  <div class='feed'>
    {#each apps as app}
      <Tile {...app} />
    {/each}
  </div>
{/if}
