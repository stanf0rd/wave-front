<script>
  import { globalBus } from '../../modules/bus';
  import Layout from './components/Layout/Layout.svelte';

  export let view = 'home';
  let blurred = true;

  $: console.log({ view });

  globalBus.on('loaderHidden', () => {
    blurred = false;
  });
</script>

<style src='./Wave.pcss'></style>

<Layout view={view || 'home'} {blurred} />
