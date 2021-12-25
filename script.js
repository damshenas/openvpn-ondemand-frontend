
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

      success: function (data, _, _) {

        if (!data) {
          $("#failed").show();
          $("#initializing").hide();
          return;
        }

        $("#formContent, #failed").hide();
        $("#initializing").show();

        var counter=0
        var isConfigReady = setInterval( function() {
          $("#retryNumber").text(counter)
          $.ajax({url: data.preSignedUrl, type: 'GET', success: function(_, _, xhr) {
            if (xhr.status == 200) {
              $("#initialized").show();
              $("#formContent, #initializing, #failed").hide();
              clearInterval(isConfigReady);
            }
          }});
          counter++;
        }, 3 * 1000);

        $("#preSignedUrl").attr("href", data.preSignedUrl);
      },
    
      error: function(_, _, errorThrown){
        $("#failed").show();
        $("#initializing").hide();
        console.log(errorThrown);
      },

      cache: false,
      contentType: false,
      processData: false
  });

  console.log('Form submited.');
};
