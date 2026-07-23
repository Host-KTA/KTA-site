fetch("/data/posts.json")
.then(response => response.json())
.then(posts => {


    const list =
        document.getElementById("postList");


    const filtered =
        posts
        .filter(post => post.category === category)
        .sort((a,b) =>
            new Date(b.date) - new Date(a.date)
        );
    
    console.log(filtered);


    if(filtered.length === 0){

        list.innerHTML =
        "<p>등록된 게시글이 없습니다.</p>";

        return;

    }



    list.innerHTML = filtered.map(post => `

        <p>
            <a href="${post.file}">
                ${post.title}
            </a>
            <span>
                ${post.date}
            </span>
        </p>

    `).join("");


});

alert("새 category-posts 로딩");
