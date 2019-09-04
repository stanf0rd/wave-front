<script>
  import Tile from './Tile/Tile.svelte';
  export let tiles = [
    { link: '/home', caption: 'Home', icon: 'home' },
    { link: '/store', caption: 'Store', icon: 'shop' },
  ]; // mock
</script>

<style src='./Menu.pcss'></style>

<div class='menu'>
  {#each tiles as tile}
    <Tile {...tile} />
  {/each}
</div>
