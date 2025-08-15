//https://teachablemachine.withgoogle.com/models/DDFiGSQBn/


prediccion1 = ":D"

prediccion2 = ">D"

Webcam.attach(camera);
camera =document.getElementById("camera")

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality:90
})

function takesnapshot(){
    
    Webcam.snap(function(data_url){
        document.getElementById("result").innerHTML='<img id="selfie_image" src="'+data_url+'"/>'
    })
};

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/DDFiGSQBn/model.json',modelLoader)

function modelLoader(){
    console.log("el modelo se cargo")
}

function check(){
    img =document.getElementById('selfie_image')
    classifier.classify(img, gotResult)
}

function gotResult(error, results){
    if(error){ 
        console.log(error);} 
    else{
        console.log(results)
        console.log(results[0].label)
        console.log(results[1].label)
        document.getElementById("result_emotion_name").innerHTML= "<h3 class='btn btn-danger'>"+results[0].label+"</h3>" 
        document.getElementById("result_emotion_name2").innerHTML= "<h3 class='btn btn-danger'>"+results[1].label+"</h3>" 

        speak()

        if(results[0].label== "feliz"){
            document.getElementById("update_emoji").innerHTML = "&#128522"
        }

        if(results[0].label== "triste"){    
            document.getElementById("update_emoji").innerHTML = "&#128532"
        }

        if(results[0].label== "enojado"){
            document.getElementById("update_emoji").innerHTML = "&#128545"
        }

        if(results[1].label== "feliz"){
            document.getElementById("update_emoji2").innerHTML = "&#128512"
        }

        if(results[1].label== "triste"){
            document.getElementById("update_emoji2").innerHTML = "&#128546"
        }

        if(results[1].label== "enojado"){
            document.getElementById("update_emoji2").innerHTML = "&#128548"
        }
    }

}

function speak(){
  var synth = window.speechSynthesis;
  speak_data_1 = "La primera prediccion es " + prediccion1;
  speak_data_2 = "Y la segunda prediccion es " + prediccion2;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
  synth.speak(utterThis);
}