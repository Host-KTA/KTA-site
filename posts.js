fetch("/data/posts.json")
.then(response => response.json())
.then(posts => {


    const newsBox = document.getElementById("newsPosts");
    const gameBox = document.getElementById("gamePosts");
    const archiveBox = document.getElementById("archivePosts");


    // 최신 글이 위로 오도록 정렬
    posts.reverse();


    // 그룹별 분리 후 최신 5개만 선택

    const newsPosts = posts
        .filter(post => post.group === "news")
        .slice(0, 5);


    const gamePosts = posts
        .filter(post => post.group === "gameinfo")
        .slice(0, 5);


    const archivePosts = posts
        .filter(post => post.group === "archive")
        .slice(0, 5);



    // 출력 함수

    function renderPosts(box, list) {


        box.innerHTML = "";


        list.forEach(post => {


            const html =
            `
            <p>
                <a href="${post.file}">
                    ${post.title}
                </a>
            </p>
            `;


            box.innerHTML += html;


        });


        if(list.length === 0) {

            box.innerHTML = "게시글 없음";

        }


    }



    renderPosts(newsBox, newsPosts);

    renderPosts(gameBox, gamePosts);

    renderPosts(archiveBox, archivePosts);



})
.catch(error => {


    console.error(error);


    document.getElementById("newsPosts").innerHTML = error.message;
    document.getElementById("gamePosts").innerHTML = error.message;
    document.getElementById("archivePosts").innerHTML = error.message;


});
