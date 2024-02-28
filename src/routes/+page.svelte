<!-- Svelte page for uocalendar -->
<!-- Generic html for a single page website with a file upload box where the user can upload an .htm file -->
<script>
// @ts-nocheck
  import Header from "../components/static/header.svelte";
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
    formData.append('file', selectedFile);
    fetch('https://uocalendar-a68f83215641.herokuapp.com/uocalendar', {
      method: 'POST',
      body: formData
    })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'My Schedule.ics'; 
      document.body.appendChild(a); 
      a.click();
      a.remove();  
      console.log('Success');
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
            alert('There was an error sending the report. Please contact the developer directly through the contact form');
          });
        }
      }
    });
  }
</script>

<style>
  #upload-box {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    margin: 0 auto;
    @media screen and (max-width: 600px){
      width: 90%;
    }
    @media screen and (min-width: 600px) {
      width: 60%; 
    }
  }
</style>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div >
  <Header />
  <div id="upload-box" on:dragover={preventDefault} 
    on:dragenter={preventDefault} on:drop={handleInsert}>
    <h1>Upload .htm File</h1>
      <input type="file" accept=".htm" on:change={handleDrop} />
    {#if selectedFile}
      <p>Selected File: {selectedFile.name}</p>
    {/if}
  </div>
</div>
