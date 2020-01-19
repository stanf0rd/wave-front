<script>
  export let main;

  let hidden = true;
  let appContainers = [];

  function getContainer(appName) {
    const target = appContainers[appName];

    if (target) return target;

    throw new Error('No such app');
  }

  export function hide(appName) {
    const container = getContainer(appName);
    container.classList.add('subcontainer__hidden')

    hidden = true;
  }

  export function show(appName) {
    const container = getContainer(appName);
    container.classList.remove('subcontainer__hidden')

    hidden = false;
  }

  export function createContainer(appName) {
    const container = document.createElement('div');
    container.classList.add('subcontainer');
    appContainers[appName] = container;
    main.appendChild(container);

    return container;
  }

</script>

<style src='./Container.pcss'></style>

<div
  class:container__hidden={hidden}
  class='container'
  bind:this={main}
/>
