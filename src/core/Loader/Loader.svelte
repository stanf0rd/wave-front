<script>
  import { globalBus } from '../../modules/bus';

  let hidden = false;

  globalBus.on('ready', () => {
    hidden = true;
    globalBus.emit('loaderHidden');
  });
</script>

<style src='./Loader.pcss'></style>

{#if !hidden}
  <div class="loader">...loading</div>
{/if}
