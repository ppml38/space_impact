export class audio{
    constructor(filename){
        this.audioContext = new AudioContext();
        this.note;
        fetch(filename)
        .then(data => data.arrayBuffer())
        .then(arrayBuffer =>
            this.audioContext.decodeAudioData(arrayBuffer))
        .then(decodedAudio => {
           this.note = decodedAudio;
        })
    }
    play(){
        const aplay = this.audioContext.createBufferSource();
        aplay.buffer = this.note;
        aplay.connect(this.audioContext.destination);
        aplay.start()
    }
}