// Get references to page elements
var $name = $("#name");
var $email = $("#email");
var $message = $("#mesg");
var $item=$("#item-id");

var $submitBtn = $("#send-message");


// The API object contains methods for each kind of request we'll make
var messageAPI = {
  saveMessage: function (message) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/message",
      data: JSON.stringify(message)
    });
  },
  getItems: function () {
    return $.ajax({
      url: "/api/messages",
      type: "GET"
    });
  }
};

// handleFormSubmit is called whenever we save a new message
// Save the new message to the db and refresh form
var handleFormSubmit = function (event) {
  event.preventDefault();

  var message = {
    name: $name.val().trim(),
    email: $email.val().trim(),
    message: $message.val().trim(),
    item:$item.val().trim()
  };

  if (message.name == "" || message.email == "" || message.message=="") {
    swal("", "All fields are required.", "error");
    return;
  }

  messageAPI.saveMessage(message).then(function () {
    $name.val("");
    $message.val("");
    $email.val("");
    swal("Message sent!", "We will respond as soon as possible.", "success");
    window.location.href="/all";
});

};

$submitBtn.on("click", handleFormSubmit);

