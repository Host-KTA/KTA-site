fetch("/data/posts.json")
.then(response => response.json())
.then(async posts => {


    const newsBox = document.getElementById("newsPosts");
    const gameBox = document.getElementById("gamePosts");
    const archiveBox = document.getElementById("archivePosts");



    // 존재하는 게시글만 남김

    const checkPosts = await Promise.all(

        posts.map(async post => {

            try {

                const response =
    await fetch(
        post.file + "?check=" + Date.now()
    );


                if(response.ok){

                    return post;

                }


            } catch(error){

                return null;

            }


        })

    );


    posts =
        checkPosts.filter(post => post !== null);



    // 날짜 최신순 정렬

    posts.sort((a, b) => {

        return new Date(b.date || 0)
        -
        new Date(a.date || 0);

    });



    const newsPosts =
        posts
        .filter(post => post.group === "news")
        .slice(0,5);



    const gamePosts =
        posts
        .filter(post => post.group === "gameinfo")
        .slice(0,5);



    const archivePosts =
        posts
        .filter(post => post.group === "archive")
        .slice(0,5);




    function renderPosts(box, list){


        box.innerHTML = "";


        list.forEach(post => {


            const html =

            `
            <div class="post-item">

                <a href="${post.file}">
                    ${post.title}
                </a>

                <span>
                    ${post.date || ""}
                </span>

            </div>
            `;


            box.innerHTML += html;


        });



        if(list.length === 0){

            box.innerHTML =
            "게시글 없음";

        }


    }



    renderPosts(newsBox, newsPosts);

    renderPosts(gameBox, gamePosts);

    renderPosts(archiveBox, archivePosts);



})
.catch(error => {

    console.error(error);

});
