<script>
  import Clock from '../Clock/Clock.svelte';

  let online;

</script>

<style src='./Iconblock.pcss'></style>

<svelte:window bind:online />
<div class='iconblock'>
  <div class='iconblock__icon material-icons-round'>
    {#if online}
      signal_wifi_4_bar
    {:else}
      signal_wifi_off
    {/if}
  </div>
  <Clock />
</div>