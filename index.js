// Global variables
let intervalId;
const boostBtnSelector = '[class*="css-1vfl7gr"]';
const turboBtnSelector = '[class*="MuiButton-primarySizeLarge"]';
const confirmTurboBtnSelector = '[class*="MuiButton-activeButtonSizeBig"]';
const turboImgSelector = 'img[src*="turbo-boost.svg"][alt="turbo"]';
const toorboBG = 'div[class*="sc-braxZu gmKjLQ"]';
const primaryTapZone = '.dotlottie-container';

// Utility Functions
function getRandomCoordinates(element) {
  const rect = element.getBoundingClientRect();
  const x = Math.random() * rect.width + rect.left;
  const y = Math.random() * rect.height + rect.top;
  return { x, y };
}

function getRandomInterval(minInterval, maxInterval) {
  return Math.random() * (maxInterval - minInterval) + minInterval;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Click Event Generator
function createEvent(x, y, eventType) {
  return new PointerEvent(eventType, {
    bubbles: true,
    clientX: x,
    clientY: y,
    pressure: Math.random() * 0.4 + 0.3,
    tangentialPressure: Math.random() * 0.4 + 0.3,
  });
}

// Click Function
function clickBtn(selector, index = 0) {
  const element = document.querySelectorAll(selector)[index];
  const randomCoords = getRandomCoordinates(element);
  const handleClickEvent = createEvent(randomCoords.x, randomCoords.y, 'click');
  element.dispatchEvent(handleClickEvent);
}

// Stop Automation
function stopSelfRunningFunction() {
  clearTimeout(intervalId);
}

// Automation Sequence
const automate = async () => {
  clickBtn(boostBtnSelector, 0);
  await sleep(getRandomInterval(230, 500));

  clickBtn(turboBtnSelector, 0);
  await sleep(getRandomInterval(250, 400));

  clickBtn(confirmTurboBtnSelector, 0);
  await sleep(getRandomInterval(1500, 2000));

  clickBtn(turboImgSelector, 0);

  const observer = new MutationObserver(async function (mutations) {
    const element = document.querySelector(toorboBG);

    if (element && window.getComputedStyle(element).display !== 'none') {
      observer.disconnect();

      // Core Logic
      function performClicks(clickCount = 10) {
        const button = document.querySelector(primaryTapZone);
        const interval = getRandomInterval(32, 65);

        for (let i = 0; i < clickCount; i++) {
          const randomCoords = getRandomCoordinates(button);
          const pointerEvent = createEvent(randomCoords.x, randomCoords.y, 'pointerdown');
          button.dispatchEvent(pointerEvent);
        }

        // Schedule the next click event
        intervalId = setTimeout(() => performClicks(clickCount), interval);
      }

      await sleep(getRandomInterval(52, 199));
      performClicks();

      const interval = getRandomInterval(9999, 10250);
      setTimeout(stopSelfRunningFunction, interval);
      await sleep(interval);
    }
  });

  const element = document.querySelector(toorboBG);
  if (element) {
    observer.observe(element, { attributes: true, attributeFilter: ['style'] });
  }
};

const runAutomateMultipleTimes = async () => {
  for (let i = 1; i <= 50; i++) {
    await sleep(getRandomInterval(3000, 15000));
    console.log(Starting run ${i});
    await automate();
    await sleep(getRandomInterval(12000, 19175));
    console.clear();
  }
};

runAutomateMultipleTimes();