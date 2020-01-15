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
  let prevView;
  let viewComponent;

  $: {
    view = viewList[view] ? view : 'home';
    viewComponent = viewList[view];
    sleep(blurDuration + 50)
      .then(() => prevView = view);
  }

</script>

{#if prevView === view}
  <div
    class='content'
    style='display: flex; width: 100%;'
    transition:blur={{ duration: blurDuration }}
  ><svelte:component this={viewComponent} /></div>
{/if}