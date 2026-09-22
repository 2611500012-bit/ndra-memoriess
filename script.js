const pages =
    document.querySelectorAll(".page");

const nextButton =
    document.getElementById("next");

const prevButton =
    document.getElementById("prev");

const counter =
    document.getElementById("counter");


let currentPage = 0;


/* =========================
   UPDATE BUKU
========================= */

function updateBook() {

    pages.forEach(
        (page, index) => {

            if (index < currentPage) {

                page.classList.add("flipped");

                page.style.zIndex = index;

            } else {

                page.classList.remove("flipped");

                page.style.zIndex =
                    pages.length - index;
            }

        }
    );


    /* Nomor halaman */

    if (currentPage === 0) {

        counter.textContent =
            "Cover";

    }

    else if (
        currentPage === pages.length - 1
    ) {

        counter.textContent =
            "End";

    }

    else {

        counter.textContent =
            String(currentPage)
                .padStart(2, "0");
    }


    /* Tombol kiri */

    prevButton.disabled =
        currentPage === 0;


    /* Tombol kanan */

    nextButton.disabled =
        currentPage === pages.length - 1;
}


/* =========================
   NEXT
========================= */

nextButton.addEventListener(
    "click",
    function () {

        if (
            currentPage <
            pages.length - 1
        ) {

            currentPage++;

            updateBook();
        }

    }
);


/* =========================
   PREVIOUS
========================= */

prevButton.addEventListener(
    "click",
    function () {

        if (
            currentPage > 0
        ) {

            currentPage--;

            updateBook();
        }

    }
);


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "ArrowRight"
        ) {

            if (
                currentPage <
                pages.length - 1
            ) {

                currentPage++;

                updateBook();
            }
        }


        if (
            event.key === "ArrowLeft"
        ) {

            if (
                currentPage > 0
            ) {

                currentPage--;

                updateBook();
            }
        }

    }
);


/* Jalankan pertama kali */

updateBook();