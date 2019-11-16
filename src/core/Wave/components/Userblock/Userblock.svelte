<script>
  import user from '../../../../modules/user';

  import Avatar from '../Avatar/Avatar.svelte';

  let authorized;
  let username;
  let avatarSrc;

  $: {
    authorized = Boolean($user);
    if (authorized) {
      username = $user.username;
      avatarSrc = $user.avatarSrc;
    }
  }
</script>

<style src='./Userblock.pcss'></style>

<div class='userblock'>
  {#if authorized}
    <Avatar src={avatarSrc} />
  {/if}
  <p class='userblock__name'>{authorized ? username : 'Guest'}</p>
</div>
