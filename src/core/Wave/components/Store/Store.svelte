<script>
  import Title from '../Title/Title.svelte';
  import List from './List/List.svelte';
  import Grid from './Grid/Grid.svelte';
  import Description from './Description/Description.svelte';

  import { store } from '/modules/data';

  let apps;
  let categories;
  $: categories = $store.categories;
  $: apps = $store.apps;

  $: console.log(apps);
</script>

<style src='./Store.pcss'></style>

{#if categories && apps}
  <div class='store'>
    <div class='store__left'>
      <Title text='Store' />
      <List list={categories} />
    </div>
    <Grid {apps} />
    <Description />
  </div>
{/if}
