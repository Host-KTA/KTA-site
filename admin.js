async function generateHtml() {

    const title = document.getElementById("title").value;
    const heroTitle = document.getElementById("heroTitle").value;
    const heroDesc = document.getElementById("heroDesc").value;
    const content = document.getElementById("content").value;

    // description은 비워두면 Hero 설명을 사용
    const description = heroDesc;

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

    // 결과 출력
    document.getElementById("result").value = template;
}

document.getElementById("generateBtn").addEventListener("click", generateHtml);
