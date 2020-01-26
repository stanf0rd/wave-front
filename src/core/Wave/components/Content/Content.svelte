<script>
  import { tick } from 'svelte';
  import { blur } from 'svelte/transition';

  import { sleep } from '/modules/utils';

  import Home from '../Home/Home.svelte';
  import Store from '../Store/Store.svelte';

  // constants
  const viewList = {
    home: Home,
    store: Store,
  };

  const blurDuration = 150;

  // props
  export let view;

  // state
  let firstTime = true;
  let prevView;
  let viewComponent;

  $: {
    view = viewList[view] ? view : 'home';
    viewComponent = viewList[view];

    if (firstTime) {
      prevView = view;
      firstTime = false;
    }
  }

</script>

{#if prevView === view}
  <div
    class='content'
    style='display: flex; width: 100%;'
    transition:blur={{ duration: blurDuration }}
    on:outroend={() => prevView = view}
  ><svelte:component this={viewComponent} /></div>
{/if}
