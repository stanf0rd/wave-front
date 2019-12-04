<script>
  export let link;
  export let caption;
  export let background;
</script>

<style src='Tile.pcss'></style>

<a href={link} class='tile' title={caption}>
  <img
    class='tile__card'
    src={background}
    alt={caption}
  />
</a>
