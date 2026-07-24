const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: [
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline"],
            [{ header: [1,2,3,false] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["image"]
        ]
    }
});


const categorySelect = document.getElementById("category");


categories.forEach(category => {

    const option = document.createElement("option");

    option.value = category.id;
    option.textContent = category.name;

    categorySelect.appendChild(option);

});




async function generateHtml() {


    const title =
        document.getElementById("title").value;


    const heroTitle =
        document.getElementById("heroTitle").value;


    const heroDesc =
        document.getElementById("heroDesc").value;


    const content =
        quill.root.innerHTML;


    const filename =
        document.getElementById("filename").value.trim();


    const categoryId =
        document.getElementById("category").value;



    const selectedCategory =
        categories.find(category => category.id === categoryId);



    if (!selectedCategory) {

        alert("카테고리를 선택하세요.");

        return;

    }



    const finalFilename =
        filename || title.replace(/\s+/g, "_");



    const description =
        document.getElementById("description").value;




    // Worker → GitHub 저장

    const cmsData = {

        type: "post",

        title: title,

        category: selectedCategory.id,

        folder: selectedCategory.folder,

        file: finalFilename,

        group: selectedCategory.group,

        description: description,

        heroTitle: heroTitle,

        heroDesc: heroDesc,

        content: content

    };



    const saveResponse =
        await fetch(

            "https://ktacmsapi.koffeezip.workers.dev/",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:

                JSON.stringify(cmsData)

            }

        );



if(!saveResponse.ok){

    const error =
        await saveResponse.text();

    console.log(error);

    alert("GitHub 저장 실패\n콘솔 확인");

    return;

}




    // 생성된 HTML 미리보기용 다운로드

    const response =
        await fetch("kta-template.html");


    let template =
        await response.text();



    template = template
        .replace(/{{title}}/g, title)
        .replace(/{{description}}/g, description)
        .replace(/{{heroTitle}}/g, heroTitle)
        .replace(/{{heroDesc}}/g, heroDesc)
        .replace(/{{mainContent}}/g, content);



    const blob =
        new Blob(
            [template],
            {
                type:"text/html;charset=utf-8"
            }
        );



    const link =
        document.createElement("a");


    link.href =
        URL.createObjectURL(blob);


    link.download =
        finalFilename + ".html";


    link.click();


    URL.revokeObjectURL(link.href);



    alert("생성 및 GitHub 저장 완료");

}





document
.getElementById("generateBtn")
.addEventListener(
    "click",
    generateHtml
);





// 이미지 업로드

document
.getElementById("uploadImage")
.addEventListener("click", async () => {


    const file =
    document
    .getElementById("imageFile")
    .files[0];


    if(!file){

        alert("이미지를 선택하세요.");

        return;

    }



    const formData =
        new FormData();


    formData.append("image", file);



    const response =
        await fetch(

            "https://ktaupload.koffeezip.workers.dev",

            {

                method:"POST",

                body:formData

            }

        );



    const result =
        await response.json();




    if(result.success){


        quill.root.innerHTML +=

        `\n<img src="/${result.file}">\n`;



        alert("이미지가 본문에 추가되었습니다.");

    }


});
