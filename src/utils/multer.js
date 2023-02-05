const multer = require("multer")
const path = require("path") 

 const upload = multer({
     storage: multer.diskStorage({}),
    
 filename:(req, file, cb) =>{
    cb(null, new Date().toISOString() + file.originalname);
  },
  
 fileFilter: (req,file,cb)=>{
 let ext = path.extname(file.originalname)
  if(ext !=='.jpeg'&& ext !=='.jpg' && ext !== '.png'){
  cb(new Error('un supported format'),false)
  return
  }
  cb(null, true)
 }
});

const filesName = multer({
        storage: multer.diskStorage({}),
       filename:(req, file, cb) =>{
        cb(null, new Date().toISOString() + file.originalname);
        
      },
      
     fileFilter:(req,file,cb)=>{
      let exte = path.extname(file.originalname)
      console.log("file type: ", exte);
      if(exte !=='.pdf' && exte !=='.docx' && exte !== '.doc' && exte !== '.jpg' && exte !== '.jpeg'){
      cb(new Error('un supported format'),false)
      return
    }
     cb(null, true)
    }
})
module.exports = { filesName ,upload}