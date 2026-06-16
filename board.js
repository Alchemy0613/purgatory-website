/* ============================================
   RED‑STRING BOARD — JavaScript Engine (Modal Edition)
============================================ */

const board = document.getElementById("board");
const strings = document.getElementById("strings");

/* LOAD SAVED POSITIONS */
let savedPositions = JSON.parse(localStorage.getItem("boardPositions")) || {};

/* CASE DATA */
const cases = [
    {
        id: "case1",
        name: "Cody Scott Matney",
        img: "Cody-Scott-Matney.JPG",
        x: 400,
        y: 300,
        details: "Virginia State Police Case 12‑19445. Male, age 25, 5'9\", 170 lbs, brown hair and eyes."
    },
    {
        id: "tylerBarber",
        name: "Tyler Barber",
        img: "Tyler-Barber.JPG",
        x: 500,
        y: 450,
        details: "Homicide victim from Susquehanna County, PA. Reported missing in 2022 and later found deceased. Case resolved with multiple arrests."
    },
    {
        id: "loriWasko",
        name: "Lori A. Wasko",
        img: "Lori-A-Wasko.JPG",
        x: 550,
        y: 550,
        details: "Homicide victim from Thompson Township, Susquehanna County, PA (2025). Remembered as Aunt Lori by family and friends."
    },
    {
        id: "robertHubal",
        name: "Robert Hubal",
        img: "Robert-hubal.JPG",
        x: 850,
        y: 600,
        details: "Homicide victim from Thompson Township, Susquehanna County, PA (2017). Remembered with respect and dignity. His home was on Potter Hill Road — a place familiar to the creator and her family."
    },
    {
        id: "evelynBoswell",
        name: "Evelyn Mae Boswell",
        img: "Evelyn-Boswell.jpg",
        x: 300,
        y: 200,
        details: "15‑month‑old Evelyn Boswell was reported missing from Sullivan County, Tennessee in 2020. Conflicting statements and delayed reporting complicated the investigation. Her case remains one of the most heartbreaking and widely discussed in the region."
    },
    {
        id: "summerWells",
        name: "Summer Wells",
        img: "Summer-Wells.jpg",
        x: 650,
        y: 250,
        details: "Five‑year‑old Summer Wells vanished from her home in Hawkins County, Tennessee in 2021. Massive searches and national attention followed. No confirmed sightings since the day she disappeared."
    },
    {
        id: "hollyBobo",
        name: "Holly Bobo",
        img: "Holly-Bobo.jpg",
        x: 950,
        y: 350,
        details: "20‑year‑old nursing student Holly Bobo was abducted from her home in Parsons, Tennessee in 2011. Her remains were found in 2014. Multiple arrests and trials followed, but questions still linger about the full truth of that morning."
    }
];

/* BUILD POLAROIDS */
cases.forEach(c => {
    const glow = document.createElement("div");
    glow.className = "glow";
    glow.style.left = c.x - 15 + "px";
    glow.style.top = c.y - 15 + "px";
    board.appendChild(glow);

    const p = document.createElement("div");
    p.className = "polaroid reveal-hidden";
    p.id = c.id;

    const saved = savedPositions[c.id];
    const startX = saved ? saved.x : c.x;
    const startY = saved ? saved.y : c.y;
    const startRot = saved ? saved.rot : (Math.random() * 10 - 5);

    p.style.left = startX + "px";
    p.style.top = startY + "px";
    p.style.transform = `rotate(${startRot}deg)`;

    p.innerHTML = `
        <img src="${c.img}" alt="${c.name}">
        <div class="name">${c.name}</div>
    `;

    p.addEventListener("mousedown", startDrag);
    p.addEventListener("click", () => openModal(c));

    board.appendChild(p);
});

/* DRAGGING WITH SMOOTH INERTIA */
let active = null;
let offsetX = 0;
let offsetY = 0;
let velocityX = 0;
let velocityY = 0;

function startDrag(e) {
    active = e.target.closest(".polaroid");
    if (!active) return;
    const rect = active.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
}

function drag(e) {
    if (!active) return;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    velocityX = (x - parseFloat(active.style.left)) * 0.2;
    velocityY = (y - parseFloat(active.style.top)) * 0.2;
    active.style.left = parseFloat(active.style.left) + velocityX + "px";
    active.style.top = parseFloat(active.style.top) + velocityY + "px";
}

function stopDrag() {
    if (!active) return;
    savedPositions[active.id] = {
        x: parseFloat(active.style.left),
        y: parseFloat(active.style.top),
        rot: getRotation(active)
    };
    localStorage.setItem("boardPositions", JSON.stringify(savedPositions));
    active = null;
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
}

/* Get rotation angle */
function getRotation(el) {
    const st = window.getComputedStyle(el, null);
    const tr = st.getPropertyValue("transform");
    if (tr === "none") return 0;
    const values = tr.split("(")[1].split(")")[0].split(",");
    const a = values[0];
    const b = values[1];
    return Math.round(Math.atan2(b, a) * (180 / Math.PI));
}

/* MODAL SYSTEM */
const modalOverlay = document.getElementById("modal-overlay");
const modalBox = document.getElementById("modal-box");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalClose = document.getElementById("modal-close");

function typeWriter(text, element, speed = 25) {
    element.innerHTML = "";
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

function openModal(c) {
    modalImage.src = c.img;
    modalTitle.textContent = c.name;
    typeWriter(c.details, modalDescription);
    modalOverlay.classList.add("active");
    modalBox.classList.add("active");
}

function closeModal() {
    modalOverlay.classList.remove("active");
    modalBox.classList.remove("active");
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

/* CINEMATIC REVEAL */
window.onload = () => {
    document.querySelectorAll(".polaroid").forEach(p => {
        setTimeout(() => {
            p.classList.remove("reveal-hidden");
            p.classList.add("reveal-visible");
        }, 200);
    });
};

console.log("Cases loaded:", cases);

