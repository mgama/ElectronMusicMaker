//Notes Reference http://marcgg.com/blog/2016/11/01/javascript-audio/
// 		C		C#		D		Eb		E		F		F#		G		G#		A		Bb		B
// 0	16.35	17.32	18.35	19.45	20.60	21.83	23.12	24.50	25.96	27.50	29.14	30.87
// 1	32.70	34.65	36.71	38.89	41.20	43.65	46.25	49.00	51.91	55.00	58.27	61.74
// 2	65.41	69.30	73.42	77.78	82.41	87.31	92.50	98.00	103.8	110.0	116.5	123.5
// 3	130.8	138.6	146.8	155.6	164.8	174.6	185.0	196.0	207.7	220.0	233.1	246.9
// 4	261.6	277.2	293.7	311.1	329.6	349.2	370.0	392.0	415.3	440.0	466.2	493.9
// 5	523.3	554.4	587.3	622.3	659.3	698.5	740.0	784.0	830.6	880.0	932.3	987.8
// 6	1047	1109	1175	1245	1319	1397	1480	1568	1661	1760	1865	1976
// 7	2093	2217	2349	2489	2637	2794	2960	3136	3322	3520	3729	3951
// 8	4186	4435	4699	4978	5274	5588	5920	6272	6645	7040	7459	7902

//A Notes: 10, 22, 34, 46, 58, 70, 82, 94, 108, 120
class MusicNoteGenerator {

	constructor() {
		this.notesMap = new Map();
	}

	findNoteFrequency(noteName) {
		//Setting all C Notes
		this.notesMap.set("C0", 16.35);
		this.notesMap.set("C1", 32.70);
		this.notesMap.set("C2", 65.41);
		this.notesMap.set("C3", 130.8);
		this.notesMap.set("C4", 261.6);
		this.notesMap.set("C5", 523.3);
		this.notesMap.set("C6", 1047);
		this.notesMap.set("C7", 2093);
		this.notesMap.set("C8", 4186);

		//Setting all C# Notes
		this.notesMap.set("C#0", 17.32);
		this.notesMap.set("C#1", 34.65);
		this.notesMap.set("C#2", 69.30);
		this.notesMap.set("C#3", 138.6);
		this.notesMap.set("C#4", 277.2);
		this.notesMap.set("C#5", 554.4);
		this.notesMap.set("C#6", 1109);
		this.notesMap.set("C#7", 2217);
		this.notesMap.set("C#8", 4435);

		return this.notesMap.get(noteName);
	}

	generateNoteFrequency(noteName) {
		let cNotesArray = this.createNotesArray(1);
		let cSNotesArray = this.createNotesArray(2);
		let dNotesArray = this.createNotesArray(3);
		let dSNotesArray = this.createNotesArray(4);
		let eNotesArray = this.createNotesArray(5);
		let fNotesArray = this.createNotesArray(6);
		let fSNotesArray = this.createNotesArray(7);
		let gNotesArray = this.createNotesArray(8);
		let gSNotesArray = this.createNotesArray(9);
		let aNotesArray = this.createNotesArray(10);
		let aSNotesArray = this.createNotesArray(11);
		let bNotesArray = this.createNotesArray(12);

		//Need to implement way to detect sharp Notes
		// if noteName.length 
		let noteLetter = noteName.charAt(0);
		console.log(noteLetter);
		let noteNumber = Number(noteName.charAt(1));
		console.log(noteNumber);

		let referenceFrequency = 440.0;
		let referenceFrequencyNumber = aNotesArray[5]; 
		console.log('the referenceFrequencyNumber is ' + referenceFrequencyNumber);
		//Formula to calculate frequency
		//https://pages.mtu.edu/~suits/NoteFreqCalcs.html
		let twelthRootOfTwo = 1.059463094359;

		let numberFromNotesArray = 0;
		//Find note number from arrays
		switch(noteLetter) {
			case 'C':
				numberFromNotesArray = cNotesArray[noteNumber];
				break;
			case 'C#':
				numberFromNotesArray = cSNotesArray[noteNumber];
				break;
			case 'D':
				numberFromNotesArray = dNotesArray[noteNumber];
				break;
			case 'D#':
				numberFromNotesArray = dSNotesArray[noteNumber];
				break;
			case 'E':
				numberFromNotesArray = eNotesArray[noteNumber];
				break;
			case 'F':
				numberFromNotesArray = fNotesArray[noteNumber];
				break;
			case 'F#':
				numberFromNotesArray = fSNotesArray[noteNumber];
				break;
			case 'G':
				numberFromNotesArray = gNotesArray[noteNumber];
				break;
			case 'G#':
				numberFromNotesArray = gSNotesArray[noteNumber];
				break;
			case 'A':
				numberFromNotesArray = aNotesArray[noteNumber];
				break;
			case 'A#':
				numberFromNotesArray = aSNotesArray[noteNumber];
				break;
			case 'B':
				numberFromNotesArray = bNotesArray[noteNumber];
				break;
			default:
				numberFromNotesArray = aNotesArray[5];
				break;
		};
		console.log('The number from the notesArray is ' + numberFromNotesArray);

		let semiTonesDifference = numberFromNotesArray - referenceFrequencyNumber;
		console.log('The semiTonesDifference is ' + semiTonesDifference);
		let frequency = referenceFrequency * Math.pow(twelthRootOfTwo, semiTonesDifference);
		console.log('The frequency to play is ' + frequency);
		return frequency;
	}

	createNotesArray(noteNumber) {
		let notesArray = [];
		notesArray[0] = noteNumber;
		for (let i = 1; i < 15; i++) {
			noteNumber = noteNumber + 12;
			notesArray[i] = noteNumber;
			console.log(i);
		};
		console.log('The generated array of Notes is ' + notesArray);
		return notesArray;
	}

	playNote(noteName) {
		let noteFrequency = this.generateNoteFrequency('C0');
		let context = new AudioContext();
        let o = context.createOscillator();
        o.type = "sine";
        // let noteFrequency = this.findNoteFrequency(noteName);
        o.frequency.value = noteFrequency;
        o.connect(context.destination);
        o.start();
	}
	
}
module.exports = MusicNoteGenerator; 