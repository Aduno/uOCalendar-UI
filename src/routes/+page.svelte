<!-- Svelte page for uocalendar -->
<!-- Generic html for a single page website with a file upload box where the user can upload an .htm file -->
<script>
// @ts-nocheck
  import { preventDefault, handleInsert, handleDrop, selectedFile } from '$lib/scripts/dropbox.js';
  import { currentPage, totalPages, goToNextPage, goToPreviousPage, tutorialContentImg, tutorialContentText } from '$lib/scripts/tutorial.js';
  import Header from "../components/static/header.svelte";
  import ArrowLeft from '$lib/assets/icons/arrow-left.svelte'
  import ArrowRight from '$lib/assets/icons/arrow-right.svelte'
  import { onMount } from 'svelte';

  onMount(() => {
    const uploadBox = document.getElementById('upload-box');
    if (uploadBox) {
      uploadBox.scrollIntoView();
    }
  });
</script>

<style>
  #upload-box {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    @media screen and (max-width: 600px){
      width: 100%;
    }
  }
  #tutorial-box {
    @media screen and (max-width: 600px){
      width: 100%;
    }
  }
</style>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="h-screen">
  <Header />
  <div class="flex h-5/6">
    <div id="upload-box-container" class="flex-auto sm: w-full lg:w-6/12 self-center" on:dragover={preventDefault} 
      on:dragenter={preventDefault} on:drop={handleInsert}>
      <div id="upload-box" class="h-[500px] m-10 flex flex-col items-center text-center justify-center">
        <h1>Drag and drop <b>or</b> upload .htm File</h1>
        <input class="text-sm pl-12" id="files" type="file" accept=".htm" on:change={handleDrop}>        
        {#if selectedFile}
          <p>Uploaded file: {selectedFile.name}</p>
        {/if}
      </div>
    </div>
    <div id="tutorial-box" class="flex-row flex-auto w-5/12 sm:w-full lg:w-5/12 self-center">
      <div>      
        <h1 class="text-center text-xl font-bold">How to use</h1>
        <hr>
        <p class="text-center p-2">{tutorialContentText}</p>
        <hr>
      </div>
      <div class="flex justify-center items-center h-[400px]">
        <img class="justify-self-center flex-1 px-20" src={tutorialContentImg} alt="Tutorial images"/>
      </div>
      <div class="flex justify-evenly">
        <button class="nav-btn" on:click={goToPreviousPage}><ArrowLeft/></button>
        <p class="text-center text-sm p-2">Page {currentPage} of {totalPages}</p>
        <button class="nav-btn" on:click={goToNextPage}><ArrowRight/></button>
      </div>
    </div>
  </div>
</div>
