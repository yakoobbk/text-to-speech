const textArea=document.querySelector('#text');
let lang=document.querySelector('#languages');
const button=document.querySelector('.submit');

let synth = speechSynthesis;
let isSpeaking = true;
 
function voiceSpeech(){
    for( let voice of synth.getVoices()){
        let option =document.createElement('option')
        option.text=voice.name;
        lang.add(option)
        console.log(option)

    }
}
synth.addEventListener('voicechanged',voiceSpeech)

function textToSpeech(text){
    let utternance= new SpeechSynthesisUtterance(text)
    for(let voice of synth.getVoices()){
        if(voice.name=== lang.value){
            utternance.voice =voice
        }
    }
    speechSynthesis.speak(utternance)
}

button.addEventListener('click',(e)=>{
    e.preventDefault()
    if(textArea.value !=''){
        if(!synth.speaking){
            textToSpeech(textArea.value)
        }
        if(textArea.value.length >80){
            if(isSpeaking){
                synth.resume()
                isSpeaking= false
                button.innerHTML='pause speech'
            }else{
                synth.pause()
                isSpeaking =true
                button.innerHTML='Resume speech'
            }
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking=true
                    button.innerHTML='convert to speech'
                }
            })
        }else{
            button.innerHTML='convert to speech'
        }
    }
})