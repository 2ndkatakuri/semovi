import { useEffect, useState } from "react";
import { ScrollTrigger, getChapterTops } from "@/animations/scrollAnimations";

export function useActiveChapter() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    let tops = getChapterTops();
    const update = () => {
      const y = window.scrollY + window.innerHeight * 0.5;
      let a = 0;
      tops.forEach((t, i) => {
        if (y >= t) a = i;
      });
      setActive(a);
    };
    const refresh = () => {
      tops = getChapterTops();
      update();
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", refresh);
    ScrollTrigger.addEventListener("refresh", refresh);
    refresh();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", refresh);
      ScrollTrigger.removeEventListener("refresh", refresh);
    };
  }, []);
  return active;
}