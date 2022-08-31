let fs= require("fs");
let path= require("path");

function tree(dirPath)
{
console.log("tree command implemented");
    if(dirPath==undefined)
    {
       let newpath=process.cwd();
       treehelper(newpath,""); 
    }
    else
    {
        doesexist= fs.existsSync(dirPath);
        if(doesexist)
        {   
            treehelper(dirPath, "");

        }
        else
        {
            console.log("please enter path");
            return;
        }

    }
}

function treehelper(dirpath,indent)
{
    //check if it is file or folder
    //if file than print it if folder read all its content

    let isfile= fs.lstatSync(dirpath).isFile();
    if(isfile==true)
    {
        let fileName= path.basename(dirpath);
        console.log(indent+"├──"+fileName);
    }
    else
    {
        let dirname= path.basename(dirpath);
        console.log(indent+"└──"+ dirname);
        let childeren= fs.readdirSync(dirpath);// array childeren contains all the files of the folder
        for(let i=0; i<childeren.length;i++)
        {
            //crate path
            let childpath= path.join(dirpath,childeren[i]);   // c:/raj/videos, gang -> c:/raj/videos/gang
            treehelper(childpath,indent+"\t");
        }

    }

}

module.exports={
    treekey: tree
}