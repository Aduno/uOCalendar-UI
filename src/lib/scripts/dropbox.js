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
      a.setAttribute('style','padding: 2px 5px 2px 5px; border: 1px solid black;border-radius: 5px;margin: 5px;background-color:rgb(230,230,230);')
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

  export { selectedFile, handleDrop, handleInsert, preventDefault, checkFile, uploadFile };