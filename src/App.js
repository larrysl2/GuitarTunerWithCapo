import React, { useState } from "react";
import { useEffect } from "react";
import './index.css';

const groups = [
  {
    name: "Standard",
    notes: [
      { name: "E2s", displayName: "E2", freq: 82.41 },
      { name: "As", displayName: "A", freq: 110 },
      { name: "Ds", displayName: "D", freq: 146.8 },
      { name: "Gs", displayName: "G", freq: 196 },
      { name: "Bs", displayName: "B", freq: 246.9 },
      { name: "E4s", displayName: "E4", freq: 329.6 },
    ],
  },
  {
    name: "Fret 1",
    notes: [
      { name: "F21", displayName: "F2", freq: 87.31 },
      { name: "A#1", displayName: "A#", freq: 116.54 },
      { name: "D#1", displayName: "D#", freq: 155.56 },
      { name: "G#1", displayName: "G#", freq: 207.65 },
      { name: "C1", displayName: "C", freq: 261.63 },
      { name: "F1", displayName: "F", freq: 349.23 },
    ],
  },
  {
    name: "Fret 2",
    notes: [
      { name: "Gb2", displayName: "Gb", freq: 92.5 },
      { name: "B2", displayName: "B", freq: 123.47 },
      { name: "E2", displayName: "E", freq: 164.81 },
      { name: "A2", displayName: "A", freq: 220.00 },
      { name: "Db2", displayName: "Db", freq: 277.18 },
      { name: "Gb22", displayName: "Gb", freq: 369.99 },
    ],
  },
  {
    name: "Fret 3",
    notes: [
      { name: "G3", displayName: "G", freq: 98.0},
      { name: "C3", displayName: "C", freq: 130.81 },
      { name: "F3", displayName: "F", freq: 174.61 },
      { name: "Bb3", displayName: "Bb", freq: 233.08},
      { name: "D3", displayName: "D", freq: 293.66 },
      { name: "G33", displayName: "G", freq: 392.00 },
    ],
  },{
    name: "Fret 4",
  notes: [
    { name: "Ab4", displayName: "Ab", freq: 103.83 },
    { name: "Db4", displayName: "Db", freq: 138.59 },
    { name: "Gb4", displayName: "Gb", freq: 185.00 },
    { name: "B4", displayName: "B", freq: 246.94 },
    { name: "Eb4", displayName: "Eb", freq: 311.13 },
    { name: "Ab44", displayName: "Ab", freq: 415.3 },
  ],
  },

  {
  name: "Fret 5",
  notes: [
    { name: "A5", displayName: "A", freq: 110.0 },
    { name: "D5", displayName: "D", freq: 146.83 },
    { name: "G5", displayName: "G", freq: 196.00 },
    { name: "C5", displayName: "C", freq: 261.63 },
    { name: "E5", displayName: "E", freq: 329.63 },
    { name: "A55", displayName: "A", freq: 440.00 },
  ],
  },

  {
  name: "Fret 6",
  notes: [
    { name: "Bb6", displayName: "Bb", freq: 116.54 },
    { name: "Eb6", displayName: "Eb", freq: 155.56 },
    { name: "Ab6", displayName: "Ab", freq: 207.65 },
    { name: "Db6", displayName: "Db", freq: 277.18 },
    { name: "F6", displayName: "F", freq: 349.23 },
    { name: "Bb66", displayName: "Bb", freq: 466.16 },
  ],
  },

];

const Tuner = () => {
  const [context, setContext] = useState(null); //audiocontext from webaudio api
  const [oscillator, setOscillator] = useState(null); //osicalltor node from web audio api
  const [selectedNote, setSelectedNote] = useState(null); //set selected note
  const [selectedGroup, setSelectedGroup] = useState(0); //set selected group of notes
  const [displayNote,setdisplayNote]=useState(null); //display current note
  useEffect(() => {
    setContext(new (window.AudioContext || window.webkitAudioContext)()); //initiailize context
  }, []);

  useEffect(() => { //create new osicillator. connect to context destination. if context and note defined set freq. 
    if (context && selectedNote) {
      if (oscillator) {
        oscillator.stop();
      }

      const newOscillator = context.createOscillator(); //create oscillator node
      newOscillator.frequency.value = selectedNote.freq;
      newOscillator.connect(context.destination);
      newOscillator.start();

      setOscillator(newOscillator);
    }
  }, [context, selectedNote]);
  
  const handleNoteSelection = (note) => { //set note on change
    setSelectedNote(note);
    setdisplayNote(note.displayName)
  };

  
  const handleGroupSelection = (event) => { //select group
    setSelectedGroup(event.target.value);
  };
  const stop =()=>{ //stop if true
    if(oscillator){
      setOscillator();
      oscillator.stop();
    }
  }

  return (
<div className="container mx-auto bg-amber-600 rounded-xl shadow border p-8 m-10 position-relative">

      <div className="text-center text-4xl font-bold">Guitar Tuner for Capo Positions</div>
      <select onChange={handleGroupSelection} className="border border-gray-400 rounded p-2">
        {groups.map((group, index) => ( //map out groups in dropdown
          <option key={group.name} value={index}>
            {group.name}
          </option>
        ))}
      </select>
      <div className="mt-6">
        
        <ul>
          {groups[selectedGroup].notes.map((note, index) => ( //map out notes
            <li key={note.name}>
              <button onClick={() => handleNoteSelection(note)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 position-relative relative" style={{ width: `50px` }}>
                {note.displayName}
                <span className="w-full h-1 bg-black absolute top-0 right-0" style={{ transform: `translateY(100%)`, zIndex: 1, width: `2300%`, left: `100%`, borderRadius: `4px` }}></span>
              </button>

            </li>
          ))}
        </ul>
      </div>
      <div className = "mt-6 text-center">
       
      <button onClick={stop} className="mt-6 text-center bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">
        Stop
      </button>
      </div>
      <div className="mt-6 text-4xl text-right font-bold">Note playing: {displayNote}</div>
    </div>
  );



}
export default Tuner;

