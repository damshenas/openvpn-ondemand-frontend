
var apigw = 'https://wo5ktjj7sj.execute-api.us-east-1.amazonaws.com/prod/'

$(document).ready(function () {
  console.log('Heartbeat.');
  var form = document.getElementById("information_form");
  form.addEventListener("submit", submitForm, true);
});

var submitForm = function(event) {
  event.preventDefault();

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
          return;
        } else if (!data.ready) {
          $("#initializing").show();
        }

        $('#formContent').hide();

        var counter=0
        var isConfigReady = setInterval( function() {
          $("#retryNumber").text(counter)
          $.ajax({url: data.preSignedUrl, type: 'GET', always: function(xhr) {
            if (xhr.status == 200) {
              $("#initialized").show();
              $("#initializing").hide();
              $("#preSignedUrl").attr("href", data.preSignedUrl);
            }
            clearInterval(isConfigReady);
          }});
          counter++;
        }, 3 * 1000);
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

  console.log('Form submited.');
};
