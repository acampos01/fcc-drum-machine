const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

function App(){
  const [volume, setVolume] = React.useState(1);
  const [recording, setRecording] = React.useState("");
  const [speed, setSpeed] = React.useState(0.5);

  const playRecording = () =>{
    let index = 0;
    let recordArray = recording.split(" ");
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArray[index]);
      audioTag.volume = volume;
      audioTag.currenTime = 0;
      audioTag.play();
      index++
    }, speed*600);
    setTimeout(
      () => clearInterval(interval),
      600 * speed * recordArray.length -1
    );
  };

  return(
    <div className="container-fluid vh-100 text-center bg-info-subtle">
      <div className="p-4">
        <h1>Drum Machine</h1>
      </div>
      <div className="row">     
        <div id="drum-machine" className="col text-center">
          {audioClips.map((clip) => (
            <Pad 
              id={clip.id} 
              clip={clip} 
              volume={volume} 
              setReconding={setRecording}
            />
          ))}
        </div>
      </div>
      <div id="controls"  className="text-center">
        <div className="row align-content-center justify-content-center">
          <h4 id="display" className="bg-info rounded w-25 text-center"></h4>
        </div>
        
        <br/>
        <h4>Volume</h4>
        <input 
          type= "range"
          step= "0.01"
          onChange={(e)=> setVolume(e.target.value)}
          value= {volume}
          max= "1"
          min= "0"
          className="w-50"
        />
        <h3>{recording}</h3>
        {recording && ( 
          <>
          <button onClick={playRecording} className="btn btn-success">Play</button>
          <button onClick={()=>setRecording("")} className="btn btn-danger">Clear</button>
          <h4>Speed</h4>
          <input 
            type= "range"
            step= "0.01"
            onChange={(e)=> setSpeed(e.target.value)}
            value= {speed}
            max= "1.2"
            min= "0.1"
            className="w-50"
          />
          </>
        )}
      </div>
    </div>
  );
}

function Pad({clip, volume, setReconding}){
  const [active, setActive] = React.useState(false);


  React.useEffect(() => {
    document.addEventListener("keydown",handleKeyPress);
    return () => {
      document.removeEventListener("keydown",handleKeyPress);
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  };

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    document.getElementById("display").innerText = clip.id;
    setActive(true);
    setTimeout(() => setActive(false), 200);
    audioTag.volume = volume;
    audioTag.currenTime = 0;
    audioTag.play();
    setReconding(prev => prev + clip.keyTrigger + " ");
    console.log(audioTag);
  };

  return(
    <div onClick={playSound} id={clip.id}  className={`drum-pad btn btn-secondary p-4 m-3 ${active && 'btn-warning'}`}>
      <audio className="clip" id={clip.keyTrigger} src={clip.url} />
      {clip.keyTrigger}
    </div>
  );
}



ReactDOM.render(<App/>, document.getElementById('app'))