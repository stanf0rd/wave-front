<script>
  export let link;
  export let caption;
  export let background;
</script>

<style src='Tile.pcss'></style>

<a href={link} class='tile'>
  <img
    class='tile__card'
    src={background}
    alt={caption}
  />
  <p class='tile__caption'>{caption}</p>
</a>
