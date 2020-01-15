<script>
  function genSkeleton() {
    function genRand(left, right) {
      const range = right - left;
      return left + Math.round(range * Math.random());
    }

    const lines = [];
    const linesCount = genRand(6, 10);
    for (let i = 0; i !== linesCount; i += 1) {
      lines.push(genRand(0, 1) ? 'short' : 'long');
    }

    return lines;
  }
</script>

<style src='./Description.pcss'></style>

<div class='desc'>
  <div class='desc__head'>
    <div class='desc__cover material-icons-round'>pageview</div>
  </div>
  <div class='desc__content'>
    <div class='desc__skeleton'>
      <div class='desc__title'>
        <div class={`line line__short`}></div>
      </div>
      {#each genSkeleton() as length}
        <div class={`line line__${length}`}></div>
      {/each}
    </div>
    <div class='desc__button'>
      <div class={`line line__short`}></div>
    </div>
  </div>
</div>
