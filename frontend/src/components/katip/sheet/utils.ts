import { mParams } from "./mparams";
import { tmmKomas, tmmMidiPitches } from "../constants";
import Note from "./Note";

export function setMakam(makam: string, accidentals: string[]) {
  mParams.makam.name = makam;
  mParams.makam.accidentals = accidentals.slice();
}

export function setUsul(usuName: string, meter: number[], tempo: number) {
  mParams.usul.name = usuName;
  mParams.usul.meter = meter.slice();
  mParams.usul.tempo = tempo;
}

export function playNote(note: Note) {
  if (!mParams.soundActive || !mParams.canUseSound) {
    return 0;
  }
  let noteBare = note.getNote();
  let dur = note.getDuration();
  let tempo = mParams.usul.tempo;
  let duration = 60 / tempo / (1 / 4 / dur);
  if (noteBare !== "rest") {
    let acc = note.getAcc();
    let pitch = tmmMidiPitches[noteBare];
    if (acc) {
      let amount = tmmKomas[acc.substr(-1)];
      if (acc.charAt(0) === "b") {
        amount *= -1;
      }
      pitch += amount;
    }
    mParams.instrument.start(pitch, 0, { duration: duration });
  }
  return duration;
}

export function playWhole(songObj: Note[], songEndedCallback: () => void) {
  if (!songObj || songObj.length === 0) {
    songEndedCallback();
    return;
  }
  let note = songObj[0];
  let tail = songObj.slice(1);
  if (!tail) {
    return;
  }
  let wait = playNote(note) * 1000;
  setTimeout(function () {
    playWhole(tail, songEndedCallback);
  }, wait);
}

export function allowNewInsertion(allow: boolean) {
  mParams.allowInsert = !!allow;
}
