<!-- Svelte page for uocalendar -->
<!-- Generic html for a single page website with a file upload box where the user can upload an .htm file -->
<script>
// @ts-nocheck
  import Header from "../components/static/header.svelte";
  import step1 from '$lib/assets/step-1.png'
  import step2 from '$lib/assets/step-2.png'
  import step3 from '$lib/assets/step-3.png'
  import step4 from '$lib/assets/step-4.png'
  import ArrowLeft from '$lib/assets/icons/arrow-left.svelte'
  import ArrowRight from '$lib/assets/icons/arrow-right.svelte'
  import { onMount } from 'svelte';

  let selectedFile;
  function handleDrop(event) {
    selectedFile = event.target.files[0];
    checkFile(selectedFile);
    uploadFile(selectedFile);
  }
  function handleInsert(event) {
    preventDefault(event);
    selectedFile = event.dataTransfer.files[0];
    checkFile(selectedFile);
    uploadFile(selectedFile);
  }
  
  function preventDefault(event) {
    event.preventDefault();
  }

  function checkFile(selectedFile) {
    if (selectedFile.name.split('.').pop() !== 'htm') {
      alert('Please upload the SA_LEARNER_SERVICES.htm file');
      selectedFile = null;
    }
    else if(selectedFile.size > 150000 || selectedFile.size < 50000) {
      alert('Please check if you are uploading the correct file SA_LEARNER_SERVICES.htm file');
      selectedFile = null;
    }
  }
  function uploadFile(selectedFile) {
    const formData = new FormData();

    alert('The schedule is being processed. This may take 5-10 seconds. Please do not refresh the page or close the tab.');

    formData.append('file', selectedFile);
    fetch('https://uocalendar-a68f83215641.herokuapp.com/uocalendar', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if(!response.ok) {
        throw response;
      }
      return response.blob();
      }
    )
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.innerText = "Download Schedule";
      a.classList.add('text-base');
      // Manually adding style here because the class defintion in css is not being applied...
      a.setAttribute('style','padding: 2px 5px 2px 5px; border: 1px solid #e5e7eb;border-radius: 5px;margin: 5px;background-color:rgb(230,230,230);')
      a.addEventListener("mouseover", ()=> { a.style.backgroundColor = "rgb(210,210,210)";});
      a.addEventListener("mouseout", ()=> { a.style.backgroundColor = "rgb(230,230,230)";});
      const uploadBox = document.getElementById("upload-box");
      a.href = url;
      a.download = 'My Schedule.ics'; 
      uploadBox.appendChild(a); 
    })
    .catch(error => {
      console.error('Error:', error);
      // if error code is 500s, alert the user the server is down 
      if (error.status >= 500) {
        alert('Server is down, please try again later');
      }
      else {
        // Alert the user that there was an error processing the file and let them chose whether to send the 
        // file to the developer for further investigation
        if (confirm('There was an error processing the file, would you like to send the file to the developer for further investigation?')) {
          const formData = new FormData();
          formData.append('file', selectedFile);
          fetch('https://uocalendar-a68f83215641.herokuapp.com/errors', {
            method: 'POST',
            body: formData
          })
          // then show the user a message that the file has been sent to the developer
          .then(response => response.json())
          .then(data => {
            alert(data.message);
          })
          .catch(error => {
            console.error('Error:', error);
            alert(`There was an error sending the report. Please contact the developer directly through the contact form
              https://docs.google.com/forms/d/e/1FAIpQLScyzZdK6-fiBthyJtWEeFqBTpmPzB1l-EEljCXq6ShfdGYlsg/viewform?usp=sf_link
              `);
          });
        }
      }
    });
  }
  let currentPage = 1;
  let tutorialContentImg = step1;
  let tutorialContentText = 'Navigate to the "My Class Schedule" through UOZone';

  const totalPages = 4;

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
        tutorialContentText = 'Naviate to the "My Weekly Schedule_files" folder, ignoring the "My Weekly Schedule" file';
        break;
      case 4: 
        tutorialContentImg = step4;
        tutorialContentText = "Upload the SA_LEARNER_SERVICES.htm file here"
        break;
      default:
        tutorialContentImg = step1;
        currentPage = 1;
    }
  }

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
  <p class="block text-center">Check out <a class="text-sky-700" href="www.uschedule.me">uschedule.me</a> for easier course planning and also export capabilities!
  </p>
  <p class="block text-center">For any issues: <a class="text-sky-700" href="https://forms.gle/6Z3c4hQYrrsp5nkn7">Contact form</a>
  </p>
</div>
