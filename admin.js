const categorySelect = document.getElementById("category");

categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;

    categorySelect.appendChild(option);
});

async function generateHtml() {

    const title = document.getElementById("title").value;
    const heroTitle = document.getElementById("heroTitle").value;
    const heroDesc = document.getElementById("heroDesc").value;
    const content = document.getElementById("content").value;
    const filename = document.getElementById("filename").value.trim();

const finalFilename = filename || title.replace(/\s+/g, "_");

const listCode =
`<h3><a href="${finalFilename}.html">${title}</a></h3>`;

    // description은 비워두면 Hero 설명을 사용
const description = document.getElementById("description").value;

    // 템플릿 읽기
    const response = await fetch("kta-template.html");
    let template = await response.text();

    // 치환
    template = template
        .replace(/{{title}}/g, title)
        .replace(/{{description}}/g, description)
        .replace(/{{heroTitle}}/g, heroTitle)
        .replace(/{{heroDesc}}/g, heroDesc)
        .replace(/{{mainContent}}/g, content);

// 결과 미리보기
document.getElementById("result").value = template;
    document.getElementById("listCode").value = listCode;

// HTML 파일 다운로드
const blob = new Blob([template], { type: "text/html;charset=utf-8" });

const link = document.createElement("a");
link.href = URL.createObjectURL(blob);

link.download = finalFilename + ".html";

link.click();

URL.revokeObjectURL(link.href);
}

document.getElementById("generateBtn").addEventListener("click", generateHtml);
