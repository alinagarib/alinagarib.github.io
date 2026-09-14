
const SUBMIT_URL = 'https://script.google.com/macros/s/AKfycbxHA70bfrp2BWj2hDAog4dIoEOP0l16B4eFumUAltTDHPqXLAG8rZeCSazNpieLVxJz6g/exec';

document.getElementById('newsletter-button').addEventListener('click', async (e) => {
  e.preventDefault();
  const emailInput = document.getElementById('subscriber-email').value;
  const messageBox = document.getElementById('form-feedback-message');
  
  if (messageBox) messageBox.textContent = 'Submitting...';
  try {
    const response = await fetch(SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ email: emailInput })
    });
    
    const result = await response.json();
    
    if (result.status === 'success' || result.code === 200) {
      if (messageBox) messageBox.textContent = 'Thank you for subscribing ' + emailInput + '! You will hear from me soon! >^.^<'; 
      document.getElementById('newsletter-form').reset();
    } else {
      if (result.code === 400) {
        if (messageBox) messageBox.textContent = 'Invalid email format :( Please enter a valid email!';
      } else if (result.code === 409) {
        if (messageBox) messageBox.textContent = 'This email is already subscribed :3';
      } else if (result.code === 500) {
        if (messageBox) messageBox.textContent = 'An unexpected error occurred @.@ Please try again later!';
      }
      console.log(`Error: ${result.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error submitting the form:', error);
    if (messageBox) messageBox.textContent = 'Connection could not be established.';
  }
});
