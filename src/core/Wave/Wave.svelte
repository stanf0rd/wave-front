<script>
  import { globalBus } from '../../modules/bus';
  import Layout from './components/Layout/Layout.svelte';
  import Bar from './components/Bar/Bar.svelte';

  const viewList = [
    'home',
    'store',
    'about',
    'last',
  ]

  export let view = 'home';

  let active = false;
  let blurred;
  let barHidden;

  let lastView = view;
  $: if (!view || !viewList.includes(view)) {
    view = 'home';
  } else if (view === 'last') {
    view = lastView;
  } else {
    lastView = view;
  }

  $: {
    console.log(`status changed: active = ${active}`);
    blurred = !active;
    barHidden = active;
  }

  export function activate() {
    active = true;
  }

  export function deactivate() {
    active = false;
  }

  $: console.log(view);

</script>

<style src='./Wave.pcss'></style>

<svelte:options accessors={true} />
<Bar hidden={barHidden} />
<Layout view={view || 'home'} {blurred} />
