let tooltip;
let tooltipEnabled = true; // Tooltip starts enabled

// Listen for selection and display tooltip if enabled
document.addEventListener('mouseup', function () {
  if (!tooltipEnabled) return;

  const selectedText = window.getSelection().toString().trim();

  // If there's no selected text, hide the tooltip
  if (!selectedText) {
    if (tooltip) {
      tooltip.remove();
      tooltip = null;
    }
    return;
  }

  // Create the tooltip element if it doesn't exist
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    document.body.appendChild(tooltip);
  }

  tooltip.textContent = selectedText;

  // Get the position of the selected text
  const range = window.getSelection().getRangeAt(0);
  const rect = range.getBoundingClientRect();

  // Position the tooltip above the highlighted text
  tooltip.style.left = `${rect.left + window.scrollX}px`;
  tooltip.style.top = `${rect.top + window.scrollY - 40}px`;
  tooltip.style.display = 'block';
});

// Hide the tooltip when clicking anywhere
document.addEventListener('mousedown', function () {
  if (tooltip) {
    tooltip.style.display = 'none';
  }
});

// Listen for messages from the popup to toggle the tooltip
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'toggleTooltip') {
    tooltipEnabled = !tooltipEnabled;
  }
});
