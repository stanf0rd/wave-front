<script>
  export let apps;
  $: console.log(apps);
</script>

<style src='./Grid.pcss'></style>

<div class='grid'>
  {#each apps as app}
    {app}
  {/each}
</div>
