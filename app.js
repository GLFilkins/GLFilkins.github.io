class UberCalcApp {
  constructor() {
    this.init();
	alert('ServiceWorker registration worked! We be damned!!');
  }

async init() {
    if ('IntersectionObserver' in window) {
      this.setupNavIntersectionObserver();
    }
    this.addLoadingIndicatorDelay();

  }

addLoadingIndicatorDelay() {
    // Only show spinner if we're delayed more than 1s
    setTimeout(() => {
      Array.from(document.querySelectorAll('.loader')).forEach(loader => {
        loader.removeAttribute('hidden');
      });
    }, 1000);
  }

setupNavIntersectionObserver() {
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const callback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          [nav, header].forEach(e => e.classList.remove('fixed'));
        } else {
          [nav, header].forEach(e => e.classList.add('fixed'));
        }
      });
    };
    const observer = new IntersectionObserver(callback, {
      threshold: [0, 1]
    });
    observer.observe(header);
  }

async function registerSW() { // (1)
  if ('serviceWorker' in navigator) { // (2)
    try {
      await navigator.serviceWorker.register('./sw.js'); // (3)
    } catch (e) {
      alert('ServiceWorker registration failed. Sorry about that.'); // (4)
    }
  } else {
    document.querySelector('.alert').removeAttribute('hidden'); //(5)
	alert('ServiceWorker registration worked! We be damned!!');
  }
}

