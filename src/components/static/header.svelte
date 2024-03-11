<script>
  import { onMount } from 'svelte';
  import './header.css';
  import geegeeIcon from '$lib/assets/geegee.png'
</script>
<header>
    <nav class="navbar">
      <img src={geegeeIcon} alt="GeeGee Icon" class="w-20 h-16 p-3" />
    </nav>
</header>