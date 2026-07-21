fetch("/data/posts.json")
.then(response => response.json())
.then(posts => {


    const newsBox = document.getElementById("newsPosts");
    const gameBox = document.getElementById("gamePosts");
    const archiveBox = document.getElementById("archivePosts");


    // 최신 글이 위로 오도록 정렬
    posts.reverse();


    posts.forEach(post => {


        const html =
        `
        <p>
            <a href="${post.file}">
                ${post.title}
            </a>
        </p>
        `;


        if(post.group === "news") {

            newsBox.innerHTML += html;

        }


        if(post.group === "gameinfo") {

            gameBox.innerHTML += html;

        }


        if(post.group === "archive") {

            archiveBox.innerHTML += html;

        }


    });



    if(newsBox.innerHTML === "") {

        newsBox.innerHTML = "게시글 없음";

    }


    if(gameBox.innerHTML === "") {

        gameBox.innerHTML = "게시글 없음";

    }


    if(archiveBox.innerHTML === "") {

        archiveBox.innerHTML = "게시글 없음";

    }


})
.catch(error => {

    console.error("게시글 불러오기 실패:", error);

});
