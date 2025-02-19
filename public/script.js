fetch('/check-db-connection')
  .then(response => response.json())
  .then(data => {
    const messageElement = document.getElementById('message');
    if (data.status === 'success') {
      messageElement.innerText = 'اتصال به MongoDB برقرار شد!';
      messageElement.style.color = 'green';
    } else {
      messageElement.innerText = 'خطا در اتصال به MongoDB!';
      messageElement.style.color = 'red';
    }
  })
  .catch(error => {
    const messageElement = document.getElementById('message');
    messageElement.innerText = 'خطا در برقراری ارتباط!';
    messageElement.style.color = 'red';
  });
