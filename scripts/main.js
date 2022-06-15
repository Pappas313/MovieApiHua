//For Accodion-Toggle
$(document).ready(function () {
  // Add minus icon for collapse element which is open by default
  $(".collapse.show").each(function () {
    $(this).siblings(".card-header").find(".btn i").html("remove");
    $(this).prev(".card-header").addClass("highlight");
  });
  // Toggle plus minus icon on show hide of collapse element
  $(".collapse")
    .on("show.bs.collapse", function () {
      $(this).parent().find(".card-header .btn i").html("remove");
    })
    .on("hide.bs.collapse", function () {
      $(this).parent().find(".card-header .btn i").html("add");
    });
});
///End for acodion-tongle

//For the Application
user = [];
usersf = [];
mov = new Array();

function search_form_1() {
  document.getElementById("search_par").innerHTML = "";
  document.getElementById(
    "suggest"
  ).innerHTML = `<fieldset align="center" id="fieldset_2"><legend align="center"><h2>ΠΡΟΤΑΣΕΙΣ ΤΑΙΝΙΩΝ</h2></legend><input type='button' id="suggest_m" value='Προτεινε μου!' onclick="suggest()"><div id="last"></div><div id="er"></div><ul id="uno"></ul></fieldset>`;
  var choice = document.getElementById("id_name").value;
  serchByNameDiv =
    '<label for="search_name">Αναζήτηση ταινίας με το όνομα:</label><br><input type="text" id="search_name"><br><input type="button" id="search_by_name" onclick="search_form_name()" value="Αναζήτηση"><br>';
  searchByIdDiv =
    '<label for="search_id">Αναζήτηση ταινίας με τον κωδικό της:</label><br><input type="text" id="search_id"></input><br><input type="button" id="search_button" onclick="search_form()" value="Αναζήτηση">';
  if (choice == "name") {
    document.getElementById("search_par").innerHTML = serchByNameDiv;
  }
  if (choice == "id") {
    document.getElementById("search_par").innerHTML = searchByIdDiv;
  }
}

function search_form() {
  mov = [];
  const xhr = new XMLHttpRequest();
  var search = document.getElementById("search_id").value;
  const url = `http://62.217.127.19:8010/movie/${search}`;
  xhr.open("GET", url, true);
  xhr.onload = () => {
    const par = JSON.parse(xhr.response);
    var par_1 = `<table id='table_id' style="width:100%"><tr><td><b>Check</b></td><td><b>ID</b></td><td><b>Όνομα</b></td><td><b>Είδος</b></td></tr><tr><td><input type="checkbox" id='${par[0].movieId}'></td><td>${par[0].movieId}</td><td>${par[0].title}</td><td>${par[0].genres}</td></tr></table>`;
    par_1 += `<input type='button'   id='choice' value='Βαθμολόγησε!' onclick='grade_id(${par[0].movieId})'>`;
    document.getElementById("search_with_name").innerHTML = par_1;
  };
  xhr.send();
}

function grade_id(x) {
  document.getElementById("grade").innerHTML = "";
  if (document.getElementById(`${x}`).checked) {
    document.getElementById(
      "grade"
    ).innerHTML = `<br>Δώσε βαθμολογία για την ${x}<br><input type='text' id='rating_name${x}'><br><input type='button' id="movie_ra" value='Αναζήτηση νέας' onclick='send(${x})'><input type='button' id="Nea_anazitisi" value='Νέα αναζήτηση' onclick='send(${x})'><p id='error_${x}'</p>`;
  } else {
    document.getElementById(
      "grade"
    ).innerHTML = `<Δεν εχεις επιλέξει ταινία,επέλεξε από πάνω ή ξανακάνε αναζήτηση`;
  }
}

function neo_search() {
  user = [];
  document.getElementById("search").reset();
  document.getElementById("grade").innerHTML = "";
  document.getElementById("search_with_name").innerHTML = "";
  document.getElementById("search_par").innerHTML = "";
}

function send(z) {
  rat = document.getElementById(`rating_name${z}`).value;
  try {
    document.getElementById(`error_${z}`).innerHTML = "";
    console.log(rat);
    if (rat == "") throw "Δώσε τιμή";
    if (!(rat >= 0 && rat <= 5)) throw "Δώσε τιμή 0-5";
  } catch (err) {
    document.getElementById(`error_${z}`).innerHTML = err;
  }
  if (rat >= 0 && rat <= 5) {
    var loc = { id: z, rating: rat };
    user.push(loc);
    var countKey = Object.keys(user).length;
    for (i = 0; i < countKey; i++) {
      console.log(user[i].id + user[i].rating);
    }
    document.getElementById("search").reset();
    document.getElementById("grade").innerHTML = "";
    document.getElementById("search_with_name").innerHTML = "";
    document.getElementById("search_par").innerHTML = "";
  }
}

function search_form_name() {
  mov = [];
  var xhr = new XMLHttpRequest();
  var name_ = document.getElementById("search_name").value;
  var url = "http://62.217.127.19:8010/movie";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      var countKey = Object.keys(json).length;
      console.log(json);
      var tablemovie =
        '<table style="width:100%" id="movies"><tr><th><b>Check</b></th><th><b>ID</b></th><th><b>Όνομα</b></th><th><b>Είδος</b></th></tr><tr>';
      arr = [];
      for (i = 0; i < countKey; i++) {
        tablemovie += `<tr><td><input type="checkbox" id='${json[i].movieId}'></td><td>${json[i].movieId}</td><td>${json[i].title}</td><td>${json[i].genres}</td></tr>`;
        arr.push(json[i].movieId);
      }
      console.log(arr);
      tablemovie += `<br><input type='button' id='choice_2' value='Βαθμολόγησε!' onclick='grade_name(${arr})'>`;
      document.getElementById("search_with_name").innerHTML = tablemovie;
    }
  };
  var data = JSON.stringify({ keyword: `${name_}` });
  xhr.send(data);
}

function grade_name(...r) {
  document.getElementById("grade").innerHTML = "";
  var check = [];

  for (i = 0; i < r.length; i++) {
    if (document.getElementById(`${r[i]}`).checked) {
      check.push(r[i]);
    }
  }
  if (check.length > 0) {
    document.getElementById("search_with_name").innerHTML = "";
    l = check.length;
    for (i = 0; i < l - 1; i++) {
      document.getElementById(
        "grade"
      ).innerHTML += `<div id='p${check[i]}'><br>Δώσε βαθμολογία για την ${check[i]}<br><input type='text' id='rating_name${check[i]}'><br><input type='button' id="movie_for" value='Καταχώρησε' onclick='for_fun(${check[i]})'><p id="error_${check[i]}"></p></div>`;
    }
    document.getElementById("grade").innerHTML += `<div id='${
      check[l - 1]
    }'><br>Δώσε βαθμολογία για την ${
      check[l - 1]
    }<br><input type='text' id='rating_name${
      check[l - 1]
    }'><br><input type='button' id="movie_ra" value='Αναζήτηση νέας' onclick='send(${
      check[l - 1]
    })'><input type='button' id="Nea_anazitisi" value='Καταχώρηση & Νέα αναζήτηση' onclick='send(${
      check[l - 1]
    })'><p id='error_${check[l - 1]}'></p></div>`;
  } else {
    document.getElementById(
      "grade"
    ).innerHTML = `Δεν εχεις επιλέξει ταινία,επέλεξε από πάνω ή ξανακάνε αναζήτηση`;
  }
}
function for_fun(z) {
  rat = document.getElementById(`rating_name${z}`).value;
  console.log(z);
  try {
    document.getElementById(`error_${z}`).innerHTML = "";
    console.log(rat);
    if (rat == "") throw "Δώσε τιμή";
    if (!(rat >= 0 && rat <= 5)) throw "Δώσε τιμή 0-5";
  } catch (err) {
    document.getElementById(`error_${z}`).innerHTML = err;
  }
  if (rat >= 0 && rat <= 5) {
    var loc = { id: z, rating: rat };
    user.push(loc);
    var countKey = Object.keys(user).length;
    for (i = 0; i < countKey; i++) {
      console.log(user[i].id + user[i].rating);
    }
    document.getElementById(`error_${z}`).remove();
    document.getElementById(`p${z}`).remove();
  }
}

function suggest() {
  console.log(user);
  if (user.length == 0) {
    document.getElementById("er").innerHTML =
      "Δεν έχεις βαθμολογήσει ταινίες, κάνε την αναζήτηση σου πάνω και ξαναπάτα το κουμπί";
  } else {
    debugger;
    document.getElementById("er").innerHTML = "";
    var user_movies = new Array();
    for (i = 0; i < user.length; i++) {
      user_movies.push(user[i].id);
    }
    debugger;
    console.log(user_movies);
    var xhr = new XMLHttpRequest();
    var url = "http://62.217.127.19:8010/ratings/";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        debugger;
        console.log(json);
        var countKey = Object.keys(json).length;
        i = 0;
        users = new Array();
        while (i < countKey) {
          loc_ar = [json[i]];
          for (j = i + 1; j < countKey; j++) {
            if (json[i].userId === json[j].userId) {
              loc_ar.push(json[j]);
              i += 1;
            }
          }
          users.push(loc_ar);
          i += 1;
        }
        debugger;
        console.log(users);
        for (i = 0; i < users.length; i++) {
          k = users[i];
          console.log(k);
          r = Object.keys(users[i]).length;
          var sum_user = 0;
          var sum_user_1 = 0;
          var sq_sum_user = 0;
          var sq_sum_user_1 = 0;
          var sum = 0;
          var core = 0;
          var d = 0;
          for (n = 0; n < user.length; n++) {
            for (j = 0; j < r; j++) {
              if (user[n].id === k[j].movieId) {
                sum_user_1 += k[j].rating;
                sq_sum_user_1 += Math.pow(k[j].rating, 2);
                sum_user += Number(user[n].rating);
                sq_sum_user += Math.pow(Number(user[n].rating), 2);
                sum += k[j].rating * Number(user[n].rating);
              }
            }
          }
          corel = sum - (sum_user * sum_user_1) / r;
          d = Math.sqrt(
            (sq_sum_user - Math.pow(sum_user, 2) / r) *
              (sq_sum_user_1 - Math.pow(sum_user_1, 2) / r)
          );
          if (d === 0) {
            core = 0;
            usersf.push({ cor: core, userId: k[0].userId });
          } else {
            core = corel / d;
            usersf.push({ cor: core, userId: k[0].userId });
          }
        }

        usersf.sort(function (a, b) {
          return a.cor - b.cor;
        });
        console.log(usersf);
        var tainies = 0;
        var r = usersf.length;
        var k = usersf.slice(1).slice(-10);
        console.log(k);
        document.getElementById(
          `last`
        ).innerHTML += `<b>Τα id των προτινόμενων ταινιών είναι:</b>`;
        k.forEach((element) => {
          debugger;
          console.log(usersf[r - 1].userId);
          var xhr2 = new XMLHttpRequest();
          var url2 = `http://62.217.127.19:8010/ratings/${element.userId}`;
          xhr2.open("GET", url2, true);
          xhr2.setRequestHeader("Content-Type", "application/json");
          xhr2.addEventListener("load", () => {
            if (xhr2.readyState === 4 && xhr2.status === 200) {
              const res = JSON.parse(xhr2.responseText);
              user.forEach((user_) => {
                res.forEach((movie) => {
                  if (
                    movie.movieId != user_.id &&
                    movie.rating == 5 &&
                    tainies < 10 &&
                    !mov.includes(movie.movieId)
                  ) {
                    console.log("Test");
                    var ul = document.getElementById("uno");
                    var li = document.createElement("li");
                    debugger;
                    li.appendChild(document.createTextNode(movie.movieId));
                    ul.appendChild(li);
                    mov.push(movie.movieId);
                    tainies += 1;
                  }
                });
              });
            }
          });
          xhr2.send();
        });
        document.getElementById(
          `fieldset_2`
        ).innerHTML += `<br><input type='button' id="print" value='Εμφάνισε τις ταινίες' onclick="printmovies()">`;
        debugger;
        console.log(mov);
      }
    };
    var data = JSON.stringify({ movieList: user_movies });
    xhr.send(data);
  }
}
printmovies();
function printmovies() {
  document.getElementById(
    "fieldset_2"
  ).innerHTML = `<h3>Οι προτεινόμενες ταινίες είναι:</h3><br>`;
  mov.forEach((element) => {
    const xhr = new XMLHttpRequest();
    const url = `http://62.217.127.19:8010/movie/${element}`;
    xhr.open("GET", url, true);
    xhr.onload = () => {
      const par = JSON.parse(xhr.response);
      document.getElementById(
        "fieldset_2"
      ).innerHTML += `<tr><td>${par[0].movieId}</td>    <td>${par[0].title}</td>    <td>${par[0].genres}</td></tr><hr class="solid">`;
    };
    xhr.send();
  });
}
//End For the application
