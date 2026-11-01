
// =============================================
// NETFLIX LANDING PAGE - ADVANCED JAVASCRIPT
// =============================================

document.addEventListener("DOMContentLoaded", () => {

    // =============================================
    // SELECT HTML ELEMENTS
    // =============================================

    const emailForm = document.getElementById("emailForm");
    const emailInput = document.getElementById("emailInput");
    const formMessage = document.getElementById("formMessage");
    const signInBtn = document.getElementById("signInBtn");
    const languageSelect = document.getElementById("languageSelect");

    // =============================================
    // NOTIFICATION SYSTEM
    // =============================================

    function showNotification(message, type = "success") {

        let notification = document.getElementById("customNotification");

        if (!notification) {
            notification = document.createElement("div");
            notification.id = "customNotification";

            Object.assign(notification.style, {
                position: "fixed",
                top: "25px",
                right: "25px",
                maxWidth: "min(350px, calc(100vw - 40px))",
                padding: "16px 22px",
                borderRadius: "12px",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: "600",
                zIndex: "99999",
                opacity: "0",
                transform: "translateY(-15px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
            });

            document.body.appendChild(notification);
        }

        notification.style.background =
            type === "success" ? "#16803c" :
            type === "error" ? "#b91c1c" :
            "#333333";

        notification.textContent = message;

        notification.style.opacity = "1";
        notification.style.transform = "translateY(0)";

        clearTimeout(notification.hideTimer);

        notification.hideTimer = setTimeout(() => {
            notification.style.opacity = "0";
            notification.style.transform = "translateY(-15px)";
        }, 3000);
    }

    // =============================================
    // EMAIL VALIDATION AND FORM SUBMISSION
    // =============================================

    if (emailForm && emailInput && formMessage) {

        emailForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const email = emailInput.value.trim();

            formMessage.textContent = "";

            const emailPattern =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!email) {

                formMessage.textContent =
                    "Please enter your email address.";

                formMessage.style.color = "#ff7777";

                emailInput.focus();

                showNotification(
                    "Please enter your email address.",
                    "error"
                );

                return;
            }

            if (!emailPattern.test(email)) {

                formMessage.textContent =
                    "Please enter a valid email address.";

                formMessage.style.color = "#ff7777";

                emailInput.focus();

                showNotification(
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }

            formMessage.textContent =
                "Your email format looks good! This is a demo.";

            formMessage.style.color = "#7CFC98";

            showNotification(
                "Email validated successfully! 🎬",
                "success"
            );

            // This is a frontend demo.
            // No account is created and no email is stored.
        });

        emailInput.addEventListener("input", () => {

            formMessage.textContent = "";

        });

        emailInput.addEventListener("focus", () => {

            emailInput.style.transition = "border-color 0.3s ease";
            emailInput.style.borderColor = "#e50914";

        });

        emailInput.addEventListener("blur", () => {

            emailInput.style.borderColor = "#929292";

        });
    }

    // =============================================
    // SIGN-IN BUTTON INTERACTION
    // =============================================

    if (signInBtn) {

        signInBtn.addEventListener("click", () => {

            // Avoid duplicate modals.
            if (document.getElementById("signInDemoModal")) {
                return;
            }

            const modal = document.createElement("div");

            modal.id = "signInDemoModal";

            Object.assign(modal.style, {
                position: "fixed",
                inset: "0",
                background: "rgba(0,0,0,0.85)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                zIndex: "99998",
                opacity: "0",
                transition: "opacity 0.25s ease"
            });

            modal.innerHTML = `
                <div id="signInDemoCard"
                     role="dialog"
                     aria-modal="true"
                     aria-labelledby="signInTitle"
                     style="
                        width:100%;
                        max-width:420px;
                        padding:35px;
                        background:#181818;
                        border-radius:16px;
                        border:1px solid #383838;
                        box-shadow:0 20px 60px rgba(0,0,0,0.6);
                        position:relative;
                        transform:translateY(15px);
                        transition:transform 0.25s ease;
                     ">

                    <button id="closeSignInModal"
                            type="button"
                            aria-label="Close sign-in dialog"
                            style="
                                position:absolute;
                                top:12px;
                                right:16px;
                                background:none;
                                border:none;
                                color:white;
                                font-size:28px;
                                cursor:pointer;
                            ">&times;</button>

                    <h2 id="signInTitle"
                        style="
                            color:#e50914;
                            font-size:30px;
                            font-weight:900;
                            margin-bottom:18px;
                        ">
                        NETFLIX
                    </h2>

                    <h3 style="
                        color:white;
                        font-size:23px;
                        font-weight:bold;
                        margin-bottom:12px;
                    ">
                        Welcome Back!
                    </h3>

                    <p style="
                        color:#cccccc;
                        line-height:1.7;
                        margin-bottom:22px;
                    ">
                        This is a frontend demonstration.
                        Real sign-in and account authentication
                        are not connected.
                    </p>

                    <button id="closeSignInAction"
                            type="button"
                            style="
                                width:100%;
                                padding:13px;
                                background:#e50914;
                                color:white;
                                border:none;
                                border-radius:7px;
                                font-weight:bold;
                                cursor:pointer;
                            ">
                        Continue Exploring
                    </button>

                </div>
            `;

            document.body.appendChild(modal);

            const card = modal.querySelector("#signInDemoCard");

            requestAnimationFrame(() => {
                modal.style.opacity = "1";
                card.style.transform = "translateY(0)";
            });

            const closeModal = () => {

                modal.style.opacity = "0";
                card.style.transform = "translateY(15px)";

                setTimeout(() => modal.remove(), 250);

                signInBtn.focus();
            };

            modal.querySelector("#closeSignInModal")
                .addEventListener("click", closeModal);

            modal.querySelector("#closeSignInAction")
                .addEventListener("click", closeModal);

            modal.addEventListener("click", (event) => {

                if (event.target === modal) {
                    closeModal();
                }

            });

            const handleEscape = (event) => {

                if (event.key === "Escape") {
                    closeModal();
                    document.removeEventListener(
                        "keydown",
                        handleEscape
                    );
                }

            };

            document.addEventListener("keydown", handleEscape);

            modal.querySelector("#closeSignInModal").focus();

        });
    }

    // =============================================
    // LANGUAGE SELECTOR
    // =============================================

    if (languageSelect) {

        const languageNames = {
            en: "English",
            hi: "Hindi",
            or: "Odia"
        };

        languageSelect.addEventListener("change", () => {

            const selectedLanguage = languageSelect.value;

            const languageName =
                languageNames[selectedLanguage] || "English";

            showNotification(
                `${languageName} selected. Full page translation is not connected.`,
                "info"
            );

        });
    }

    // =============================================
    // TRENDING CARD HOVER EFFECT
    // =============================================

    const trendingCards = document.querySelectorAll(".trend-card");

    trendingCards.forEach((card) => {

        card.style.transition =
            "transform 0.3s ease, box-shadow 0.3s ease";

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-8px) scale(1.02)";

            card.style.boxShadow =
                "0 12px 30px rgba(229,9,20,0.2)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";
            card.style.boxShadow = "";

        });

    });

    // =============================================
    // REVEAL ELEMENTS ON SCROLL
    // =============================================

    const revealElements = document.querySelectorAll(
        ".trending-section, .faq-section, .footer-section"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";

                        currentObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.1
            }
        );

        revealElements.forEach((element) => {

            element.style.opacity = "0";
            element.style.transform = "translateY(25px)";

            element.style.transition =
                "opacity 0.7s ease, transform 0.7s ease";

            observer.observe(element);

        });

    }

    // =============================================
    // FAQ INTERACTION
    // Bootstrap manages accordion open/close.
    // =============================================

    const faqButtons = document.querySelectorAll(
        ".custom-accordion .accordion-button"
    );

    faqButtons.forEach((button) => {

        button.addEventListener("click", () => {

            console.log(
                "FAQ selected:",
                button.textContent.trim()
            );

        });

    });

    // =============================================
    // FOOTER YEAR
    // =============================================

    const copyright = document.querySelector(".copyright");

    if (copyright) {

        copyright.textContent =
            `© ${new Date().getFullYear()} Educational Project. ` +
            "Not affiliated with Netflix.";

    }

    // =============================================
    // PAGE LOAD ANIMATION
    // =============================================

    const heroSection = document.querySelector(".hero-section");

    if (heroSection) {

        heroSection.animate(
            [
                {
                    opacity: 0,
                    transform: "translateY(25px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ],
            {
                duration: 900,
                easing: "ease-out",
                fill: "both"
            }
        );

    }

    // =============================================
    // CONSOLE MESSAGE
    // =============================================

    console.log(
        "%c NETFLIX LANDING PAGE ",
        "background:#e50914;color:white;font-size:18px;font-weight:bold;padding:10px;"
    );

    console.log(
        "Welcome! Interactive frontend features are ready."
    );

});
