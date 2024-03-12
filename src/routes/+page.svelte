<!-- Svelte page for uocalendar -->
<!-- Generic html for a single page website with a file upload box where the user can upload an .htm file -->
<script>
// @ts-nocheck
  import Header from "../components/header.svelte";
	import Tutorial from "../components/tutorial.svelte";
	import Upload from "../components/upload.svelte";
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="h-screen">
  <Header />
  <div class="flex h-5/6">
    <Upload/>
    <Tutorial/>
  </div>
  <p class="block text-center">Check out <a class="text-sky-700" href="https://www.uschedule.me">uschedule.me</a> for easier course planning with ics export capabilities!
  </p>
  <p class="block text-center">For any issues: <a class="text-sky-700" href="https://forms.gle/6Z3c4hQYrrsp5nkn7">Contact form</a>
  </p>
</div>
