const SUBMIT_URL = 'https://script.google.com/macros/s/AKfycbxHA70bfrp2BWj2hDAog4dIoEOP0l16B4eFumUAltTDHPqXLAG8rZeCSazNpieLVxJz6g/exec';

document.getElementById('newsletter-unsubscribe-button').addEventListener('click', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('unsubscribe-email').value;
    const messageEl = document.getElementById('status-message');
    
    messageEl.textContent = 'Submitting...';

    try {
      const response = await fetch(SUBMIT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      body: new URLSearchParams({
        'email': email,
        'action': 'unsubscribe'
      })
    });
    
    const result = await response.json();
    
    if (result.status === 'success' || result.code === 200) {
      messageEl.textContent = result.message;
    } else {
      messageEl.textContent = 'Error: Unable to process request.';
      console.error(result.message || 'Unknown error');
    }
  } catch (error) {
      messageEl.textContent = 'Error: Unable to process request.';
      console.error(error);
    }
  });
