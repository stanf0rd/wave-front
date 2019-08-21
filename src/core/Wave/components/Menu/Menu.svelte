<script>
  import Tile from './Tile/Tile.svelte';
  export let tiles = [
    { link: '/home', caption: 'Home' },
    { link: '/store', caption: 'Store' },
  ]; // mock
</script>

<style src='./Menu.pcss'></style>

<div class='menu'>
  {#each tiles as tile}
    <Tile {...tile} />
  {/each}
</div>
