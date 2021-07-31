let fs = require("fs");
let path = require("path");
let inputs = process.argv.slice(2);
let files = [];
let options = [];

//To fill the files and option arrays. 
for(let i=0;i<inputs.length;i++){
    let isOption = inputs[i].slice(0,1);
    if(isOption == "-"){
        options.push(inputs[i]);
    }else{
        files.push(inputs[i]);
    }
}

//edge case
 if(options.includes("-n") && options.includes("-b")){
     options[1]="";
 }
 //By this second option will replace by empty string

// To check whether the file of a given path is exist or not.
for(let i=0;i<files.length;i++){
    let isFileExist = fs.existsSync(files[i]);
    if(isFileExist==false){
        console.log("File do not exist");
        return;
    }
}

// To read and print the content of the file.
let contentOfFile = "";
for(let i=0;i<files.length;i++){
    contentOfFile+=fs.readFileSync(files[i])+"\r\n";
}

//To remove the line spaces between the content of files
let contentArr = contentOfFile.split("\r\n");
// -s check
let isPresent = options.includes("-s");
if(isPresent){
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]=="" && contentArr[i-1]== ""){
            contentArr[i] = null;
        }else if(contentArr[i] == "" && contentArr[i-1]==null){
            contentArr[i] = null;
        }
    }
    let tempArr = [];
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!==null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
}


// For wcat -n command
// To give the numbering of all th lines

let nCommand = options.includes("-n");
if(nCommand==true){
    for(let i=0;i<contentArr.length;i++){
        contentArr[i] = i+1 +" "+ contentArr[i];
    }
    
} 


// for wcat -b command
// To give numbering only to the non-empty lines

let bCommand = options.includes("-b");
if(bCommand){
    let count = 1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=""){
        contentArr[i]=count+" "+contentArr[i];
        count++;
    }}
}
console.log(contentArr.join("\r\n"));


 


