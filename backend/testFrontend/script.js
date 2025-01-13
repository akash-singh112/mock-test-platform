const fileform = document.querySelector('.fileform');

fileform.addEventListener('submit',async (e)=>{
    e.preventDefault();
    
    const files = fileform.children[0].files;

    for(let file of files){
        const name = file.name;
        if(name.substr(name.length-3) != 'png'){
            alert('Please upload only PNG files!');
            return;
        }
    }

    const formdata = new FormData();

    for(let file of files){
        formdata.append('files[]',file);
    }

    const res = await UploadFilesAndSendLink(formdata);

    console.log(res.link);
    
})