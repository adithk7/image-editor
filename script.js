
const filterscontainer = document.querySelector(".filters");
const imagecanvas=document.querySelector("#image-canvas");
const imageinput = document.querySelector("#image-input");
const canvasctx = imagecanvas.getContext("2d")
const resetb = document.querySelector("#reset-btn")
const down = document.querySelector("#download-btn")
let file ="null";
let image ="null";
let filters = {
brightness: {value:100,
    min:0,
    max:200,
    unit:"%"
},
contrast:{value:100,
    min:0,
    max:200,
    unit:"%"
},
saturation: {value:100,
    min:0,
    max:200,
    unit:"%"
},
hueRotation: {value:0,
    min:0,
    max:360,
    unit:"deg"
},
blur: {value:0,
    min:0,
    max:20,
    unit:"px"
},
grayscale: {value:0,
    min:0,
    max:200,
    unit:"%"
},
sepia: {value:0,
    min:0,
    max:200,
    unit:"%"
},
opacity:{value:200,
    min:0,
    max:200,
    unit:"%"
},
invert: {value:0,
    min:0,
    max:200,
    unit:"%"
}
}

function createFilterElement(name,unit="%",value,min,max){
const div =document.createElement("div");
div.classList.add("filter");

const input = document.createElement("input");
input.type="range";
input.value = value;
input.min=min;
input.max=max;
input.id=name;

const p =document.createElement("p");
p.innerText=name;
div.appendChild(p);

div.appendChild(input);

input.addEventListener("input",(event)=>{
    filters[name].value=input.value
    applyfilter()

})
return div;

}
function createfilter(){

Object.keys(filters).forEach(key=>{

   const filterElement= createFilterElement(key,filters[key].unit,filters[key].value,filters[key].min,filters[key].max)
    filterscontainer.appendChild(filterElement)
    
})}
createfilter();

imageinput.addEventListener("change",(e)=>{
const file= e.target.files[0];    
const img =new Image()
const imageplaceholder=document.querySelector(".placeholder");
imagecanvas.style.display="block"
imageplaceholder.style.display="none"
img.src=URL.createObjectURL(file)

img.onload =()=>{
    image = img;
    imagecanvas.width = img.width;
    imagecanvas.height = img.height;


    canvasctx.drawImage(img,0,0)
}

})

function applyfilter(){
    canvasctx.clearRect(0,0,imagecanvas.width,imagecanvas.height)
  canvasctx.filter = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayscale.value}${filters.grayscale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
    `;

    canvasctx.drawImage(image,0,0)
}

resetb.addEventListener("click",()=>{


 filters = {
brightness: {value:100,
    min:0,
    max:200,
    unit:"%"
},
contrast:{value:100,
    min:0,
    max:200,
    unit:"%"
},
saturation: {value:100,
    min:0,
    max:200,
    unit:"%"
},
hueRotation: {value:0,
    min:0,
    max:360,
    unit:"deg"
},
blur: {value:0,
    min:0,
    max:20,
    unit:"px"
},
grayscale: {value:0,
    min:0,
    max:200,
    unit:"%"
},
sepia: {value:0,
    min:0,
    max:200,
    unit:"%"
},
opacity:{value:200,
    min:0,
    max:200,
    unit:"%"
},
invert: {value:0,
    min:0,
    max:200,
    unit:"%"
}
}
applyfilter();
filterscontainer.innerHTML=""
createfilter();


})

down.addEventListener("click",()=>{
const link = document.createElement('a')

link.download="edited-image.png"
link.href=imagecanvas.toDataURL()
link.click()


})