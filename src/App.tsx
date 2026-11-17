import { useEffect } from "react";
import { ScrollTrigger } from "@/animations/scrollAnimations";
import { Header } from "@/components/Header";
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
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    // garante recálculo depois que fontes/imagens iniciais estabilizam o layout
    const t = window.setTimeout(refresh, 600);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <>
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
