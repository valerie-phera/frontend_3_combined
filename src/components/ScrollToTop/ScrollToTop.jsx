import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function findFirstScrollableAncestor(el) {
    let node = el;
    while (node && node !== document.documentElement) {
        const hasScrollable =
            node.scrollHeight > node.clientHeight &&
            getComputedStyle(node).overflowY !== "visible";
        if (hasScrollable) return node;
        node = node.parentElement;
    }
    return null;
}

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const t = setTimeout(() => {
            const marked = document.querySelector("[data-scroll-container]");
            if (marked) {
                const scrollable = findFirstScrollableAncestor(marked) || marked;
                try { scrollable.scrollTo?.({ top: 0, left: 0, behavior: "auto" }); }
                catch (e) { scrollable.scrollTop = 0; }
                return;
            }

            const bodyChildren = Array.from(document.body.children);
            let found = null;
            for (const ch of bodyChildren) {
                if (ch.scrollHeight > ch.clientHeight && getComputedStyle(ch).overflowY !== "visible") {
                    found = ch;
                    break;
                }
            }
            if (found) {
                try { found.scrollTo?.({ top: 0, left: 0, behavior: "auto" }); }
                catch (e) { found.scrollTop = 0; }
                return;
            }

            const sc = document.scrollingElement || document.documentElement;
            sc.scrollTop = 0;
            window.scrollTo(0, 0);
        }, 0);

        return () => clearTimeout(t);
    }, [pathname]);

    return null;
};

export default ScrollToTop;