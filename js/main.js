// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

// Contact Form Validation and Submission
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const formStatus = document.getElementById("form-status");
  const submitText = document.getElementById("submit-text");
  const submitLoading = document.getElementById("submit-loading");

  // Form validation
  function validateForm() {
    let isValid = true;

    // Clear previous errors
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));

    // Validate name
    const name = document.getElementById("name").value.trim();
    if (name.length < 2) {
      document.getElementById("name-error").textContent =
        "Name must be at least 2 characters";
      isValid = false;
    }

    // Validate email
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById("email-error").textContent =
        "Please enter a valid email address";
      isValid = false;
    }

    // Validate subject
    const subject = document.getElementById("subject").value.trim();
    if (subject.length < 5) {
      document.getElementById("subject-error").textContent =
        "Subject must be at least 5 characters";
      isValid = false;
    }

    // Validate message
    const message = document.getElementById("message").value.trim();
    if (message.length < 10) {
      document.getElementById("message-error").textContent =
        "Message must be at least 10 characters";
      isValid = false;
    }

    return isValid;
  }

  // Form submission
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Show loading state
    submitText.style.display = "none";
    submitLoading.style.display = "inline-flex";

    // Collect form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      program: document.getElementById("program").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
      newsletter: document.getElementById("newsletter").checked,
      timestamp: new Date().toISOString(),
    };

    // Simulate API call (replace with actual submission)
    setTimeout(() => {
      // Show success message
      formStatus.className = "form-status success";
      formStatus.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <strong>Thank you, ${formData.name}!</strong> 
                Your message has been sent successfully. We'll get back to you within 24-48 hours.
            `;
      formStatus.style.display = "block";

      // Reset form
      contactForm.reset();

      // Reset button state
      submitText.style.display = "inline-block";
      submitLoading.style.display = "none";

      // Scroll to success message
      formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });

      // Log to console (for testing)
      console.log("Form submitted:", formData);

      // Hide success message after 10 seconds
      setTimeout(() => {
        formStatus.style.display = "none";
      }, 10000);
    }, 1500); // Simulate network delay
  });

  // Real-time validation
  ["name", "email", "subject", "message"].forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener("blur", validateForm);
    }
  });
}

// FAQ Accordion
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const faqItem = button.parentElement;
    const answer = button.nextElementSibling;

    // Close other open items
    document.querySelectorAll(".faq-answer").forEach((item) => {
      if (item !== answer) {
        item.classList.remove("active");
        item.previousElementSibling.classList.remove("active");
      }
    });

    // Toggle current item
    button.classList.toggle("active");
    answer.classList.toggle("active");
  });
});

// Add current year to footer
document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Add active class to current page in navigation
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Add current year to footer
  const yearSpan = document.querySelector("#current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// Simple image placeholder interaction for gallery
document.querySelectorAll(".gallery-img").forEach((img) => {
  img.addEventListener("click", function () {
    const imgText = this.querySelector(".img-placeholder").textContent;
    alert(
      `Viewing: ${imgText}\n\nIn a real implementation, this would open a lightbox with the full image.`
    );
  });
});
// Slideshow Functionality
function initSlideshow() {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".slide-nav.prev");
  const nextBtn = document.querySelector(".slide-nav.next");

  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 3000; // 3 seconds

  // Function to show a specific slide
  function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Handle index boundaries
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // Add active class to current slide and dot
    slides[currentSlide].classList.add("active");
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add("active");
    }
  }

  // Function to move to next slide
  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  // Function to move to previous slide
  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Start automatic slideshow
  function startSlideshow() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  // Pause slideshow on hover
  const slideshowContainer = document.querySelector(".slideshow-container");
  if (slideshowContainer) {
    slideshowContainer.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });

    slideshowContainer.addEventListener("mouseleave", () => {
      startSlideshow();
    });
  }

  // Dot click event
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const slideIndex = parseInt(dot.getAttribute("data-slide"));
      showSlide(slideIndex);
      startSlideshow();
    });
  });

  // Navigation button events
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      startSlideshow();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startSlideshow();
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
      startSlideshow();
    } else if (e.key === "ArrowRight") {
      nextSlide();
      startSlideshow();
    }
  });

  // Initialize
  showSlide(0);
  startSlideshow();
}

// Initialize slideshow when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initSlideshow();

  // Also update current year in footer
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
