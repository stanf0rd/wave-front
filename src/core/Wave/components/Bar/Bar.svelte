<script>
  export let hidden = true;

  let hideTimer;

  function dropHideTimer() {
    clearInterval(hideTimer);
  }

  function runHideTimer() {
    hideTimer = setTimeout(() => {hidden = true}, 3000);
  }

  $: if (!hidden) {
    runHideTimer();
  }
</script>

<style src='./Bar.pcss'></style>

<div
  class='bar'
  class:bar_hidden={hidden}
  on:mouseover={dropHideTimer}
  on:mouseout={runHideTimer}
>
  <a
    class='bar__icon material-icons-round'
    href='/last'
  >home</a>
</div>
