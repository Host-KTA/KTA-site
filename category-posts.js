fetch("/data/posts.json")
.then(response => response.json())
.then(posts => {

    const list = document.getElementById("postList");

    if (!list) return;


    // 페이지에서 설정한 category 값
    const currentCategory = category;


    const filteredPosts = posts
        .filter(post => post.category === currentCategory)
        .reverse();


    if (filteredPosts.length === 0) {

        list.innerHTML = "게시글 없음";
        return;

    }


    filteredPosts.forEach(post => {

        const html = `
        <div class="post-item">

            <a href="${post.file}">
                ${post.title}
            </a>

            <span>
                ${post.date || ""}
            </span>

        </div>
        `;


        list.innerHTML += html;

    });


})
.catch(error => {

    console.error(error);

});
