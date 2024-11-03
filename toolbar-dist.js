// Combined toolbar.js file

function addToolbar() {
    // Toolbar HTML with inline styles
    const toolbarHTML = `
        <div id="toolbar" style="position: fixed; bottom: 100px; right: 20px; display: flex; flex-direction: column;">
            <button aria-label="Increase Text Size" class="tool-button" title="Increase Text Size" style="background: transparent; border: none; padding: 12px; font-size: 1.2rem; color: #fff; background-color: #06f9ea; transition: all 0.3s ease-in-out; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 50px;">
                <i class="fa-solid fa-text-height" style="width: 24px; height: 24px; color: #fff;"></i>
            </button>
            <button aria-label="Increase Contrast" class="tool-button" title="Increase Contrast" style="background: transparent; border: none; padding: 12px; font-size: 1.2rem; color: #fff; background-color: #06f9ea; transition: all 0.3s ease-in-out; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 50px;">
                <i class="fa-solid fa-adjust" style="width: 24px; height: 24px; color: #fff;"></i>
            </button>
            <button aria-label="Speak Page Aloud" class="tool-button" title="Speak Page Aloud" style="background: transparent; border: none; padding: 12px; font-size: 1.2rem; color: #fff; background-color: #06f9ea; transition: all 0.3s ease-in-out; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 50px;">
                <div>
                    <i class="fa-solid fa-volume-up" style="width: 24px; height: 24px; color: #fff;"></i>
                </div>
            </button>
            <button aria-label="Return to Top" class="tool-button" title="Return to Top" style="background: transparent; border: none; padding: 12px; font-size: 1.2rem; color: #fff; background-color: #06f9ea; transition: all 0.3s ease-in-out; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 50px;">
                <i class="fa-solid fa-arrow-up" style="width: 24px; height: 24px; color: #fff;"></i>
            </button>
        </div>
    `;

    // Inject the toolbar into the page
    document.body.insertAdjacentHTML('beforeend', toolbarHTML);

    // Add event listeners to the buttons (same as your script.js)
    const textSizeButton = document.querySelector('[aria-label="Increase Text Size"]');
    const contrastButton = document.querySelector('[aria-label="Increase Contrast"]');
    const speakAloudButton = document.querySelector('[aria-label="Speak Page Aloud"]');
    const returnToTopButton = document.querySelector('[aria-label="Return to Top"]');

    // Increase Text Size
    let fontSize = 1;
    textSizeButton.addEventListener('click', () => {
        if (fontSize === 1) {
            document.body.style.fontSize = '140%';
            fontSize = 1.4;
            textSizeButton.title = "Reduce Text Size";
        } else {
            document.body.style.fontSize = '100%';
            fontSize = 1;
            textSizeButton.title = "Increase Text Size";
        }
    });

    // Increase Contrast (dark mode)
    let isContrastOn = false;
    contrastButton.addEventListener('click', () => {
        if (!isContrastOn) {
            document.body.classList.add('dark-mode');
            isContrastOn = true;
            contrastButton.title = "Decrease Contrast";
        } else {
            document.body.classList.remove('dark-mode');
            isContrastOn = false;
            contrastButton.title = "Increase Contrast";
        }
    });

    // Read Page Aloud
    let isReadingAloud = false;
    speakAloudButton.addEventListener('click', () => {
        // Check for SpeechSynthesis API support
        if ('speechSynthesis' in window) {
            if (!isReadingAloud) {
                const utterance = new SpeechSynthesisUtterance();
                utterance.text = document.body.innerText;
                speechSynthesis.speak(utterance);
                isReadingAloud = true;
                speakAloudButton.title = "Stop";
                speakAloudButton.querySelector("i:last-child").classList.replace("fa-volume-up", "fa-pause"); // Change to pause icon
            } else {
                speechSynthesis.cancel(); // Stop reading aloud
                isReadingAloud = false;
                speakAloudButton.title = "Read Text Aloud";
                speakAloudButton.querySelector("i:last-child").classList.replace("fa-pause", "fa-volume-up"); // Change back to volume icon
            }
        } else {
            // Show an alert or use alternative methods if not supported
            alert("Your browser does not support text-to-speech.");
        }
    });

    // Return to Top
    returnToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling
        });
    });
}

addToolbar();