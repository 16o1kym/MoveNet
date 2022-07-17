
const canvas = document.getElementById ("display_image");
const img_file = document.getElementById ("input_file");
const get_data_btn = document.getElementById("get_data");

var image = undefined;



const setImage = (val) => {
    image = val;
}



const readImage = (file) => {
    // Check if the file is an image.

    if (!checkImageType(file)) {
      console.log('File is not an image or video.', file.type, file);
      return;
    }
  
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      setImage(event.target.result);
      loadImage(canvas, image);
    });
    reader.readAsDataURL(file);


}

const checkImageType = (file) =>{
    if(file.type && ((!file.type.startsWith("image/")) || (!file.type.startsWith("video/")))) return true;
    return false;
}

const loadImage = (canvas, imgSrc , callback=()=>{}) => {
    const ctx = canvas.getContext("2d");
    const img = new Image ();

    img.addEventListener('load', function(){
        console.log(this.height, this.width);
        scaleToFit (this, canvas, ctx );
        callback ();
    })
    img.crossOrigin = "Anonymous";
    img.src = imgSrc;



}

const scaleToFit = (img, canvas, ctx)=>{
    img.aspectRatio = img.width/img.height;

  if (img.height>550)
     img.height = 545;
   img.width = window.innerWidth;
    canvas.width = img.width
   canvas.height = img.height;
    canvas.style.aspectRatio = img.aspectRatio;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

img_file.addEventListener ("change", (e)=>{
    const val = e.target.files[0];
    readImage (val);
})


const get_data = () =>{
    console.log("Logic to get data points");


    get_data_btn.addEventListener("click" , async (e)=>{
        get_data_btn.disabled = true;
        const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
        const poses = await detector.estimatePoses(canvas);
        console.log(poses[0])

        get_data_btn.disabled = false;
    })
}