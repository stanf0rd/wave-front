<script>
  import Tile from './Tile/Tile.svelte';
  export let tiles = [
    { link: '/snake', caption: 'Snake' },
    { link: '/chess', caption: 'Chess' },
    { link: '/test', caption: 'Test' },
  ]; // mock
</script>

<style src='./Feed.pcss'></style>

<div class='feed'>
  {#each tiles as tile}
    <Tile {...tile} />
  {/each}
</div>
