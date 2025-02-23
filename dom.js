// Create an iframe element
var iframe = document.createElement('iframe');

// Set attributes for the iframe
iframe.src = 'https://gotphp.com'; // Replace with the desired URL 
iframe.width = '600';
iframe.height = '400';
iframe.style.border = 'none';

// Append iframe to the body
document.body.appendChild(iframe);

// Show an alert
alert('DOM.js loaded and iframe added!');
