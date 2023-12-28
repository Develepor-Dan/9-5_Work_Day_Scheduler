$(function () {
  // Display the current date in the header
  var currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);
  console.log(currentDate)

  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function () {
    
    // Get the id of the parent time-block
    var blockId = $(this).parent().attr("id");

    // Get the user input from the corresponding textarea
    var description = $(this).siblings(".description").val();

    // Save the user input to localStorage using the time-block id as a key
    localStorage.setItem(blockId, description);

    // Show notification that appointment is added to localStorage
    $("#notify").fadeIn().delay(1500).fadeOut();

    // Log the button click to the console
    console.log("Save button clicked for time-block:", blockId);
  });

  // Function to update time-block classes based on current time
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // Remove all classes and add the appropriate one
      $(this).removeClass("past present future");
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // Call the function to update time-block classes
  updateTimeBlocks();

  // Get user input from localStorage and set textarea values
  $(".time-block .description").each(function () {
    var blockId = $(this).parent().attr("id");
    var savedDescription = localStorage.getItem(blockId);

    if (savedDescription) {
      $(this).val(savedDescription);
    }
  });
});
