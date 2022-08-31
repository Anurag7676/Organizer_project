let fs= require("fs");
let path= require("path");

function organize(dirPath)
{
    let destination;
    console.log("organized");
    //create folder ---> dirPath k andr  c:/user/desktop/dirPath (folder)
    if(dirPath==undefined)
    {
        dirPath= process.cwd();    

    }
   
        //check if dir path exist
        let doesexist= fs.existsSync(dirPath);
        if(doesexist)
        {
            //create a folder with name organized folder
            destination= path.join(dirPath,"organized_folder"); //dirPath contains current dir path/organized folder
            
            //if destination folder doesn't exist than create it
            if(fs.existsSync(destination)==false)
            {
                fs.mkdirSync(destination);
            }
            
        }
        else
        {
            console.log("please enter correct path");
            return;
        }
        organizehelper(dirPath, destination);
    
}
function organizehelper(src, destination)
{
    //identify all the files present in the folder
     //read all files of the dir
    let childname= fs.readdirSync(src);   //childnames is an array stores all the files of the given dir path
    // console.log(childname);

    //now we have the files/folder names stored in childname now we have to get their address
    for(let i=0; i<childname.length;i++)
    {
        let childaddress= path.join(src,childname[i]);
        //check file or folder
        let is_file= fs.lstatSync(childaddress).isFile();
        if(is_file)
        {
            
            //what kind of file ||category
        let category= getcategory(childname[i]);
        console.log(childname[i],"belongs to--->",category);
        
        sendfile(childaddress, destination,category );
        }
       
    }

}
function getcategory(name)
{
   let ext= path.extname(name);
    ext= ext.slice(1);
   //now we will find the category
   //we will traverse in the types object to chec the type
   for(let type in types)
   {
       let ctypearr= types[type]  // now this is like currentypearr= types[media] this gives all value {mp4, mkv}
       
       //traverse and check the ext type
       for(let i=0;i<ctypearr.length;i++)
       {
           if(ext==ctypearr[i])
           return type;                     //return media  means type
       }

   }
   return "others";
  
}
function sendfile(srcFilePath, destination, category) {
   // 
   console.log(srcFilePath,destination,category);
   let categoryPath = path.join(destination, category);
   if (fs.existsSync(categoryPath) == false) {
       fs.mkdirSync(categoryPath);
   }
   let fileName = path.basename(srcFilePath);
   let destFilePath = path.join(categoryPath, fileName);
   fs.copyFileSync(srcFilePath, destFilePath);
   fs.unlinkSync(srcFilePath);

}

module.exports={
    organizekey:organize

}