// Should just make this a svelte component that is loaded in instead of a javascript function
// Same with the dropbox
import step1 from '$lib/assets/step-1.png'
import step2 from '$lib/assets/step-2.png'
import step3 from '$lib/assets/step-3.png'
import step4 from '$lib/assets/step-4.png'

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
export { currentPage, totalPages, tutorialContentImg, tutorialContentText, goToNextPage, goToPreviousPage}