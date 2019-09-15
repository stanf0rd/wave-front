<script>
  import { afterUpdate, onMount } from 'svelte';

  import { sleep } from '../../../../modules/utils';
  import preparer from '../../../../modules/prepare';
  import { globalBus } from '../../../../modules/bus';

  import Header from '../Header/Header.svelte';
  import Content from '../Content/Content.svelte';
  import Menu from '../Menu/Menu.svelte';

  export let view;
  export let blurred = true;

  let root;

  async function waitForTransitionEnd() {
    await new Promise(resolve => {
      root.addEventListener(
        'transitionend', resolve, {once: true},
      );
    });
  }

  async function blur() {
    root.classList.add('layout_blurred');
    await waitForTransitionEnd();
  }

  async function unblur() {
    root.classList.remove('layout_blurred');
    await waitForTransitionEnd();
  }

  async function prepareAnimation() {
    // await for some unknown shit...
    await sleep(10);
    await unblur();
    await blur();
  }

  onMount(() => {
    preparer.add('Layout blurring', prepareAnimation());
  });
</script>

<style src='./Layout.pcss'></style>

<div
  class='layout'
  class:layout_blurred={blurred}
  bind:this={root}
>
  <div class='layout__item layout__header'>
    <Header />
  </div>
  <div class='layout__item layout__content'>
    <Content {view} />
  </div>
  <div class='layout__item layout__menu'>
    <Menu />
  </div>
</div>
