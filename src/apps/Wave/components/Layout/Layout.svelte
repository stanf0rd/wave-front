<script>
  import Header from '../Header/Header.svelte';
  import Content from '../Content/Content.svelte';
  import Menu from '../Menu/Menu.svelte';

  export let view;

</script>

<style src='./Layout.pcss'></style>

<div class='layout'>
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
