<script>
  export let list;
  $: console.log(list)
</script>

<style src='./List.pcss'></style>

<ul class='list'>
{#each list as item}
  <li class='list__item'>{ item }</li>
{/each}
</ul>
