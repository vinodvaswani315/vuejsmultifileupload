export default {
name: "multiUploader",
template: `
<div class="image-preview-container">
<div class="preview">
</div>
<label for="file-upload">Upload Image</label>
<input type="file" id="file-upload" multiple="multiple"  @change="previewImage($event);" />
<template v-for="file in files">
  <img :src="file" alt="File">
</template>
<div class="progress">
  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :aria-valuenow="percentage" aria-valuemin="0" aria-valuemax="100" :style="{'width': percentage+'%'}"></div>
</div>
</div>`,
props:{
  apiUrl: String
},
data() {
return {
    percentage: 0,
    files:[],
}
},
mounted(){
  
},
methods:{
previewImage(event)
{
/**
 * Get the selected files.
 */
const imageFiles = event.target.files;
/**
 * Count the number of files selected.
 */
const imageFilesLength = imageFiles.length;

/**
 * If at least one image is selected, then proceed to display the preview.
 */

var formData = new FormData();


if (imageFilesLength > 0)
{
for( var i = 0; i < imageFilesLength; i++ )
{

    formData.append("file"+i, imageFiles[i]);

    /**
    * Get the image path.
    */
    const imageSrc = URL.createObjectURL(imageFiles[i]);
    /**
    * Select the image preview element.
    */
    const previewContainer = document.querySelector(".preview");


    // create a Image Wrapper
    const imageWrapper = document.createElement("div");
    imageWrapper.className = "file-wrapper";


    // create a Remove Button
    const removeButton = document.createElement("button");
    removeButton.classList = "remove-file";
    removeButton.innerText = "Remove";


    var img = document.createElement('img');
    img.src = imageSrc;
    img.classList.add("img-preview");


    imageWrapper.appendChild(img);
    imageWrapper.appendChild(removeButton);
    previewContainer.appendChild(imageWrapper);

}
}


axios.post(this.apiUrl, formData,{
onUploadProgress: progressEvent => {

    this.percentage = ((progressEvent.loaded / progressEvent.total ) * 100).toFixed()

}
})
.then((response)=>{
this.files = response.data
},{
headers:{
'Content-Type': 'multipart/form-data'
}
})
.catch(function (error) {
console.log(error);
});


}  
}
}