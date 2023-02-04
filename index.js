$(document).ready(function () {
  $("#clear-btn").click(function (e) {
    $("#cityname").val("");
    $(".whether-main h2").remove();
    $(".whether-box div").remove();
  });

  $("#btn").click(function (e) {
    e.preventDefault();
    let cityname = $("#cityname").val();
    let API_KEY = "a66be01f7cbc44b4b88131818221506";
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityname}&aqi=no`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        let location = json.location;
        let current = json.current;
        $("#cloud-img").attr("src", "http:" + current.condition.icon);
        let element = ["Pressure", "Humidity", "Precipitation"];

        let data = [current.precip_in, current.humidity, current.pressure_in];

        element.forEach((item, index) => {
          $(".whether-box").append(
            `<div><h2>${item}</h2><h4>${data[index]}</h4></div>`
          );
        });

        let mainData = [
          current.temp_c,
          current.condition.text,
          location.name + " , " + location.country,
        ];

        mainData.forEach((item, index) => {
          $(".whether-main").append(
            `<h1>${item} ${index == 0 ? "&deg; C" : ""}</h1>`
          );
        });
      })
      .catch((err) => {
        alert("API error");
        console.log(err);
      });
  });
});
