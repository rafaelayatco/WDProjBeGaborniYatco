<script>
  var users = JSON.parse(localStorage.getItem("users")) || {};

  function showSignup() {
    document.getElementById("signupForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
  }

  function showLogin() {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
  }

  /* SIGN UP */
  document.getElementById("signupForm").onsubmit = function (e) {
    e.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("signupEmail").value;
    var password = document.getElementById("signupPassword").value;
    var region = document.getElementById("region").value;
    var budget = document.getElementById("budget").value;

    var interests = [];
    var checkboxes = document.getElementsByName("interests");

    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        interests.push(checkboxes[i].value);
      }
    }

    var food = document.querySelector("input[name=food]:checked").value;

    if (users[email]) {
      alert("Account already exists. Please log in.");
      return;
    }

    users[email] = {
      name: name,
      password: password,
      region: region,
      interests: interests,
      food: food,
      budget: budget
    };

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", email);

    window.location.href = "../index.html";
};

  /* LOG IN */
  document.getElementById("loginForm").onsubmit = function (e) {
    e.preventDefault();

    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    if (!users[email] || users[email].password !== password) {
      alert("Invalid email or password");
      return;
    }

    localStorage.setItem("currentUser", email);
    window.location.href = "../index.html";
  };
</script>
