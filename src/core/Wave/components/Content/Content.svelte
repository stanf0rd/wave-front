<script>
  import Home from '../Home/Home.svelte';
  import Store from '../Store/Store.svelte';

  // constants
  const viewList = {
    home: Home,
    store: Store,
  };

  // props
  export let view;

  // state
  let viewComponent;
  $: viewComponent = viewList[view] || viewList['home'];
</script>

<svelte:component this={viewComponent} />
