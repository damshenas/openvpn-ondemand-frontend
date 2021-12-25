
var apigw = 'https://wo5ktjj7sj.execute-api.us-east-1.amazonaws.com/prod/'

$(document).ready(function () {
  console.log('Heartbeat.');
  var form = document.getElementById("information_form");
  form.addEventListener("submit", submitForm, true);
});

var submitForm = function(event) {
  console.log('Heartbeat.');
  if (event) {
    console.log('stopped the default')
    event.preventDefault();
  }

  $.ajax({
      url: apigw,
      type: 'POST',
      data: JSON.stringify({
        username: $("#username").val(),
        password: $("#password").val(),
        region: $("#region").val(),
      }),
      contentType: 'application/json; charset=utf-8',

      success: function (data, textStatus, xhr) {
        console.log(xhr.status);
        console.log(data);

        if (!data) {
          $("#failed").show();
        }

        $('#formContent').hide();

        if (data.ready) {
          $("#initialized").show();
          $("#initializing").hide();
          $("#preSignedUrl").attr("href", data.preSignedUrl);
        } else {
          $("#initializing").show();
          $("#retry").attr("href", "javascript:submitForm();");
        }
      },

      error: function(xhr, textStatus, errorThrown){
        $("#failed").show();
        console.log(textStatus);
        console.log(errorThrown);
      },

      cache: false,
      contentType: false,
      processData: false
  });

};
