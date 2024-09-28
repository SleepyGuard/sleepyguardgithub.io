// Prevent closing until video ends (optional)
window.onbeforeunload = function() {
    return "Don't leave yet! The video isn't finished.";
};

// Allow closing after video ends
function allowClose() {
    window.onbeforeunload = null;
}

// Function to gradually increase volume
function increaseVolume(video) {
    let volume = 0;
    video.volume = 0; // Start at 0 volume
    video.muted = false; // Unmute the video

    let interval = setInterval(function() {
        if (volume < 1) {
            volume += 0.05; // Increase volume gradually
            video.volume = Math.min(volume, 1); // Cap the volume at 1
        } else {
            clearInterval(interval); // Stop increasing once at max volume
        }
    }, 200); // Increase every 200 milliseconds
}

// Function to randomly select n unique videos from the array
function getRandomVideos(videos, n) {
    const shuffled = [...videos].sort(() => 0.5 - Math.random()); // Shuffle array
    return shuffled.slice(0, n); // Return first n elements
}

// Function to display the "Nope! No Pausing Rick Allowed!" message
function showWarningMessage(event) {
    event.preventDefault(); // Prevent default action (e.g., pausing the video)
    
    // Create the warning message element
    const messageDiv = document.createElement('div');
    messageDiv.textContent = "Nope! No Pausing Rick Allowed!";
    messageDiv.classList.add('warning-message');
    
    // Append the message to the body
    document.body.appendChild(messageDiv);
    
    // Remove the message after 2 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 2000);
}

// Function to simulate a user click or touch event to bypass autoplay restrictions on mobile
function simulateUserInteraction() {
    const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });
    
    // Dispatch the simulated event on the document to emulate user interaction
    document.dispatchEvent(event);
}

// Apply the gradual volume increase to only two randomly selected videos
window.onload = function() {
    const videos = document.querySelectorAll('video'); // Select all video elements
    const randomVideos = getRandomVideos(videos, 2); // Randomly select 2 videos

    // Ensure all videos play automatically and are muted initially
    videos.forEach(video => {
        video.play(); // Autoplay all videos
        video.addEventListener('click', showWarningMessage); // Show warning on left-click
        video.addEventListener('ended', allowClose); // Allow closing the page after video ends
    });

    // Simulate a user interaction to bypass autoplay restrictions
    simulateUserInteraction();

    // Unmute only the two randomly selected videos and increase volume gradually after a slight delay
    setTimeout(() => {
        randomVideos.forEach(video => {
            video.muted = false; // Unmute the randomly selected videos
            increaseVolume(video); // Gradually increase the volume
        });
    }, 1000); // Adjust the delay if necessary (1 second here)
};
