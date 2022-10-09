console.log("Hello From JS");

$("#search-button").on("click", function (e) {
  e.preventDefault();
  $("#judulPencarian").html(
    `Kamu Mencari '<b>${$("#search-input").val()} </b>'`
  );
  $("#movie-list").html("");
  //   console.log("event");

  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apiKey: "8d25cb5e",
      s: $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response === "True") {
        let movieList = result.Search;
        $.each(movieList, function (i, data) {
          $("#movie-list").append(`    
          <div class=" col-sm-6 col-lg-3">   
            <div class="card my-3 myShadow">
                <img src="${data.Poster}" class="card-img-top scaleUp" alt="Movie-Poster-NotFound" />
                <div class="card-body">
                    <h5 class="card-title">${data.Title}</h5>
                    <p class="card-subtitle">
                        ${data.Year}
                    </p> 
                    <a class="card-link movie-details" href="#" 
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal" data-id=${data.imdbID}>See Details</a>         
                </div>
            </div>
          </div>
          `);

          //
        });

        //
      } else {
        $("#movie-list").html(`      
        <h2 class="notfound">${result.Error}</h2>
        <p class="blockquote-footer">
          Mungkin ada yang salah dengan inputan anda, perhatikan spasi dan
          symbol lainnya.
        </p>
        `);
      }
    },
  });

  $("#search-input").val("");
});

$("#movie-list").on("click", ".movie-details", function () {
  let movId = $(this).data("id");
  $("#movie-modal-details").html("");
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apiKey: "8d25cb5e",
      i: movId,
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $("#movie-modal-details").append(`<div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel" >Details Of <b>${movie.Title}</b> </h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body" id="movie-details">
        <div class="row flex-column flex-lg-row">
          <div class="col d-flex justify-content-center align-items-center">
            <div class="" style="width: 18rem">
              <img src=${movie.Poster} class="card-img-top img-fluid" alt="movie-image" />
            </div>
          </div>
          <div class="col p-4 ">
            <p class="movieProperty m-0"><span>Judul :</span>${movie.Title}</p>
            <p class="movieProperty m-0"><span>Rilis :</span>${movie.Released}</p>
            <p class="movieProperty m-0"><span>Genre :</span>${movie.Genre}</p>
            <p class="movieProperty m-0"><span>Durasi :</span>${movie.Runtime}</p>
            <p class="movieProperty m-0"><span>Direktur :</span>${movie.Director}</p>
            <p class="movieProperty m-0"><span>Negara :</span>${movie.Country}</p>
            <p class="movieProperty m-0"><span>Penghargaan : </span>${movie.Awards}</p>
            <details class="my-1">
              <summary class="movieProperty">Tampilkan Plot</summary>
              <p>
                ${movie.Plot}
              </p>
            </details>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
      </div>`);
      } else {
        alert("Not Found, Maybe Deleted ");
      }
    },
  });
});

// console.log($.ajax({}));
