if (!(clock = game.actors.find((actor) => actor.name === "Underclock"))) {
  ui.notifications.warn("There is no Underclock to reset.");
  return;
}

clock.setFlag("world", "clockValue", 20)

ChatMessage.create({content: "The Underclock has been reset to <b>20</b>."})
