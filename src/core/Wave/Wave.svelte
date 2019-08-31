<script>
  import { onMount } from 'svelte';

  import { globalBus } from '../../modules/bus';
  import Layout from './components/Layout/Layout.svelte';
  import Bar from './components/Bar/Bar.svelte';

  const viewList = [
    'home',
    'store',
    'about',
    'last',
  ];

  export let view = 'home';

  export function activate() {
    active = true;
  }

  export function deactivate() {
    active = false;
  }

  let active = false;
  let barEnabled = false;
  let started = false;
  let lastView = view;

  onMount(() => globalBus.on('loaderHidden', () => {started = true}, true));

  $: {
    if (!view || !viewList.includes(view)) {
      view = 'home';
    } else if (view === 'last') {
      view = lastView;
    } else {
      lastView = view;
    }

    console.log(view);
  }

  $: {
    console.log(`MainApp status changed: active = ${active}`);
    barEnabled = started && !active;
  }
</script>

<style src='./Wave.pcss'></style>

<svelte:options accessors={true} />
<Bar enabled={barEnabled} />
<Layout view={view || 'home'} blurred={!active} />
