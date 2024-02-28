<script>
  import { onMount } from 'svelte';
  import './header.css';
  import step1 from '$lib/assets/step-1.png'
  import step2 from '$lib/assets/step-2.png'
  import step3 from '$lib/assets/step-3.png'
  import step4 from '$lib/assets/step-4.png'

  let isModalOpen = false;
  let currentPage = 1;
  let tutorialContent = step1;
  const totalPages = 4;

  function openModal() {
    isModalOpen = true;
    console.log("Modal opened")
  }

  function closeModal() {
    isModalOpen = false;
  }

  function goToNextPage() {
    currentPage = currentPage === totalPages ? 1 : currentPage + 1;
    updateTutorialContent();
  }

  function goToPreviousPage() {
    currentPage = currentPage === 1 ? totalPages : currentPage - 1;
    updateTutorialContent();
  }

  function updateTutorialContent() {
    switch (currentPage) {
      case 1:
        tutorialContent = step1;
        break;
      case 2:
        tutorialContent = step2;
        break;
      case 3:
        tutorialContent = step3;
        break;
      case 4: 
        tutorialContent = step4;
        break;
      default:
        tutorialContent = step1;
        currentPage = 1;
    }
  }

  onMount(() => {
    const uploadBox = document.getElementById('upload-box');
    if (uploadBox) {
      uploadBox.scrollIntoView();
    }
  });

  function keydown(node, { key, handler }) {
    function onKeyDown(event) {
      if (event.key === key) {
        handler();
      }
    }

    node.addEventListener('keydown', onKeyDown);

    return {
      destroy() {
        node.removeEventListener('keydown', onKeyDown);
      }
    };
  }
</script>

<svelte:body use:keydown={{ key: 'Escape', handler: () => (isModalOpen = false) }} />

<header>
    <nav class="bg-gray-800">
        <ul class="flex items-center justify-between px-4 py-2">
            <li>
              <!-- Replace this with an icon instead of a link -->
                <a href="#upload-box" class="text-white">Home</a>
            </li>
            <li>
                <button on:click={openModal} class="px-4 py-2 text-white bg-blue-500 rounded">How to Use</button>
            </li>
        </ul>
    </nav>

  {#if isModalOpen}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <button class="modal-overlay" on:click={closeModal}>
      <button class="modal" on:click={e=>e.stopPropagation()}>
        <div class="close-header">
          <!-- Change this to a proper icon later -->
          <button class="close-button" on:click={closeModal}>X</button>
        </div>
        <div class="page">
          <h2>Page {currentPage}</h2>
          <img src={tutorialContent} alt="Tutorial images"/>
        </div>
        <div class="modal-navigation">
          <!-- Change this to proper icons -->
          <button class="model-nav-btn" on:click={goToPreviousPage}>&lt;</button>
          <button class="model-nav-btn" on:click={goToNextPage}>&gt;</button>
        </div>
      </button>
    </button>
  {/if}
</header>