<script>
  import { globalBus } from '../../modules/bus';

  let hidden = false;

  const hidePromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 1000);
  });

  globalBus.on('ready', () => {
    hidePromise.then(() => {
      hidden = true;
      globalBus.emit('loaderHidden');
    })
  });
</script>

<style src='./Loader.pcss'></style>

{#if !hidden}
  <div class="loader">...loading</div>
{/if}
