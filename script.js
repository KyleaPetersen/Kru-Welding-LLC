// Send Email using emailjs *******************************************************

const msg = document.querySelector(".form-message");

(function () {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init("Wxx65Zq_967hRzDkI");
})();

window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      document.querySelector(".loader").classList.add("show");
      // these IDs from the previous steps
      emailjs.sendForm("service_8feoypw", "template_dts15m7", this).then(
        function() {
            document.getElementById("contact-form").reset();
            document.querySelector(".loader").classList.remove("show");
            msg.innerHTML = "<span class='success-msg'>Email Sent</span>";
            msg.classList.add("show");
            setTimeout(() => msg.classList.remove("show"), 4000);
        },
        function (error) {
            document.querySelector(".loader").classList.toggle("show");
            msg.innerHTML = "<span class='error-msg'>Email Not Sent</span>";
            msg.classList.add("show");
        }
      );
    });
};  


// Image slideshow *******************************************************************
const slideshow = document.querySelector(".slideshow");
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
let index = 0;
const slidesToShow = 3;

/* Moves the slides left or right */
function moveSlide(direction) {
    index += direction;

    // Loop slides (infinite effect)
    if (index > totalSlides - slidesToShow) {
        index = 0;
    } else if (index < 0) {
        index = totalSlides - slidesToShow;
    }

    // Move slides
    const offset = -(index * (100 / slidesToShow));
    slideshow.style.transform = `translateX(${offset}%)`;
}

/* Auto slide every 3 seconds */
setInterval(() => {
    moveSlide(1);
}, 6000);


//Gallery pop-up *********************************************************************

// Get references to the elements
const openGalleryBtn = document.getElementById("openGalleryBtn");
const galleryPopup = document.getElementById("galleryPopup");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const gallery = document.querySelector(".gallery");
const photoContainers = document.querySelectorAll(".photo-container");

let currentIndex = 0;
let isDragging = false;
let startPosX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

// Open the gallery popup
openGalleryBtn.addEventListener("click", () => {
    galleryPopup.style.display = "flex";
    showPhoto(currentIndex); // Show the first photo
});

// Close the gallery popup
closeBtn.addEventListener("click", () => {
    galleryPopup.style.display = "none";
});

// Close the gallery popup when clicking outside the content
window.addEventListener("click", (event) => {
    if (event.target === galleryPopup) {
        galleryPopup.style.display = "none";
    }
});

// Show the previous photo (with looping)
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + photoContainers.length) % photoContainers.length;
    updateGalleryPosition();
});

// Show the next photo (with looping)
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % photoContainers.length;
    updateGalleryPosition();
});

// Update the gallery position based on the current index
function updateGalleryPosition() {
    currentTranslate = -currentIndex * (gallery.clientWidth + 10); // Account for the gap
    gallery.style.transform = `translateX(${currentTranslate}px)`;
}

// Touch event handlers for mobile
gallery.addEventListener("touchstart", touchStart);
gallery.addEventListener("touchmove", touchMove);
gallery.addEventListener("touchend", touchEnd);

// Mouse event handlers for desktop
gallery.addEventListener("mousedown", touchStart);
gallery.addEventListener("mousemove", touchMove);
gallery.addEventListener("mouseup", touchEnd);
gallery.addEventListener("mouseleave", touchEnd);

// Handle touch/mouse start
function touchStart(event) {
    if (event.type === "touchstart") {
        startPosX = event.touches[0].clientX;
    } else {
        startPosX = event.clientX;
        event.preventDefault(); // Prevent text selection while dragging
    }
    isDragging = true;
    gallery.style.transition = "none"; // Disable transition while dragging
}

// Handle touch/mouse move
function touchMove(event) {
    if (isDragging) {
        const currentPosX = event.type === "touchmove" ? event.touches[0].clientX : event.clientX;
        const deltaX = currentPosX - startPosX;
        currentTranslate = prevTranslate + deltaX;
        gallery.style.transform = `translateX(${currentTranslate}px)`;
    }
}

// Handle touch/mouse end
function touchEnd() {
    if (isDragging) {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        // If the user dragged enough, move to the next/previous photo
        if (movedBy < -50) {
            currentIndex = (currentIndex + 1) % photoContainers.length; // Loop to the first photo if at the end
        } else if (movedBy > 50) {
            currentIndex = (currentIndex - 1 + photoContainers.length) % photoContainers.length; // Loop to the last photo if at the beginning
        }

        updateGalleryPosition();
        gallery.style.transition = "transform 0.3s ease"; // Re-enable transition
        prevTranslate = -currentIndex * (gallery.clientWidth + 10); // Account for the gap
    }
}