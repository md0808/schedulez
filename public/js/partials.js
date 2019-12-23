$(document).ready(function() {
  if ($(this).attr("scheduled") === "false") {
    $(this).attr("scheduled", "true");
  }
});
