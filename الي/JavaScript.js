
document.addEventListener("DOMContentLoaded", function () {

    const hero = document.querySelector(".hero");
    const image = document.querySelector(".hero-image img");
    const navLinks = document.querySelector(".nav-links");
    const menuButton = document.querySelector(".menu-toggle");

    // قائمة الهاتف
    if (menuButton && navLinks) {
        menuButton.addEventListener("click", function () {
            navLinks.classList.toggle("open");
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
            });
        });
    }

    // إغلاق القائمة بزر Escape
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && navLinks) {
            navLinks.classList.remove("open");
        }
    });

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const hasMouse = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    // إضاءة ذهبية تتبع الماوس
    if (hero && hasMouse && !reduceMotion) {

        hero.addEventListener("mousemove", function (event) {
            const rect = hero.getBoundingClientRect();

            hero.style.setProperty(
                "--mouse-x",
                (event.clientX - rect.left) + "px"
            );

            hero.style.setProperty(
                "--mouse-y",
                (event.clientY - rect.top) + "px"
            );

            hero.classList.add("mouse-active");
        });

        hero.addEventListener("mouseleave", function () {
            hero.classList.remove("mouse-active");
        });
    }

    // حركة ثلاثية الأبعاد للصورة
    if (image && hasMouse && !reduceMotion) {

        const container = image.closest(".hero-image");

        if (container) {

            container.addEventListener("mousemove", function (event) {

                const rect = container.getBoundingClientRect();

                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;

                const rotateY = (x - 0.5) * 12;
                const rotateX = (0.5 - y) * 12;

                image.style.transform =
                    `perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.04)`;
            });

            container.addEventListener("mouseleave", function () {
                image.style.transform =
                    "perspective(900px) rotateX(0) rotateY(0) scale(1)";
            });
        }
    }

    // حركة بطاقات المشاريع
    if (!reduceMotion) {
        document.querySelectorAll(".project").forEach(function (project) {

            project.addEventListener("mouseenter", function () {
                project.style.transform = "translateY(-7px)";
            });

            project.addEventListener("mouseleave", function () {
                project.style.transform = "";
            });

        });
    }

    // زر العودة إلى الأعلى
    const topButton = document.querySelector(".back-to-top");

    if (topButton) {

        window.addEventListener("scroll", function () {
            topButton.classList.toggle("visible", window.scrollY > 400);
        });

        topButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth"
            });
        });
    }

    // السنة الحالية تلقائياً
    const year = document.querySelector("#year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});
