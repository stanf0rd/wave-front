<script>
  import { onMount, onDestroy } from 'svelte';

  let time = getTimeString();
  let timer;

  function getTimeString() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  onMount(() => {
    const date = new Date();
    setTimeout(() => {
      time = getTimeString();

      timer = setInterval(() => {
        time = getTimeString();
      }, 60 * 1000);
    }, (60 - date.getSeconds()) * 1000);
  })

  onDestroy(() => clearInterval(timer));

</script>

<style src='./Clock.pcss'></style>

<div class='clock'>{ time }</div>
