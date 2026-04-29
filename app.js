(function () {
  const stage = document.getElementById("stage");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const progressCounter = document.getElementById("progressCounter");
  const progressTitle = document.getElementById("progressTitle");
  const progressFill = document.getElementById("progressFill");
  const baseWidth = 1600;
  const baseHeight = 900;

  let currentIndex = 0;

  function padSlideNumber(index) {
    return String(index + 1).padStart(2, "0");
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function scaleStage() {
    const scale = Math.min(window.innerWidth / baseWidth, window.innerHeight / baseHeight);
    stage.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }

  function updateUI(index) {
    progressCounter.textContent = `${padSlideNumber(index)} / ${slides.length}`;
    progressTitle.textContent = slides[index].dataset.title || `Slide ${index + 1}`;
    progressFill.style.width = `${((index + 1) / slides.length) * 100}%`;
    document.title = `${slides[index].dataset.title || `Slide ${index + 1}`} | Are We Still Programming?`;
  }

  function showSlide(index, updateHash = true) {
    currentIndex = clamp(index, 0, slides.length - 1);
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === currentIndex);
    });
    updateUI(currentIndex);
    if (updateHash) {
      window.location.hash = `slide-${currentIndex + 1}`;
    }
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      return;
    }
    document.exitFullscreen?.();
  }

  function parseHash() {
    const match = window.location.hash.match(/slide-(\d+)/i);
    if (!match) return 0;
    return clamp(Number(match[1]) - 1, 0, slides.length - 1);
  }

  window.addEventListener("resize", scaleStage);
  window.addEventListener("hashchange", () => showSlide(parseHash(), false));

  window.addEventListener("keydown", (event) => {
    const key = event.key;
    if (["ArrowRight", "PageDown", " ", "Enter"].includes(key)) {
      event.preventDefault();
      nextSlide();
      return;
    }

    if (["ArrowLeft", "PageUp", "Backspace"].includes(key)) {
      event.preventDefault();
      prevSlide();
      return;
    }

    if (key === "Home") {
      event.preventDefault();
      showSlide(0);
      return;
    }

    if (key === "End") {
      event.preventDefault();
      showSlide(slides.length - 1);
      return;
    }

    if (key.toLowerCase() === "f") {
      event.preventDefault();
      toggleFullscreen();
    }
  });

  stage.addEventListener("click", (event) => {
    const clickLeftSide = event.clientX < window.innerWidth * 0.34;
    if (clickLeftSide) {
      prevSlide();
      return;
    }
    nextSlide();
  });

  scaleStage();
  showSlide(parseHash(), false);
})();
