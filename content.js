window.onload = function () {
    const previews = document.querySelectorAll(divQuerySelector);
    showScores(previews);

    const targetNode = document.querySelector("body");
    const config = { childList: true, attributes: true, subtree: true };
    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            const previews = mutation.target.querySelectorAll(divQuerySelector);
            showScores(Array.from(previews));
        }
    });

    observer.observe(targetNode, config);
};

async function showScores(previews) {
    if (previews.length == 0) return;
    for (const preview of previews) {
        if (!preview.querySelector(styleClass)) {
            const text = preview.querySelector(textQuerySelector);

            let title = "";
            if (text) {
                if (text.textContent) {
                    title = text.textContent;
                }

                title = text.getAttribute("aria-label");
            }

            let span = document.createElement("span");
            span.textContent = await getRating(title);
            span.classList = styleClass;

            preview.appendChild(span);
        }
    }
}
