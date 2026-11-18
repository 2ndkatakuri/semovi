import { useEffect } from "react";
import { ScrollTrigger } from "@/animations/scrollAnimations";
import { Header } from "@/components/Header";
import { IntroOverlay } from "@/components/IntroOverlay";
import { Navigation } from "@/components/Navigation";
import { ScrollProgress } from "@/components/ScrollProgress";
import Slide01Opening from "@/sections/Slide01Opening";
import Slide02Territory from "@/sections/Slide02Territory";
import Slide03Indicators from "@/sections/Slide03Indicators";
import Slide04Deliveries from "@/sections/Slide04Deliveries";
import Slide05CitizenImpact from "@/sections/Slide05CitizenImpact";
import Slide06Budget from "@/sections/Slide06Budget";
import Slide07Resources from "@/sections/Slide07Resources";
import Slide08Commitments from "@/sections/Slide08Commitments";
import Slide09Challenges from "@/sections/Slide09Challenges";
import Slide10Future from "@/sections/Slide10Future";
import Slide11Gallery from "@/sections/Slide11Gallery";

export default function App() {
  useEffect(() => {
    let active = true;
    let firstFrame = 0;
    let secondFrame = 0;
    const refresh = () => ScrollTrigger.refresh();
    const scheduleRefresh = () => {
      if (!active) return;
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(refresh);
      });
    };

    window.addEventListener("load", scheduleRefresh);
    window.addEventListener("resize", scheduleRefresh);
    window.addEventListener("orientationchange", scheduleRefresh);
    window.visualViewport?.addEventListener("resize", scheduleRefresh);
    document.addEventListener("fullscreenchange", scheduleRefresh);
    const fontReady = document.fonts?.ready.then(scheduleRefresh);
    const t = window.setTimeout(scheduleRefresh, 600);
    scheduleRefresh();

    return () => {
      active = false;
      window.removeEventListener("load", scheduleRefresh);
      window.removeEventListener("resize", scheduleRefresh);
      window.removeEventListener("orientationchange", scheduleRefresh);
      window.visualViewport?.removeEventListener("resize", scheduleRefresh);
      document.removeEventListener("fullscreenchange", scheduleRefresh);
      window.clearTimeout(t);
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      void fontReady;
    };
  }, []);

  return (
    <>
      <IntroOverlay />
      <ScrollProgress />
      <Header />
      <Navigation />
      <main>
        <Slide01Opening />
        <Slide02Territory />
        <Slide03Indicators />
        <Slide04Deliveries />
        <Slide05CitizenImpact />
        <Slide06Budget />
        <Slide07Resources />
        <Slide08Commitments />
        <Slide09Challenges />
        <Slide10Future />
        <Slide11Gallery />
      </main>
    </>
  );
}
