<script>
  import step1 from '$lib/assets/step-1.png'
  import step2 from '$lib/assets/step-2.png'
  import step3 from '$lib/assets/step-3.png'
  import step4 from '$lib/assets/step-4.png'
  import step5 from '$lib/assets/step-5.png'
  import step6 from '$lib/assets/step-6.png'
  import step7 from '$lib/assets/step-7.png'
  import ArrowLeft from '$lib/assets/icons/arrow-left.svelte'
  import ArrowRight from '$lib/assets/icons/arrow-right.svelte'
  let currentPage = 1;
  let tutorialContentImg = step1;
  let tutorialContentText = 'Navigate to the "My Class Schedule" through UOZone';

  const totalPages = 7;

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
        tutorialContentImg = step1;
        tutorialContentText = 'Navigate to the "My Class Schedule" through UOZone. Ensure it is in the "List View"';
        break;
      case 2:
        tutorialContentImg = step2;
        tutorialContentText = 'Right click on an empty part of the page and click save as'
        break;
      case 3:
        tutorialContentImg = step3;
        tutorialContentText = 'Navigate to the "My Weekly Schedule_files" folder, ignoring the "My Weekly Schedule" file';
        break;
      case 4: 
        tutorialContentImg = step4;
        tutorialContentText = "Upload the SA_LEARNER_SERVICES.htm file here"
        break;
      case 5:
        tutorialContentImg = step5;
        tutorialContentText = "Click on the 'Download Schedule' link to download the .ics file"
        break;
      case 6:
        tutorialContentImg = step6;
        tutorialContentText = "Go to google calendar and create new calendar. Same steps apply for different calendar apps"
        break;
      case 7:
        tutorialContentImg = step7;
        tutorialContentText = "Import the downloaded schedule to the calendar you created"
        break;
      default:
        tutorialContentImg = step1;
        currentPage = 1;
    }
  }

</script>
<style>
  #tutorial-box {
    @media screen and (max-width: 600px){
      width: 100%;
    }
  }
</style>
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