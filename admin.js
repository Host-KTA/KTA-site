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
        document.getElementById("content").value;


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



    // 목록 추가 코드

    const listCode =
`
<h3>
<a href="/${selectedCategory.folder}/${finalFilename}.html">
${title}
</a>
</h3>
`;



    // posts.json 추가 코드

    const postCode =
`
{
    "title": "${title}",
    "category": "${selectedCategory.id}",
    "group": "${selectedCategory.group}",
    "file": "/${selectedCategory.folder}/${finalFilename}.html"
}
`;



    // 템플릿 읽기

    const response =
        await fetch("kta-template.html");


    let template =
        await response.text();



    // 템플릿 치환

    template = template
        .replace(/{{title}}/g, title)
        .replace(/{{description}}/g, description)
        .replace(/{{heroTitle}}/g, heroTitle)
        .replace(/{{heroDesc}}/g, heroDesc)
        .replace(/{{mainContent}}/g, content);



    // 출력

    document.getElementById("result").value = template;

    document.getElementById("listCode").value = listCode;

    document.getElementById("postCode").value = postCode;



    // HTML 다운로드

    const blob =
        new Blob(
            [template],
            { type: "text/html;charset=utf-8" }
        );


    const link =
        document.createElement("a");


    link.href =
        URL.createObjectURL(blob);


    link.download =
        finalFilename + ".html";


    link.click();


    URL.revokeObjectURL(link.href);

}



document
    .getElementById("generateBtn")
    .addEventListener(
        "click",
        generateHtml
    );
