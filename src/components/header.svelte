<script>
  import { onMount } from 'svelte';
  import './header.css';
  import geegeeIcon from '$lib/assets/geegee.png'
</script>
<style>
  header {
    background-color: rgb(101, 29, 50);
  }
</style>
<header>
    <nav class="navbar flex flex-row justify-between">
      <img src={geegeeIcon} alt="GeeGee Icon" class="w-20 h-16 p-3" />
      <p class="text-3xl text-center font-bold self-center mx-auto text-white ">UOCalendar</p>
    </nav>
</header>