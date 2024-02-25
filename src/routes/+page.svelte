<!-- Svelte page for uocalendar -->
<!-- Generic html for a single page website with a file upload box where the user can upload an .htm file -->
<script>
// @ts-nocheck

  let selectedFile;

  function handleFileUpload(event) {
    selectedFile = event.target.files[0];
    // Handle the uploaded file here
    // Check if selectedfile is .htm
    if (selectedFile.name.split('.').pop() !== 'htm') {
      alert('Please upload a  file');
      selectedFile = null;
    }
  }

  function handleDragDrop(event) {
    preventDefault(event);
    selectedFile = event.dataTransfer.files[0];
    // Handle the uploaded file here
    // Check if selectedfile is .htm
    if (selectedFile.name.split('.').pop() !== 'htm') {
      alert('Please upload a  file');
      selectedFile = null;
    }
  }
  
  function preventDefault(event) {
    event.preventDefault();
  }
</script>

<style>
  .upload-box {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
  }
</style>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="upload-box" on:dragover={preventDefault} 
  on:dragenter={preventDefault} on:drop={handleDragDrop}>
  <h1>Upload .htm File</h1>
    <input type="file" accept=".htm" on:change={handleFileUpload} />
  {#if selectedFile}
    <p>Selected File: {selectedFile.name}</p>
  {/if}
</div>
