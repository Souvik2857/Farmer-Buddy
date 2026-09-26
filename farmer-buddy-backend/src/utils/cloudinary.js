import cloudinary from 'cloudinary'
import fs from 'fs'
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadonCloudinary=async(localFilePath)=>{
    try{
        if(!localFilePath){
            return null
        }
        const response=await cloudinary.uploader.upload(localFilePath,{resource_type:"auto" })
        fs.unlinkSync(localFilePath)
        
        return response.url;
    }
    catch(err){
        fs.unlinkSync(localFilePath) //remove the locally saved temporary file as the upload failed
        console.log(err);
        return null
    }
}

const deleteImageOnCloudinary=async(imageUrl)=>{
    try {
        if(!imageUrl){
            return null
        }
          const publicId = imageUrl
            .split('/')
            .pop()
            .split('.')[0]
        const response=await cloudinary.uploader.destroy(publicId)
        return true
        
    } catch (error) {
        return false
    }

}
export {uploadonCloudinary,deleteImageOnCloudinary}