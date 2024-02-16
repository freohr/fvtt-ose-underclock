if (!(clock = game.actors.find((actor) => actor.name === "Underclock"))) {
  ui.notifications.warn("There is no Underclock to show.");
  return;
}

ChatMessage.create({content: `The Underclock is currently at <b>${clock.getFlag("world", "clockValue")}</b>.`})
