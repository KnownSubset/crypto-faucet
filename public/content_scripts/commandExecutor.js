(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;
  const timeout = 25;

  function clickOn(selector) {
    return new Promise(function(resolve) {
      const handler = (count = 0) => {
        const element = document.querySelector(selector);
        if (element) {
          console.debug('clicking');
          element.click();
          resolve({ status: 'success', statusCode: 1, command: 'click', message: `clicked on { count: ${count} }`, element })
        } else if (count > 500) {
          console.debug('timeout');
          resolve({ status: 'failure', statusCode: 0, command: 'click', message: 'timeout' });
        } else {
          setTimeout(handler, timeout, count + 1)
        }
      };
      handler();
    });
  }

  function fillIn(selector, value) {
    return new Promise(function(resolve) {
      const handler = (count = 0) => {
        const element = document.querySelector(selector);
        if (element) {
          element.value = `${value}`;
          resolve({ status: 'success', statusCode: 1, command: 'type', message: `filled in { count: ${count}, value: ${value} }`, element })
        } else if (count > 500) {
          resolve({ status: 'failure', statusCode: 0, command: 'type', message: 'timeout' });
        } else {
          setTimeout(handler, timeout, count + 1)
        }
      };
      handler();
    });
  }

  function scrollIntoView(selector) {
    return new Promise(function(resolve) {
      const handler = (count = 0) => {
        const element = document.querySelector(selector);
        if (element) {
          const { left, bottom } = element.getBoundingClientRect();
          window.scrollTo(left, bottom);
          resolve({ status: 'success', statusCode: 1, command: 'scroll', message: `scrolled to { x: ${left}, y: ${bottom}, count: ${count} }`, element})
        } else if (count > 500) {
          resolve({ status: 'failure', statusCode: 0, command: 'scroll', message: 'timeout'});
        } else {
          setTimeout(handler, timeout, count + 1)
        }
      };
      handler();
    });
  }

  function waitForTimeToPass(milliseconds = 100) {
    console.debug(`started waiting: ${new Date()}`);
    return new Promise(function(resolve) {
      const handler = () => {
        console.debug(`finished waiting: ${new Date()}`);
        resolve({ status: 'success', statusCode: 1, message: `waited for ${milliseconds}`});
      };
      setTimeout(handler, milliseconds);
    });
  }

  /**
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".
   */
  browser.runtime.onMessage.addListener((message = {}) => {
    console.debug(message);
    const { command, element, value } = message;
    if (!message) {
      return Promise.resolve({ status: 'failure', statusCode: 0, message: 'no command sent'});
    } else if (command === "click") {
      console.debug('clicking');
      return clickOn(element);
    } else if (command === "type") {
      console.debug('typing');
      return fillIn(element, value);
    } else if (command === "scroll") {
      console.debug('scrolling');
      return scrollIntoView(element);
    } else if (command === "wait") {
      console.debug('waiting');
      return waitForTimeToPass(value);
    }
  });

})();
