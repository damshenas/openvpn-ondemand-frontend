
var apigw = 'https://wo5ktjj7sj.execute-api.us-east-1.amazonaws.com/prod/ovod/get'

$(document).ready(function () {
  console.log('Heartbeat.');
  var form = document.getElementById("information_form");
  form.addEventListener("submit", submitForm, true);
});

var submitForm = function(event) {
  console.log('Heartbeat.');
  event.preventDefault();

  $.ajax({
      url: apigw,
      type: 'POST',
      data: {
        username: $("#username").val(),
        password: $("#password").val(),
        region: $("#region").val(),
      },

      success: function (data) {
        $("#result").text(data);
        $("#result").css("color", "green");
      },

      error: function(xhr, textStatus, errorThrown){
        $("#result").text('Login failed. Please contact admin.');
        $("#result").css("color", "red");
        console.log(textStatus);
        console.log(errorThrown);
      },

      cache: false,
      contentType: false,
      processData: false
  });

};
