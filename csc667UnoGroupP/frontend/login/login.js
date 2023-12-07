
function login() {
    const username = document.getElementById('username').value;
    localStorage.setItem('loggedInUser', username);
    window.location.href = 'landing.html';
  }
  
  function startGame() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      document.getElementById('loggedInUser').innerText = loggedInUser;
      window.location.href = 'game.html';
    } else {
      alert('Please login first.');
    }
  }
  