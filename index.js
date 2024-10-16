const {readFile} = require('fs/promises');


//reading the file pahts that included in the config file
async function readingConfig(){
    const res = await readFile('config.json','utf-8');
    const data = JSON.parse(res);
    
    return data.files;

}

//read the file in the passed file path and return its data as string.
async function readingFile(filePath){


    try{
        const data = await readFile(filePath,'utf-8');
        return data.trim();
    }catch(err){
        console.log('Got this error',err)
    }


}

//return the number of word for the given text
function countWords(text){

    if(text.length===0) return 0; 
    return text.split(/\s+/).length;

}

//looping through out paths apply the functions
async function handlePaths(){
    const paths =await readingConfig();
    console.log(paths)
    //check if it is empty
    if(paths.length ===0) return;
    
    //looping through paths
    paths.forEach(async (path) => {
        //reading the file 
        const text = await readingFile(path);
        //count the words
        const count = countWords(text);
        
        //display the result
        count?console.log(`${path}: ${count} words`):console.log(`${path}:empty`) ;
    });
}

handlePaths();