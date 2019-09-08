<script>
  export let enabled = false;
  export let hidden = true;

  let stickedOut;
  let hideTimer;

  function dropHideTimer() {
    clearInterval(hideTimer);
  }

  function runHideTimer() {
    dropHideTimer();
    hideTimer = setTimeout(() => {
      hidden = true;
    }, 3000);
  }

  $: if (enabled) {
    runHideTimer();
    hidden = false;
  } else {
    dropHideTimer();
    hidden = true;
  }
</script>

<style src='./Bar.pcss'></style>

<div
  class='bar__activator'
  class:bar__activator_hidden={!enabled || !hidden}
  on:mouseover={() => {
    dropHideTimer();
    stickedOut = true;
  }}
  on:mouseout={() => {
    runHideTimer();
    stickedOut = false;
  }}
/>

<div
  class='bar'
  class:bar_hidden={hidden}
  class:bar_sticked-out={stickedOut}
  on:mouseover={() => {
    hidden = false;
    dropHideTimer();
  }}
  on:mouseout={runHideTimer}
>
  <a
    class='bar__icon material-icons-round'
    href='/last'
  >home</a>
</div>
