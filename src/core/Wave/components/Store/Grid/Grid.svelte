<script>
  import App from './App/App.svelte';

  export let apps;
  $: console.log(apps);
</script>

<style src='./Grid.pcss'></style>

<div class='grid'>
  {#each apps as app}
    <App />
  {/each}
</div>
