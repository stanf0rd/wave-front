<script>
  import { globalBus } from '../../modules/bus';

  // settings
  const text = 'WAVE:dev';
  const interval = 2;

  // elements
  let arrayAnimation;
  let offsetAnimation;
  let loader;

  // state
  let hidden = false;
  let removed = false;
  let repeat = 'indefinite';

  function stop() {
    return new Promise((resolve, reject) => {
      offsetAnimation.addEventListener('beginEvent', () => {
        offsetAnimation.endElementAt(interval/2);
        arrayAnimation.endElementAt(interval/2);
      }, { once: true });

      offsetAnimation.addEventListener('endEvent', () => {
        setTimeout(resolve, 1000);
      }, { once: true });
    });
  }

  globalBus.on('ready', () => {
    stop().then(() => {
      hidden = true;
        globalBus.emit('loaderHidden');
      loader.addEventListener('transitionend', () => {
        removed = true;
      }, { once: true });
    })
  });
</script>

<style src='./Loader.pcss'></style>

{#if !removed}
  <div
    bind:this={loader}
    class='loader'
    class:loader_hidden={hidden}
  >
    <svg
      width='640'
      height='150'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlns:xlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 300 70'
      xml:space='preserve'
    >
      <text
        transform='matrix(1 0 0 1 2.7 42)'
        class='loader__text'
        text-anchor="middle"
        x='50%'
      >
        {text}
        <animate
          attributeName='stroke'
          begin='0s'
          from='black'
          dur='0.1'
          to='#ADFF2F'
          restart='never'
          fill='freeze'
        />
        <animate
          bind:this={offsetAnimation}
          accumulate='none'
          additive='replace'
          attributeName='stroke-dashoffset'
          begin='0s'
          calcMode='linear'
          dur={interval}
          fill='remove'
          keyTimes='0;0.5;1'
          repeatCount={repeat}
          restart='always'
          values='-200;0;0'
        />
        <animate
          bind:this={arrayAnimation}
          accumulate='none'
          dditive='replace'
          attributeName='stroke-dasharray'
          begin='0s'
          calcMode='spline'
          dur={interval}
          fill='remove'
          keySplines='0.3 0 0.7 1;0.3 0 0.7 1'
          keyTimes='0;0.5;1'
          repeatCount={repeat}
          restart='always'
          values='0 350;350 350;0 350'
        />
      </text>
    </svg>
  </div>
{/if}
