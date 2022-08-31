#!/usr/bin/env node  
let helobj= require("./commands/help");
let treeobj= require("./commands/tree");
let orgaobj= require("./commands/organize");

let inputarr= process.argv.slice(2);  // to slice out node and input.js file in array
console.log(inputarr);
let types={
    //key value pair
    media: ["mp4","mkv"],
    archives:["zip","7z","rar","tar","gz","ar","iso","xz"],
    document: ["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","txt","ps","tex"],
    app:["exe","pkg","deb","dmg"]

}
//node input.js tree "dirpath"
//node input.js orgranie "dirpath"
//node input.js help
let command= inputarr[0];
let dirPath= inputarr[1];

switch(command)
{
    case "tree":
       treeobj.treekey(inputarr[1]);
        break;
    case "organize":
       orgaobj.organizekey(inputarr[1]);    
    break;
    case "help":
       helobj.helpkey();
        break;
    default:
        console.log("please enter correct command");
}



