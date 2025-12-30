import { episodes } from "./episodes.js";
const finalNum = episodes.length - 1;

const container = document.getElementById("episode-container");
const layout = document.querySelector(".layout");
const episodeList = document.getElementById("episode-list");
// 에피소드 목록 자동 생성
episodes.forEach((ep, index) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    
    a.textContent = ep.title;
    a.href = "#";
    a.classList.add("episode-link");
    a.setAttribute("data-episode", index);

    li.appendChild(a);
    episodeList.appendChild(li);
});

const links = document.querySelectorAll(".episode-link");
links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const num = parseInt(e.target.dataset.episode);
        links.forEach(l => l.classList.remove("active"));
        e.target.classList.add("active");

        if (episodes[num]) {

            container.innerHTML = `
        <h2>${episodes[num].title}</h2>
        <div class="episode-text"></div>
        `;
            container.querySelector(".episode-text").innerHTML = episodes[num].content;
            container.scrollTop = 0;

            const navDiv = document.createElement("div");
            navDiv.className = "nav-buttons";

            if (num > 0) {
                const prevBtn = document.createElement("button");
                prevBtn.textContent = "◀ 이전화";
                prevBtn.addEventListener("click", () => {
                    document.querySelector(`.episode-link[data-episode="${num - 1}"]`).click();
                });
                navDiv.appendChild(prevBtn);
            } else {
                navDiv.appendChild(document.createElement("div")); // 자리 맞춤용
            }

            // 다음화 버튼 (num < finalNum일 때만)
            if (num < finalNum) {
                const nextBtn = document.createElement("button");
                nextBtn.textContent = "다음화 ▶";
                nextBtn.addEventListener("click", () => {
                    document.querySelector(`.episode-link[data-episode="${num + 1}"]`).click();
                });
                navDiv.appendChild(nextBtn);
            } else {
                navDiv.appendChild(document.createElement("div")); // 자리 맞춤용
            }

            container.appendChild(navDiv);

        }

        layout.classList.add("open");
        document.body.classList.add("open"); // 헤더 제어용
        episodeNav.addEventListener("click", () => {
            episodeNav.classList.add("height");
            container.scrollTop = 0;
        });
    });
});


document.getElementById("site-title").addEventListener("click", () => {
    container.scrollTop = 0;
    // 섹션 내용 비우기
    container.innerHTML = "";

    // 열림 상태 해제
    layout.classList.remove("open");
    document.body.classList.remove("open");
    links.forEach(l => l.classList.remove("active"));
    episodeNav.classList.remove("height");
});

// -----------------------------------------------

// nav------------------------------------------------

const menuToggle = document.getElementById("menu-toggle");
const episodeNav = document.getElementById("episode-nav");

menuToggle.addEventListener("click", () => {
    episodeNav.classList.toggle("open");
    overlay.classList.add("open");
    episodeNav.scrollTop = 0;
});

// ------------------------------------------------nav

// aside------------------------------------------------

const moreToggle = document.getElementById("more-toggle");
const extraInfo = document.getElementById("extra-info");

moreToggle.addEventListener("click", () => {
    extraInfo.classList.toggle("open");
    overlay.classList.toggle("open");
    episodeNav.scrollTop = 0;
});

// -------------------------------------------------aside

// overlay-------------------------------------------

overlay.addEventListener("click", () => {
    // nav 닫기
    episodeNav.classList.remove("open");
    extraInfo.classList.remove("open");
    overlay.classList.remove("open");
    episodeNav.scrollTop = 0;
});

// -------------------------------------------------overlay

