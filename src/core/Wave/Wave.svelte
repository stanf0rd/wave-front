<script>
  import { globalBus } from '../../modules/bus';
  import Layout from './components/Layout/Layout.svelte';

  export let view = 'home';
  let blurred = true;

  export function blur() {
    blurred = true;
  }

  export function unblur() {
    blurred = false;
  }

  $: console.log({ view });

</script>

<style src='./Wave.pcss'></style>

<Layout view={view || 'home'} {blurred} />
