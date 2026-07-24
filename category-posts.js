fetch("/data/posts.json")
.then(response => response.json())
.then(async posts => {


    const list =
        document.getElementById("postList");



    // 실제 HTML 파일 존재 확인

    const checkPosts =
        await Promise.all(

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

                    console.error(error);

                }


                return null;

            })

        );



    posts =
        checkPosts.filter(post => post && post.file);



    const filtered =
        posts
        .filter(post =>
            post.category === category &&
            post.type === "post"
        )
        .sort((a,b) =>
            new Date(b.date) - new Date(a.date)
        );


    console.log(filtered);



    if(filtered.length === 0){

        list.innerHTML =
        "<p>등록된 게시글이 없습니다.</p>";

        return;

    }



    list.innerHTML =
        filtered.map(post => `

        <p>

            <a href="${post.file}">
                ${post.title}
            </a>

            <span>
                ${post.date}
            </span>

        </p>

    `).join("");


})
.catch(error => {

    console.error(error);

});
