async function initUnderclock() {
  const clock = await Actor.create({
    name: "Underclock",
    type: "monster",
    img: "icons/magic/time/clock-spinning-gold-pink.webp",
    prototypeToken: {
      name: "Underclock",
      texture: { src: "icons/magic/time/clock-spinning-gold-pink.webp" },
    },
    flags: {
      world: {
        clockDie: "d6x6+1",
        clockValue: 20,
      },
    },
  });

  return clock;
}

async function getClockActor() {
  if (!(clock = game.actors.find((actor) => actor.name === "Underclock"))) {
    clock = await initUnderclock();
  }

  return clock;
}

async function rollUnderclock(clockDie) {
  const rollResult = await new Roll(clockDie).roll();

  return rollResult.total;
}

async function advanceUnderclock() {
  const clock = await getClockActor();

  const advanceRoll = await new Roll(clock.getFlag("world", "clockDie"));
  await advanceRoll.roll();
  
  const advancedClockValue =
    clock.getFlag("world", "clockValue") - advanceRoll.total;

  let clockMessage = `Clock roll: <b>${advanceRoll.total}</b></br>The Underclock is now at: <b>${advancedClockValue}</b>`;
  let resetClock = false

  if (advancedClockValue == 3 || advancedClockValue == 0) {
    clockMessage += "<br/>You spot something about the next Encounter!";
    resetClock = true
  }

  if (advancedClockValue < 0) {
    clockMessage += "<br/>You encounter something!";
    resetClock = true
  } 

  if (resetClock) {
    clock.setFlag("world", "clockValue", 20);
  } else {
    clock.setFlag("world", "clockValue", advancedClockValue);
  }

  advanceRoll.toMessage({flavor: clockMessage})
}

advanceUnderclock();
