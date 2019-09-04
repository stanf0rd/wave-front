<script>
  export let link;
  export let caption;
  export let icon;
  export let background;

  // TODO: background feature
</script>

<style src='Tile.pcss'></style>

<a href={link} class='tile'>
  {#if background}
    <img
      class='tile__card'
      src={background}
      alt={caption}
    />
  {:else}
    <div class='tile__card'>
      <i class='tile__icon material-icons-round'>{icon || 'error_outline'}</i>
    </div>
  {/if}
  <p class='tile__caption'>{caption}</p>
</a>
