<script>
  import Header from '../Header/Header.svelte';
  import Content from '../Content/Content.svelte';
  import Menu from '../Menu/Menu.svelte';

  export let view;
  export let blurred;
</script>

<style src='./Layout.pcss'></style>

<div class='layout' class:layout_blurred={blurred}>
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
