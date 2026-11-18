import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/animations/scrollAnimations";

const TILE = 900;

function rnd(seed: number) {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function tile(html: string, h: number, defs = "") {
  const svg = `<svg width="${TILE}" height="${h}" viewBox="0 0 ${TILE} ${h}" xmlns="http://www.w3.org/2000/svg">${defs}${html}</svg>`;
  return svg + svg + svg;
}

function ruralFar(h: number) {
  return `<path class="far" d="M0 ${h} L0 110 Q150 30 320 105 Q480 165 650 85 Q790 25 900 110 L900 ${h} Z"/>`;
}

function ruralNear(h: number) {
  const r = rnd(14);
  let x = 25;
  let out = "";
  while (x < TILE - 40) {
    const s = 0.8 + r() * 0.5;
    out += `<rect x="${x - 4}" y="${h - 32 * s}" width="8" height="${32 * s}" fill="#6d4c41"/>`;
    out += `<circle class="near" cx="${x}" cy="${h - 44 * s}" r="${22 * s}"/>`;
    out += `<circle class="near" cx="${x - 14 * s}" cy="${h - 34 * s}" r="${16 * s}"/>`;
    out += `<circle class="near" cx="${x + 14 * s}" cy="${h - 34 * s}" r="${16 * s}"/>`;
    x += 95 + r() * 90;
  }
  return out;
}

function cityBuildings(h: number) {
  const r = rnd(7);
  let x = 0;
  let out = "";
  while (x < TILE) {
    let w = 65 + r() * 65;
    const bh = 95 + r() * 95;
    if (x + w > TILE) w = TILE - x;
    out += `<rect class="far" x="${x}" y="${h - bh}" width="${w}" height="${bh}"/>`;
    for (let wy = h - bh + 14; wy < h - 18; wy += 20) {
      for (let wx = x + 10; wx < x + w - 14; wx += 18) {
        if (r() > 0.45) {
          out += `<rect x="${wx}" y="${wy}" width="8" height="10" rx="1" fill="#ffd54f" opacity="0.85"/>`;
        }
      }
    }
    x += w + 6;
  }
  return out;
}

function cityResidences(h: number) {
  const r = rnd(33);
  let x = 10;
  let out = "";
  while (x < TILE - 80) {
    const w = 74 + r() * 26;
    const hh = 46 + r() * 16;
    const y = h - hh;
    out += `<rect class="near" x="${x}" y="${y}" width="${w}" height="${hh}"/>`;
    out += `<polygon points="${x - 6},${y} ${x + w / 2},${y - 24} ${x + w + 6},${y}" fill="#3b2824"/>`;
    out += `<rect x="${x + 14}" y="${h - 24}" width="12" height="24" fill="#1b2430"/>`;
    out += `<rect x="${x + w - 30}" y="${y + 14}" width="16" height="14" rx="2" fill="#ffe082"/>`;
    x += w + 28 + r() * 30;
  }
  return out;
}

function streetPoles(h: number) {
  const positions = [140, 440, 740];
  let out = "";
  positions.forEach((cx) => {
    out += `<polygon class="lamp-cone" points="${cx - 26},54 ${cx - 72},${h} ${cx + 12},${h}" fill="url(#lampGlow)"/>`;
    out += `<polygon class="lamp-cone" points="${cx + 26},54 ${cx - 12},${h} ${cx + 72},${h}" fill="url(#lampGlow)"/>`;

    out += `<rect x="${cx - 5}" y="28" width="10" height="${h - 34}" fill="#2b2d2f"/>`;
    out += `<rect x="${cx - 7}" y="26" width="14" height="3" rx="1" fill="#8e9499"/>`;
    out += `<rect x="${cx - 8}" y="${h - 10}" width="16" height="8" rx="1" fill="#46494c"/>`;
    out += `<rect x="${cx - 13}" y="${h - 3}" width="26" height="3" rx="1" fill="#2b2d2f"/>`;

    out += `<rect x="${cx - 28}" y="32" width="23" height="6" rx="2" fill="#8e9499"/>`;
    out += `<ellipse class="lamp-bulb" cx="${cx - 26}" cy="52" rx="4.5" ry="6.5"/>`;
    out += `<path d="M${cx - 31} 31 Q${cx - 26} 24 ${cx - 21} 31 V38 H${cx - 31} Z" fill="#46494c"/>`;
    out += `<polygon points="${cx - 31},38 ${cx - 21},38 ${cx - 13},49 ${cx - 39},49" fill="#3a3d40"/>`;

    out += `<rect x="${cx + 5}" y="32" width="23" height="6" rx="2" fill="#8e9499"/>`;
    out += `<ellipse class="lamp-bulb" cx="${cx + 26}" cy="52" rx="4.5" ry="6.5"/>`;
    out += `<path d="M${cx + 21} 31 Q${cx + 26} 24 ${cx + 31} 31 V38 H${cx + 21} Z" fill="#46494c"/>`;
    out += `<polygon points="${cx + 21},38 ${cx + 31},38 ${cx + 39},49 ${cx + 13},49" fill="#3a3d40"/>`;
  });
  return out;
}

function clouds() {
  const spots = [
    [80, 30],
    [330, 70],
    [560, 20],
    [780, 60],
  ];
  let out = "";
  spots.forEach((p) => {
    out += `<g class="cloud"><ellipse cx="${p[0]}" cy="${p[1]}" rx="46" ry="16"/><ellipse cx="${p[0] + 26}" cy="${p[1] - 12}" rx="30" ry="16"/><ellipse cx="${p[0] - 22}" cy="${p[1] - 8}" rx="24" ry="13"/></g>`;
  });
  return out;
}

const LAMP_DEFS = `<defs><linearGradient id="lampGlow" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e8f516" stop-opacity="0.45"/><stop offset="100%" stop-color="#e8f516" stop-opacity="0"/></linearGradient></defs>`;

export function IntroOverlay() {
  const [dismissed, setDismissed] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLDivElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);
  const polesRef = useRef<HTMLDivElement>(null);
  const dashesRef = useRef<HTMLDivElement>(null);
  const dirtRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);

  const graderWrapRef = useRef<HTMLDivElement>(null);
  const truckWrapRef = useRef<HTMLDivElement>(null);
  const logoScreenRef = useRef<HTMLDivElement>(null);

  const graderRef = useRef<SVGSVGElement>(null);
  const gBodyRef = useRef<SVGGElement>(null);
  const gw1Ref = useRef<SVGGElement>(null);
  const gw2Ref = useRef<SVGGElement>(null);
  const gw3Ref = useRef<SVGGElement>(null);

  const truckRef = useRef<SVGSVGElement>(null);
  const tBodyRef = useRef<SVGGElement>(null);
  const tw1Ref = useRef<SVGGElement>(null);
  const tw2Ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (dismissed) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    const elRoot = rootRef.current!;
    const elScene = sceneRef.current!;
    const elClouds = cloudsRef.current!;
    const elFar = farRef.current!;
    const elNear = nearRef.current!;
    const elPoles = polesRef.current!;
    const dashes = dashesRef.current!;
    const dirt = dirtRef.current!;
    const dust = dustRef.current!;
    const graderWrap = graderWrapRef.current!;
    const truckWrap = truckWrapRef.current!;
    const logoScreen = logoScreenRef.current!;

    const grader = graderRef.current!;
    const gBody = gBodyRef.current!;
    const gw1 = gw1Ref.current!;
    const gw2 = gw2Ref.current!;
    const gw3 = gw3Ref.current!;

    const truck = truckRef.current!;
    const tBody = tBodyRef.current!;
    const tw1 = tw1Ref.current!;
    const tw2 = tw2Ref.current!;

    elClouds.innerHTML = tile(clouds(), 110);

    let mode: "rural" | "sunset" | "urban" = "rural";
    let timerNight: number | undefined;
    let timerSunset: number | undefined;
    let timerLights: number | undefined;
    let timerDrive: number | undefined;
    let timerLoop: number | undefined;
    let truckDriveAway = false;
    let truckDriveAwayStart = 0;
    let logoTriggered = false;
    let rafId = 0;

    function clearTimers() {
      window.clearTimeout(timerNight);
      window.clearTimeout(timerSunset);
      window.clearTimeout(timerLights);
      window.clearTimeout(timerDrive);
      window.clearTimeout(timerLoop);
    }

    function setRuralDay() {
      mode = "rural";
      truckDriveAway = false;
      logoTriggered = false;
      logoScreen.classList.remove("active");
      elScene.classList.remove("fade-out-scene");
      truckWrap.style.transform = "translateX(-50%)";
      elRoot.removeAttribute("data-scene");
      elFar.innerHTML = tile(ruralFar(200), 200);
      elNear.innerHTML = tile(ruralNear(120), 120);
      elPoles.innerHTML = "";
      elPoles.classList.remove("lights-on");
      graderWrap.classList.remove("hidden");
      truckWrap.classList.add("hidden");
    }

    function setSunset() {
      mode = "sunset";
      truckDriveAway = false;
      truckWrap.style.transform = "translateX(-50%)";
      elRoot.setAttribute("data-scene", "sunset");
      elFar.innerHTML = tile(cityBuildings(200), 200);
      elNear.innerHTML = tile(cityResidences(120), 120);
      elPoles.innerHTML = tile(streetPoles(215), 215, LAMP_DEFS);
      elPoles.classList.remove("lights-on");
      graderWrap.classList.add("hidden");
      truckWrap.classList.remove("hidden");
    }

    function setNight() {
      mode = "urban";
      elRoot.setAttribute("data-scene", "night");

      timerLights = window.setTimeout(() => {
        elPoles.classList.add("lights-on");

        timerDrive = window.setTimeout(() => {
          truckDriveAway = true;
          truckDriveAwayStart = performance.now();
        }, 4000);
      }, 1000);
    }

    function startSequence() {
      clearTimers();
      setRuralDay();

      timerSunset = window.setTimeout(() => {
        setSunset();
      }, 3000);

      timerNight = window.setTimeout(() => {
        setNight();
      }, 4500);
    }

    let last = performance.now();
    let dist = 0;
    let angleG = 0;
    let angleT = 0;
    let t = 0;
    const SPEED = 5 * 90;

    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      dist += SPEED * dt;
      t += dt * (0.5 + SPEED / 60);

      elClouds.style.transform = `translateX(${-(dist * 0.1) % TILE}px)`;
      elFar.style.transform = `translateX(${-(dist * 0.25) % TILE}px)`;
      elNear.style.transform = `translateX(${-(dist * 0.5) % TILE}px)`;
      elPoles.style.transform = `translateX(${-(dist * 0.85) % TILE}px)`;
      dashes.style.backgroundPositionX = `${-dist % 110}px`;
      dirt.style.backgroundPosition = `${-dist % 90}px 12px, ${(-dist + 40) % 130}px 28px`;

      dust.style.display = mode === "rural" ? "block" : "none";

      const amp = Math.min(4, 1 + SPEED / 200);
      const bounce = Math.sin(t * 14) * amp;
      const tilt = Math.sin(t * 7) * 0.4;

      if (mode === "rural") {
        const scaleG = grader.getBoundingClientRect().width / 512 || 0.7;
        angleG += (SPEED / (46 * scaleG)) * (180 / Math.PI) * dt;
        gw1.setAttribute("transform", `rotate(${angleG} 80 246)`);
        gw2.setAttribute("transform", `rotate(${angleG} 176 246)`);
        gw3.setAttribute("transform", `rotate(${angleG} 446 246)`);
        gBody.setAttribute("transform", `translate(0 ${bounce * 1.15}) rotate(${tilt * 1.1} 240 246)`);
      } else {
        const scaleT = truck.getBoundingClientRect().width / 515 || 0.7;
        angleT += (SPEED / (57 * scaleT)) * (180 / Math.PI) * dt;
        tw1.setAttribute("transform", `rotate(${angleT} 150 415)`);
        tw2.setAttribute("transform", `rotate(${angleT} 427 415)`);
        tBody.setAttribute("transform", `translate(0 ${bounce}) rotate(${tilt} 277 415)`);

        if (truckDriveAway) {
          const elapsedDrive = (now - truckDriveAwayStart) / 1000;
          const extraOffset = elapsedDrive * 280;
          truckWrap.style.transform = `translateX(calc(-50% + ${extraOffset}px))`;

          if (extraOffset > window.innerWidth / 2 + 300 && !logoTriggered) {
            logoTriggered = true;
            elScene.classList.add("fade-out-scene");
            logoScreen.classList.add("active");

            timerLoop = window.setTimeout(() => {
              startSequence();
            }, 3400);
          }
        }
      }

      rafId = window.requestAnimationFrame(frame);
    }

    startSequence();
    rafId = window.requestAnimationFrame(frame);

    return () => {
      clearTimers();
      window.cancelAnimationFrame(rafId);
    };
  }, [dismissed]);

  const handleStart = () => {
    if (fadingOut) return;
    setFadingOut(true);
    window.setTimeout(() => {
      setDismissed(true);
      ScrollTrigger.refresh();
    }, 1000);
  };

  if (dismissed) return null;

  return (
    <div
      ref={rootRef}
      className={`semovi-intro fixed inset-0 z-[100] select-none transition-opacity duration-1000 ease-in-out ${
        fadingOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <style>{`
        .semovi-intro {
          --sky:#bfe6fb; --cloud:#ffffff; --far:#7cb875; --near:#5c9e54;
          --road:#b07d4f; --road-edge:#8c5e35; --dash:transparent; --grass:#7cc576;
          background: #000000;
        }
        .semovi-intro[data-scene="sunset"] {
          --sky:#f49352; --cloud:#ffc299; --far:#3c5240; --near:#283a2b;
          --road:#2b323a; --road-edge:#1b2025; --dash:#c9ced3; --grass:#325438;
        }
        .semovi-intro[data-scene="night"] {
          --sky:#101c30; --cloud:#23334d; --far:#182942; --near:#213757;
          --road:#2b323a; --road-edge:#1b2025; --dash:#c9ced3; --grass:#23472c;
        }
        .semovi-intro .scene {
          position:relative;width:100%;height:100%;overflow:hidden;
          background:var(--sky);transition:background 1.2s ease, opacity 1.5s ease;
        }
        .semovi-intro .layer {
          position:absolute;left:0;width:max-content;display:flex;will-change:transform;transition:opacity 1.5s ease;
        }
        .semovi-intro .layer svg { display:block;flex:none; }
        .semovi-intro .clouds-layer { top:10%; }
        .semovi-intro .far-layer { bottom:30%; }
        .semovi-intro .near-layer { bottom:26%; }
        .semovi-intro .poles-layer { bottom:28%;z-index:2;pointer-events:none; }
        .semovi-intro .cloud { fill:var(--cloud);transition:fill 1.2s ease; }
        .semovi-intro .far { fill:var(--far);transition:fill 1.2s ease; }
        .semovi-intro .near { fill:var(--near);transition:fill 1.2s ease; }
        .semovi-intro .ground {
          position:absolute;left:0;right:0;bottom:0;height:30%;
          background:var(--grass);transition:background 1.2s ease, opacity 1.5s ease;
        }
        .semovi-intro .road {
          position:absolute;left:0;right:0;bottom:0;height:28%;
          background:var(--road);border-top:6px solid var(--road-edge);
          transition:background 1.2s ease, border-color 1.2s ease, opacity 1.5s ease;z-index:1;
        }
        .semovi-intro .dashes {
          position:absolute;left:0;right:0;top:55%;height:6px;
          background:repeating-linear-gradient(90deg,var(--dash) 0 50px,transparent 50px 110px);
          transition:opacity 1.2s ease;
        }
        .semovi-intro .dirt-details {
          position:absolute;inset:0;
          background-image:radial-gradient(#7a5029 2px, transparent 2px), radial-gradient(#cfa072 2px, transparent 2px);
          background-size:90px 45px, 130px 60px;
          background-position:0 12px, 40px 28px;
          opacity:0.75;transition:opacity 0.8s ease;
        }
        .semovi-intro[data-scene="sunset"] .dirt-details,
        .semovi-intro[data-scene="night"] .dirt-details { opacity:0; }

        .semovi-intro .stars {
          position:absolute;inset:0 0 35% 0;pointer-events:none;opacity:0;transition:opacity 1.2s ease;
          background-image:
            radial-gradient(2px 2px at 12% 18%, #fff, transparent),
            radial-gradient(1.5px 1.5px at 28% 35%, #fff, transparent),
            radial-gradient(2px 2px at 45% 12%, #fff, transparent),
            radial-gradient(1.5px 1.5px at 67% 28%, #fff, transparent),
            radial-gradient(2px 2px at 82% 15%, #fff, transparent),
            radial-gradient(1.5px 1.5px at 91% 40%, #fff, transparent),
            radial-gradient(1.5px 1.5px at 19% 48%, #fff, transparent);
        }
        .semovi-intro[data-scene="night"] .stars { opacity:0.85; }

        .semovi-intro .lamp-bulb { fill:#545e66;transition:fill 0.35s ease, filter 0.35s ease; }
        .semovi-intro .lamp-cone { opacity:0;transition:opacity 0.45s ease; }
        .semovi-intro .lights-on .lamp-bulb {
          fill:#e8f516;
          filter:drop-shadow(0 0 7px rgba(232,245,22,0.95));
        }
        .semovi-intro .lights-on .lamp-cone { opacity:1; }

        .semovi-intro .vehicle-wrap {
          position:absolute;left:50%;bottom:calc(28% - 50px);width:min(55vw,270px);
          transform:translateX(-50%);transition:opacity 0.5s ease;z-index:3;
        }
        .semovi-intro .vehicle-wrap.hidden { opacity:0;pointer-events:none; }
        .semovi-intro .vehicle-wrap svg { display:block;width:100%;height:auto;overflow:visible; }
        .semovi-intro .shadow {
          position:absolute;left:8%;right:4%;bottom:-6px;height:10px;
          border-radius:50%;background:rgba(0,0,0,.28);filter:blur(3px);
        }

        .semovi-intro .dust { position:absolute;left:-24px;bottom:4px;width:54px;height:28px;pointer-events:none; }
        .semovi-intro .dust span {
          position:absolute;border-radius:50%;background:rgba(194,148,100,.65);
          animation:introDustPuff .7s infinite ease-out;
        }
        .semovi-intro .dust span:nth-child(1) { width:16px;height:16px;left:18px;bottom:2px;animation-delay:0s; }
        .semovi-intro .dust span:nth-child(2) { width:22px;height:22px;left:6px;bottom:6px;animation-delay:.22s; }
        .semovi-intro .dust span:nth-child(3) { width:14px;height:14px;left:28px;bottom:8px;animation-delay:.45s; }
        @keyframes introDustPuff {
          0% { transform:translate(0,0) scale(.6);opacity:.8; }
          100% { transform:translate(-34px,-14px) scale(1.6);opacity:0; }
        }

        .semovi-intro .logo-screen {
          position:absolute;inset:0;background:#061c2e;display:flex;align-items:center;justify-content:center;
          opacity:0;pointer-events:none;transition:opacity 1.5s ease;z-index:20;
        }
        .semovi-intro .logo-screen.active { opacity:1;pointer-events:auto; }
        .semovi-intro .logo-svg {
          width:min(70vw, 550px);height:auto;
          opacity:0;transform:scale(0.85);
          transition:opacity 1.2s ease 0.3s, transform 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s;
        }
        .semovi-intro .logo-screen.active .logo-svg { opacity:1;transform:scale(1); }
        .semovi-intro .fade-out-scene { opacity:0 !important; }
      `}</style>

      <div ref={sceneRef} className="scene">
        <div className="stars" />
        <div ref={cloudsRef} className="layer clouds-layer" />
        <div ref={farRef} className="layer far-layer" />
        <div ref={nearRef} className="layer near-layer" />
        <div ref={polesRef} className="layer poles-layer" />
        <div className="ground" />
        <div className="road">
          <div ref={dirtRef} className="dirt-details" />
          <div ref={dashesRef} className="dashes" />
        </div>

        <div ref={graderWrapRef} className="vehicle-wrap">
          <div className="shadow" />
          <div ref={dustRef} className="dust">
            <span />
            <span />
            <span />
          </div>
          <svg ref={graderRef} viewBox="0 0 512 340" xmlns="http://www.w3.org/2000/svg" aria-label="Motoniveladora">
            <g ref={gBodyRef}>
              <path d="M84 118 V86 Q84 68 68 56" fill="none" stroke="#111" strokeWidth="14" strokeLinecap="round" />
              <path d="M12 134 L172 104 V224 H12 Z" fill="#FFE047" stroke="#111" strokeWidth="14" strokeLinejoin="round" />
              <path d="M22 142 H36 V216 H22 Z" fill="#F5B800" />
              <line x1="56" y1="128" x2="56" y2="162" stroke="#111" strokeWidth="12" strokeLinecap="round" />
              <line x1="88" y1="122" x2="88" y2="156" stroke="#111" strokeWidth="12" strokeLinecap="round" />
              <path d="M172 224 V78 Q172 42 208 42 H278 V186 H204 V224 Z" fill="#FFD014" stroke="#111" strokeWidth="14" strokeLinejoin="round" />
              <rect x="206" y="49" width="65" height="130" fill="#A6DCEF" stroke="#111" strokeWidth="12" />
              <rect x="218" y="64" width="14" height="14" fill="#FFFFFF" />
              <path d="M278 118 H408 Q450 118 450 160 V228 H420 V162 Q420 146 404 146 H278 Z" fill="#FFD014" stroke="#111" strokeWidth="14" strokeLinejoin="round" />
              <path d="M312 168 H350 V220 Q350 246 376 258 V288 Q312 272 312 216 Z" fill="#4B5D6B" stroke="#111" strokeWidth="14" strokeLinejoin="round" />
            </g>
            <g ref={gw1Ref}>
              <circle cx="80" cy="246" r="46" fill="#4B5D6B" stroke="#111" strokeWidth="16" />
              <circle cx="80" cy="246" r="18" fill="#8EA2B2" stroke="#111" strokeWidth="10" />
              <circle cx="80" cy="224" r="4" fill="#111" />
            </g>
            <g ref={gw2Ref}>
              <circle cx="176" cy="246" r="46" fill="#4B5D6B" stroke="#111" strokeWidth="16" />
              <circle cx="176" cy="246" r="18" fill="#8EA2B2" stroke="#111" strokeWidth="10" />
              <circle cx="176" cy="224" r="4" fill="#111" />
            </g>
            <g ref={gw3Ref}>
              <circle cx="446" cy="246" r="46" fill="#4B5D6B" stroke="#111" strokeWidth="16" />
              <circle cx="446" cy="246" r="18" fill="#8EA2B2" stroke="#111" strokeWidth="10" />
              <circle cx="446" cy="224" r="4" fill="#111" />
            </g>
          </svg>
        </div>

        <div ref={truckWrapRef} className="vehicle-wrap hidden">
          <div className="shadow" />
          <svg ref={truckRef} viewBox="20 60 515 425" xmlns="http://www.w3.org/2000/svg" aria-label="Caminhão de serviço">
            <g ref={tBodyRef}>
              <path d="M35 288 L147 95 Q152 88 160 88 L312 80 Q335 80 335 103 L335 415 L55 415 Q35 415 35 395Z" fill="#FFA000" />
              <path d="M35 288 L148 92 L150 335 L140 335 L100 415 L55 415 Q35 415 35 395Z" fill="#FFB300" />
              <rect x="150" y="68" width="46" height="267" fill="#FFC107" />
              <rect x="242" y="68" width="46" height="267" fill="#FFC107" />
              <polygon points="140,335 335,335 335,415 82,415" fill="#78909C" />
              <path d="M335 162 L460 162 Q472 162 477 175 L520 298 L520 395 Q520 415 500 415 L335 415Z" fill="#FFC107" />
              <path d="M392 184 H452 Q462 184 466 196 L485 250 V277 Q485 287 475 287 H392 Q381 287 381 277 V194 Q381 184 392 184Z" fill="#37474F" />
              <rect x="510" y="340" width="12" height="22" rx="4" fill="#FFF59D" />
              <polygon points="522,342 660,305 660,415 522,360" fill="rgba(255,249,196,0.28)" />
            </g>
            <g ref={tw1Ref}>
              <circle cx="150" cy="415" r="57" fill="#37474F" />
              <circle cx="150" cy="415" r="23" fill="#78909C" />
              <circle cx="150" cy="400" r="5" fill="#37474F" />
            </g>
            <g ref={tw2Ref}>
              <circle cx="427" cy="415" r="57" fill="#37474F" />
              <circle cx="427" cy="415" r="23" fill="#78909C" />
              <circle cx="427" cy="400" r="5" fill="#37474F" />
            </g>
          </svg>
        </div>
      </div>

      <div ref={logoScreenRef} className="logo-screen">
        <svg className="logo-svg" viewBox="0 0 1024 268" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Logotipo SEMOVI">
          <path d="M775.023 176.500C774.907 177.563 774.445 178.436 774.320 179.500C774.000 182.241 773.632 184.799 773.125 187.500C773.030 188.006 772.635 188.415 772.500 188.911C772.272 189.750 772.328 190.642 772.187 191.500C771.664 194.676 772.354 190.692 771.500 193.174C771.245 193.915 771.356 194.740 771.167 195.500C771.038 196.021 770.660 196.452 770.500 196.964C770.244 197.786 770.303 198.690 770.013 199.500C768.721 203.108 767.591 206.945 766.063 210.500C762.437 218.937 755.882 229.153 748.500 234.990C745.959 236.999 743.304 239.301 740.500 240.919C722.706 251.188 701.397 253.931 680.750 254.056C650.760 254.238 617.984 251.363 597.810 226.500C596.557 224.955 595.482 223.185 594.553 221.500C593.782 220.102 592.631 218.890 591.845 217.500C591.301 216.537 591.019 215.357 590.500 214.406C590.312 214.062 590.078 215.108 590.071 215.500C590.051 216.688 590.262 217.868 590.357 219.052C590.547 221.407 590.971 223.716 591.181 226.079C591.404 228.581 591.849 231.013 592.148 233.500C592.357 235.234 592.259 237.012 592.500 238.742C592.630 239.676 593.009 240.565 593.136 241.500C593.385 243.345 593.178 245.281 593.500 247.114C593.806 248.860 595.085 251.744 594.110 253.500C593.534 254.539 591.376 254.151 590.569 254.154L580.914 254.188L548.086 254.306C545.688 254.314 537.147 254.929 535.500 253.940C534.476 253.325 534.727 249.154 534.500 247.979C533.457 242.583 533.209 237.039 532.500 231.579C531.936 227.232 531.243 222.864 530.814 218.500C530.657 216.911 530.770 215.230 530.500 213.657C530.317 212.591 529.899 211.600 529.794 210.500C529.628 208.767 529.817 206.894 529.500 205.184L528.957 203.500C528.539 201.402 528.935 199.137 528.500 197.042L527.959 195.500C527.416 193.415 527.848 191.104 527.500 188.987C527.415 188.470 527.065 188.019 526.993 187.500C526.701 185.377 526.902 183.141 526.500 181.037C525.591 176.273 525.139 171.377 524.677 166.500C524.572 165.387 524.155 164.581 524.022 163.500C523.762 161.392 523.922 159.201 523.500 157.113C522.650 152.906 522.207 148.440 521.810 144.137C521.634 142.224 521.234 140.389 521.037 138.500C521.030 138.428 521.071 136.994 520.500 136.994C520.354 136.994 520.331 137.662 520.262 138.500C520.165 139.677 519.536 140.451 519.362 141.500C519.253 142.162 519.361 142.866 519.142 143.500L518.500 144.674C518.198 145.579 518.352 146.593 518.058 147.500L517.496 148.500C517.279 149.136 517.386 149.841 517.258 150.500C516.584 153.972 517.459 149.375 516.500 152.219C516.255 152.945 516.436 153.764 516.223 154.500C515.653 156.466 515.042 158.383 514.500 160.366C514.220 161.390 514.224 162.479 513.933 163.500C512.777 167.559 511.758 171.612 510.500 175.574C510.201 176.516 510.333 177.563 510.017 178.500L509.427 179.500C509.083 180.476 509.366 181.523 508.889 182.500L508.500 182.923C508.222 183.745 508.386 184.674 508.119 185.500C507.172 188.437 506.448 191.382 505.500 194.307C505.273 195.008 505.382 195.784 505.206 196.500C504.728 198.445 504.026 200.386 503.500 202.316C503.216 203.357 503.209 204.462 502.912 205.500C501.408 210.741 500.301 216.187 498.500 221.264C497.792 223.262 497.801 225.507 497.128 227.500L496.500 228.621C496.192 229.543 496.351 230.578 496.046 231.500L495.500 232.393C495.157 233.382 495.412 234.504 494.988 235.500C494.543 236.546 494.541 237.404 494.213 238.500C493.245 241.734 492.402 245.030 491.500 248.297C491.023 250.025 490.990 251.938 489.994 253.500C489.289 254.606 482.203 254.038 480.700 254.024L455.350 253.799C449.970 253.752 444.593 253.647 439.214 253.537C437.797 253.508 433.607 254.007 432.500 253.290C431.206 252.452 431.002 247.882 430.500 246.324C429.696 243.830 430.273 247.296 429.765 244.500C429.645 243.841 429.771 243.135 429.557 242.500C428.718 240.011 429.163 242.937 428.753 240.500C428.641 239.839 428.773 239.131 428.547 238.500L427.936 237.500C427.621 236.564 427.792 235.513 427.500 234.570C426.377 230.950 425.292 227.265 424.637 223.500C424.508 222.761 424.063 222.280 423.899 221.500C423.400 219.121 422.801 216.823 422.146 214.500C421.440 211.994 421.143 209.326 420.500 206.814C419.743 203.856 420.111 206.921 419.704 204.500C419.593 203.840 419.739 203.132 419.518 202.500L418.915 201.500C418.178 199.281 418.195 196.830 417.500 194.600L416.903 193.500C416.614 192.590 416.791 191.574 416.500 190.665L415.873 189.500C415.660 188.865 415.787 188.161 415.676 187.500C415.411 185.927 415.683 187.634 415.154 186.500C414.715 185.558 414.808 184.497 414.639 183.500C414.511 182.742 414.013 182.322 413.853 181.500C412.878 176.498 411.549 171.445 410.175 166.500C409.466 163.948 409.202 161.217 408.500 158.689L407.874 157.500C407.592 156.603 407.778 155.602 407.500 154.703L406.882 153.500C406.610 152.648 406.743 151.704 406.500 150.843C406.365 150.364 405.964 149.984 405.848 149.500C405.656 148.694 405.873 147.697 405.500 146.933C404.873 145.649 405.309 147.764 404.856 145.500C404.710 144.770 404.906 143.714 404.500 143.055L404.025 142.500C403.673 141.454 403.855 140.276 403.500 139.231L402.960 138.500L402.500 136.665L402.363 137.500C402.265 138.497 402.239 139.500 402.176 140.500C402.028 142.890 401.456 145.129 401.253 147.500C400.910 151.515 400.460 155.484 400.012 159.500C399.892 160.580 399.434 161.399 399.330 162.500C399.146 164.439 399.380 166.615 398.850 168.500C398.203 170.803 398.410 173.134 398.032 175.500C397.923 176.186 397.551 176.813 397.444 177.500C397.136 179.472 397.373 181.530 397.058 183.500C396.948 184.188 396.549 184.810 396.450 185.500C396.215 187.140 396.372 188.851 396.213 190.500C396.110 191.556 395.664 192.489 395.482 193.500C395.190 195.116 395.322 196.865 395.162 198.500C395.052 199.625 394.679 200.659 394.500 201.758C394.248 203.309 394.345 204.937 394.175 206.500C393.194 215.525 391.960 224.474 391.006 233.500C390.747 235.957 391.033 232.911 390.500 235.655C390.126 237.581 390.255 239.560 390.041 241.500C389.833 243.391 389.915 241.587 389.500 243.671C389.153 245.413 389.228 247.236 389.065 249.000C388.997 249.731 388.356 253.877 387.500 254.065C385.748 254.451 383.339 254.067 381.540 254.068L369.620 254.073L329.887 254.090L258.367 254.121C246.272 254.126 234.130 254.531 222.167 252.478C219.609 252.039 216.959 251.780 214.500 250.940C204.046 247.369 193.842 242.251 187.500 232.451C187.044 231.747 186.344 231.218 185.911 230.500C183.286 226.145 181.416 221.423 180.137 216.500C179.885 215.528 179.642 209.823 178.500 209.823C178.304 209.823 178.256 212.202 178.152 212.500L177.500 213.639C176.974 215.264 176.705 216.889 176.097 218.500L175.500 219.299C173.790 223.129 172.088 227.217 169.200 230.500C166.244 233.860 163.072 237.349 159.500 240.063C150.152 247.163 138.726 249.572 127.500 251.863C121.953 252.994 116.146 253.062 110.520 253.500C99.426 254.364 88.331 254.113 77.225 253.500C70.669 253.138 64.004 252.965 57.500 252.012C56.817 251.912 56.175 251.608 55.493 251.500C53.522 251.188 51.457 251.324 49.500 250.940C46.144 250.283 49.963 250.648 46.500 250.260C43.452 249.919 40.539 249.517 37.500 249.075C36.659 248.953 36.282 248.472 35.500 248.377C34.504 248.256 33.488 248.300 32.500 248.121C31.994 248.030 31.589 247.620 31.089 247.500C29.916 247.219 28.659 247.373 27.500 247.038L26.500 246.462C25.360 246.117 20.530 245.744 20.010 244.500C19.328 242.868 19.868 228.749 19.871 225.891L19.899 204.370C19.901 203.084 19.411 198.414 20.500 197.746C21.525 197.117 24.071 197.725 25.167 197.753C29.569 197.865 33.870 198.576 38.250 198.700C42.316 198.816 46.445 198.733 50.500 199.049C53.515 199.284 56.465 199.629 59.500 199.696C69.534 199.918 79.582 199.870 89.618 199.956C98.299 200.031 116.542 200.454 121.524 191.500C122.754 189.289 122.698 186.625 122.695 184.167C122.692 182.173 122.978 179.757 122.500 177.825L121.813 176.500C119.328 170.423 112.454 168.957 106.500 168.698C96.183 168.249 85.816 168.983 75.500 168.135C74.564 168.058 73.743 167.672 72.876 167.500C71.456 167.219 69.933 167.397 68.500 167.185C66.141 166.836 68.881 167.059 66.495 166.500C65.518 166.271 64.490 166.348 63.500 166.179C61.293 165.801 63.673 166.077 61.583 165.500C58.551 164.663 55.472 164.177 52.500 163.075C41.984 159.174 30.740 151.612 25.022 141.500C16.799 126.958 15.860 111.765 15.912 95.000C15.932 88.483 15.866 81.936 16.994 75.500C17.114 74.810 17.490 74.185 17.634 73.500C17.841 72.521 17.677 71.451 18.053 70.500C18.437 69.530 18.510 68.477 18.882 67.500L19.515 66.500C19.772 65.872 19.618 65.123 19.886 64.500L20.558 63.500C20.849 62.876 20.790 62.126 21.078 61.500C21.673 60.203 22.256 58.799 22.887 57.500L23.500 56.801C25.863 52.394 28.536 48.668 32.093 45.055C33.831 43.290 35.564 41.441 37.500 39.886C40.771 37.259 44.367 35.495 47.965 33.500L48.500 32.972L50.096 32.500C51.868 31.706 53.676 30.661 55.500 29.899C56.077 29.658 56.759 29.746 57.335 29.500C58.677 28.927 60.094 28.406 61.500 27.933C62.277 27.672 63.140 27.752 63.920 27.500C69.732 25.620 76.003 25.045 82.127 24.500C93.667 23.473 103.970 23.589 115.500 24.498C118.275 24.717 121.063 24.670 123.833 24.961C132.192 25.837 140.913 26.544 149.029 28.500C150.477 28.849 152.059 28.672 153.500 29.046C156.520 29.832 152.343 29.254 155.500 29.695C156.496 29.834 157.530 29.750 158.500 30.016L159.500 30.542C161.169 30.997 169.697 31.821 170.083 33.500C170.579 35.662 170.089 42.335 170.091 44.955L170.110 69.773C170.111 71.051 170.460 79.567 169.500 80.048C167.827 80.886 161.872 79.817 159.993 79.500C157.735 79.120 155.284 79.289 153.000 79.219C149.778 79.121 146.669 78.876 143.491 78.500C137.594 77.802 131.433 78.346 125.500 78.151C116.936 77.870 108.226 76.830 99.657 77.500C98.924 77.557 98.230 77.872 97.500 77.961C93.103 78.495 88.510 78.227 84.500 80.045C83.884 80.324 83.134 80.211 82.523 80.500C80.564 81.428 77.567 83.590 76.500 85.447C73.898 89.972 73.875 99.954 76.391 104.500C77.386 106.299 79.782 108.783 81.735 109.500L83.500 109.987C84.566 110.429 83.734 110.485 84.500 110.612C85.162 110.722 85.846 110.690 86.500 110.838C87.230 111.003 87.775 111.537 88.500 111.580C108.728 112.760 129.619 109.222 148.500 118.022C157.025 121.994 167.198 130.364 172.071 138.500C173.823 141.425 175.121 144.496 176.500 147.595L177.150 148.500L177.500 150.267C177.660 150.720 178.112 151.039 178.247 151.500L178.500 152.698L178.684 151.500C178.811 149.573 178.605 147.545 178.605 145.611L178.606 118.389L178.608 91.167C178.608 79.919 178.138 68.223 181.903 57.500L182.500 56.580C183.096 55.240 183.457 53.833 184.076 52.500C185.351 49.751 187.249 47.026 188.954 44.500C191.574 40.618 195.517 36.988 199.415 34.500C200.161 34.023 200.733 33.296 201.500 32.853C204.710 31.003 208.015 29.184 211.500 27.879C222.551 23.743 234.682 23.699 246.387 23.701L268.179 23.705L299.877 23.710L329.594 23.714C331.654 23.715 337.891 23.255 339.500 23.716L340.259 24.500C340.872 25.731 340.390 29.890 340.390 31.389L340.394 47.093L340.400 72.611C340.400 73.973 341.026 78.929 339.500 79.413C338.316 79.788 334.899 79.417 333.543 79.419L317.659 79.435L268.022 79.486C261.106 79.493 248.767 78.150 243.500 83.433C241.759 85.178 241.085 87.628 240.500 89.959C240.176 91.252 240.440 92.978 240.438 94.300L240.424 105.700C240.423 106.293 240.215 110.243 240.500 110.606C240.857 111.060 244.779 110.967 245.500 111.005C247.006 111.083 248.426 111.312 249.910 111.500C253.692 111.979 257.692 111.695 261.500 111.758C266.873 111.846 272.152 112.220 277.500 112.532C283.478 112.881 289.513 112.677 295.500 112.835C298.744 112.921 301.948 113.320 305.183 113.500C309.442 113.737 313.740 113.680 318.005 113.770C319.664 113.804 321.892 113.497 323.500 113.885C324.069 114.022 324.874 114.965 324.984 115.500C325.493 117.970 324.981 122.597 324.980 125.283L324.971 148.761C324.969 152.609 325.344 156.673 324.966 160.500C324.720 162.989 321.414 162.311 319.683 162.370C315.039 162.528 310.420 162.901 305.773 163.029C289.319 163.483 272.835 163.904 256.394 164.669C252.321 164.858 248.243 165.122 244.167 165.202C243.455 165.216 241.051 164.878 240.500 165.493C240.084 165.958 240.425 173.022 240.431 174.097C240.487 183.297 238.920 192.138 248.695 196.500C251.048 197.550 257.753 197.067 260.354 197.067L283.768 197.069L320.841 197.073C323.479 197.073 333.758 197.608 335.500 196.706C335.554 196.678 336.035 190.493 336.278 189.500C336.838 187.211 336.817 184.852 337.046 182.500C337.153 181.409 337.583 180.613 337.693 179.500C338.092 175.465 338.516 171.539 338.870 167.500C338.993 166.104 339.559 164.920 339.671 163.500C340.066 158.464 340.564 153.526 341.500 148.579C341.875 146.598 341.649 144.496 341.945 142.500C342.056 141.747 342.395 141.038 342.500 140.284C342.721 138.707 342.621 137.082 342.801 135.500C343.142 132.498 343.550 129.510 343.876 126.500C344.336 122.267 344.912 118.017 345.500 113.806C346.257 108.380 346.562 102.877 347.505 97.500C348.285 93.057 348.324 87.998 348.964 83.500C349.108 82.486 349.494 81.515 349.633 80.500C349.859 78.854 349.768 77.154 349.930 75.500C350.036 74.430 350.557 73.571 350.648 72.500C351.025 68.102 351.451 63.893 351.890 59.500C352.209 56.317 351.841 61.022 352.500 57.314C352.834 55.434 352.658 53.401 352.842 51.500C353.018 49.676 353.057 51.274 353.500 48.895C353.762 47.489 353.634 45.927 353.749 44.500C353.956 41.953 354.522 39.479 354.712 36.924C354.861 34.926 355.269 32.980 355.500 30.993C355.740 28.928 355.478 26.441 356.291 24.500C356.480 24.049 357.021 23.765 357.500 23.668C358.784 23.409 360.119 23.669 361.429 23.669L371.250 23.671L398.750 23.675C400.754 23.676 412.541 23.326 413.500 23.745C415.176 24.478 416.899 33.371 417.500 35.303L418.135 36.500C418.393 37.248 418.216 38.108 418.500 38.847L419.019 39.500C419.278 40.124 419.214 40.838 419.352 41.500C419.732 43.321 419.177 40.517 419.915 42.500C420.249 43.398 420.224 44.397 420.500 45.314C420.914 46.692 421.549 48.151 422.076 49.500C422.322 50.129 422.153 50.869 422.391 51.500C424.071 55.945 425.210 60.641 426.500 65.274C427.275 68.057 428.196 70.823 429.145 73.500C429.408 74.243 429.219 75.101 429.500 75.837L430.020 76.500C430.338 77.318 430.190 78.268 430.500 79.089L430.904 79.500C431.272 80.235 431.332 81.599 431.500 82.273C431.612 82.722 432.020 83.056 432.149 83.500C432.337 84.146 432.171 84.876 432.423 85.500L433.094 86.500C433.349 87.124 433.151 87.870 433.390 88.500C434.741 92.059 435.720 95.852 436.940 99.500C437.247 100.417 437.214 101.422 437.500 102.345C438.024 104.037 438.876 105.767 439.222 107.500L439.500 109.336L440.159 110.500C440.415 111.201 440.242 112.013 440.500 112.714C440.958 113.958 441.406 115.295 441.944 116.500C442.340 117.386 442.222 118.469 442.500 119.361L443.147 120.500C443.385 121.132 443.215 121.872 443.463 122.500L444.094 123.500C444.341 124.128 444.165 124.870 444.408 125.500C444.891 126.751 445.040 127.162 445.326 128.500C445.581 129.695 445.367 128.359 445.868 129.500C446.392 130.696 446.599 132.241 447.032 133.500C448.075 136.532 448.487 139.798 449.500 142.831C450.202 144.934 449.626 141.718 450.221 144.500L450.500 146.348L451.168 147.500C451.404 148.130 451.212 148.870 451.449 149.500L452.059 150.500C452.344 151.251 452.224 152.114 452.500 152.869C453.312 155.090 452.643 151.491 453.230 154.500L453.500 156.358L454.155 157.500C454.396 158.131 454.239 158.870 454.484 159.500L455.097 160.500C455.342 161.130 455.182 161.869 455.422 162.500C456.781 166.067 457.710 169.822 458.904 173.500C459.746 176.094 460.539 178.868 461.232 181.500L461.500 183.459L461.816 182.500L462.500 181.610C462.778 180.957 462.567 180.174 462.791 179.500L463.500 177.984C464.543 174.720 465.298 171.311 466.294 168.000C468.007 162.310 469.638 156.687 471.500 151.146C471.786 150.295 471.705 149.345 472.011 148.500C473.074 145.570 474.066 142.607 474.735 139.500C475.124 137.698 475.945 135.869 476.500 134.104C477.216 131.826 477.620 129.495 478.500 127.298C479.236 125.459 479.274 123.348 479.973 121.500C481.287 118.028 482.216 114.341 483.500 110.878C483.779 110.124 483.619 109.251 483.905 108.500L484.537 107.500C484.786 106.872 484.638 106.139 484.856 105.500C486.446 100.833 484.638 107.743 485.762 102.500C486.336 99.826 485.739 102.956 486.500 100.753C486.898 99.602 487.121 98.331 487.500 97.163C488.587 93.815 489.415 90.326 490.500 86.998C490.763 86.192 490.667 85.290 490.973 84.500L491.607 83.500C491.850 82.872 491.653 82.132 491.886 81.500L492.500 80.454L492.828 78.500C492.942 78.030 493.347 77.674 493.500 77.215C493.792 76.340 493.716 75.365 494.036 74.500C494.503 73.239 495.002 71.906 495.500 70.639C495.764 69.966 495.626 69.184 495.862 68.500C497.191 64.646 498.171 60.640 499.500 56.766C500.252 54.573 500.401 52.029 501.500 50.017C502.098 48.922 502.407 45.750 502.899 44.500L503.547 43.500C503.794 42.874 503.651 42.149 503.833 41.500C503.961 41.041 504.353 40.688 504.500 40.234C504.786 39.349 504.718 38.368 505.051 37.500C505.727 35.743 505.348 38.024 505.646 36.500C505.776 35.839 505.689 35.127 505.935 34.500L506.575 33.500C506.816 32.873 506.605 32.133 506.829 31.500L507.500 30.246L507.775 28.500C507.907 27.900 508.332 27.396 508.500 26.805C508.881 25.463 508.675 23.896 510.500 23.651C514.272 23.145 520.245 23.660 524.250 23.664L553.714 23.691C556.086 23.693 563.709 23.219 565.500 23.702L566.502 24.500C567.585 25.872 567.225 29.779 567.457 31.500C568.038 35.803 568.752 40.133 569.144 44.469C569.418 47.500 569.925 50.480 570.251 53.500C570.400 54.885 570.306 56.311 570.500 57.690C570.634 58.640 570.998 59.549 571.122 60.500C571.374 62.425 571.229 64.405 571.500 66.328C571.605 67.072 571.987 67.757 572.101 68.500C572.401 70.457 572.076 72.564 572.486 74.500C573.092 77.363 572.816 73.694 573.109 76.500C573.310 78.430 572.984 80.616 573.500 82.496C574.138 84.821 574.165 87.074 574.382 89.500C574.476 90.552 574.970 91.444 575.072 92.500C575.466 96.552 575.901 100.458 576.291 104.500C576.449 106.131 576.955 107.526 577.067 109.167C577.098 109.617 577.334 113.763 577.500 113.763C577.719 113.763 577.738 112.211 577.784 111.000C577.876 108.573 577.996 106.233 578.369 103.833C578.748 101.401 578.738 98.943 579.010 96.500C579.330 93.626 578.970 97.417 579.545 94.500C579.866 92.870 579.663 91.120 580.029 89.500C580.591 87.008 580.429 89.545 580.687 87.500C580.813 86.505 580.731 85.487 580.910 84.500C580.995 84.032 581.396 83.666 581.500 83.202C581.771 81.988 581.616 80.694 581.965 79.500L582.565 78.500C582.881 77.540 582.708 76.464 583.012 75.500L583.500 74.738C584.081 73.077 584.219 71.184 584.736 69.500L585.500 67.856C590.023 54.466 595.123 44.818 606.001 35.178C608.006 33.402 610.204 31.406 612.500 30.010C617.929 26.710 623.669 24.295 629.500 21.999C630.287 21.689 631.188 21.777 631.987 21.500C632.509 21.319 632.960 20.937 633.500 20.821C634.207 20.670 635.217 20.864 635.865 20.500C637.001 19.861 635.951 20.070 637.500 19.826C638.426 19.679 639.390 19.754 640.292 19.500L641.500 18.929C642.472 18.675 643.504 18.785 644.500 18.657C645.321 18.551 645.655 18.177 646.500 18.028C648.800 17.620 651.196 17.421 653.500 17.046C656.463 16.564 659.591 16.781 662.582 16.500C677.318 15.117 692.911 15.788 707.500 17.968C708.051 18.051 708.538 18.388 709.084 18.500C710.512 18.793 712.111 18.565 713.500 19.060L714.500 19.576C715.470 19.846 716.534 19.648 717.500 19.933L718.529 20.500C719.484 20.801 720.549 20.635 721.500 20.950L722.350 21.500C723.029 21.758 723.819 21.610 724.500 21.864C727.163 22.856 729.873 23.723 732.500 24.877C747.675 31.548 759.561 44.476 766.071 59.500C767.621 63.077 768.496 66.948 770.001 70.500C770.607 71.930 769.946 71.350 770.500 73.190L771.183 74.500C771.438 75.255 771.247 76.113 771.500 76.869L771.949 77.500C772.412 78.614 772.174 79.903 772.500 81.040C772.925 82.525 773.184 83.887 773.392 85.500C773.489 86.258 773.973 86.669 774.094 87.500C774.581 90.861 774.971 94.114 775.303 97.500C775.438 98.877 775.930 100.130 776.027 101.500C777.072 116.305 777.431 131.037 777.206 145.900C777.049 156.177 776.129 166.328 775.023 176.500ZM892.500 254.105C890.784 254.484 888.420 254.106 886.658 254.107L874.974 254.111L837.974 254.124C834.686 254.125 819.471 254.725 817.500 253.893C816.373 253.417 814.855 246.238 814.500 244.764C814.388 244.301 813.967 243.957 813.833 243.500C813.643 242.854 813.803 242.126 813.556 241.500L812.907 240.500C812.660 239.874 812.753 239.161 812.627 238.500C812.412 237.372 812.606 239.099 812.035 237.500C811.704 236.575 811.832 235.526 811.500 234.602C811.004 233.223 810.472 231.874 809.959 230.500C809.723 229.867 809.775 229.161 809.638 228.500C809.371 227.210 809.680 229.124 809.101 227.500C808.644 226.216 808.405 224.801 807.973 223.500C807.327 221.553 807.138 219.455 806.500 217.504C805.958 215.847 805.357 214.179 804.838 212.500C804.620 211.796 804.759 211.005 804.500 210.315L803.953 209.500C803.655 208.701 803.783 207.786 803.500 206.981C803.319 206.465 802.917 206.033 802.793 205.500C802.640 204.844 802.747 204.128 802.505 203.500L801.876 202.500C801.631 201.872 801.812 201.130 801.572 200.500L800.962 199.500C800.575 198.469 800.563 197.487 800.101 196.500C799.664 195.565 799.892 194.534 799.500 193.591C798.427 191.011 797.725 188.229 796.925 185.500C795.551 180.811 794.458 176.073 792.894 171.500C792.636 170.747 792.775 169.892 792.500 169.145L792.025 168.500C791.706 167.630 791.795 166.649 791.500 165.771C791.347 165.318 790.956 164.962 790.833 164.500C790.659 163.848 790.769 163.129 790.526 162.500L789.906 161.500C789.670 160.871 789.772 160.160 789.644 159.500C789.481 158.661 789.486 159.517 789.035 158.500C788.647 157.627 788.916 156.648 788.500 155.793C787.858 154.474 786.385 149.850 786.320 148.500C786.219 146.428 786.524 144.237 786.565 142.156C786.674 136.622 786.694 131.032 786.524 125.500C786.235 116.076 785.537 106.687 784.667 97.306C784.454 95.016 783.976 92.780 783.708 90.500C783.594 89.529 783.697 88.531 783.500 87.573C782.721 83.780 783.382 89.015 782.851 85.500C782.681 84.374 782.744 83.215 782.500 82.103C782.377 81.543 781.978 81.064 781.875 80.500C781.694 79.511 781.840 78.463 781.550 77.500L780.962 76.500C780.660 75.538 780.868 74.464 780.570 73.500L779.994 72.500C779.686 71.604 779.751 70.615 779.500 69.702C779.379 69.262 778.983 68.935 778.845 68.500C778.327 66.865 778.157 65.088 777.511 63.500C776.696 61.497 775.795 59.525 774.978 57.500C773.114 52.879 771.210 48.298 768.500 44.128C765.395 39.351 761.748 34.359 757.500 30.419C756.618 29.601 750.786 25.247 750.741 24.500L751.500 23.749C752.514 23.419 753.633 23.726 754.700 23.714C758.263 23.676 761.825 23.663 765.389 23.664L796.796 23.672C798.896 23.673 812.641 23.349 813.500 23.759C814.953 24.453 815.037 28.469 815.500 29.809L815.989 30.500C816.310 31.461 816.150 32.541 816.475 33.500L817.079 34.500C817.391 35.366 817.133 36.383 817.500 37.258C817.679 37.685 818.007 38.051 818.121 38.500C818.322 39.292 818.127 40.258 818.500 41.008C819.084 42.182 819.021 43.280 819.420 44.500C819.957 46.146 820.467 47.835 820.972 49.500C821.252 50.425 821.234 51.421 821.500 52.350C822.738 56.677 823.501 61.282 825.019 65.500C825.366 66.464 825.165 67.559 825.500 68.496L826.094 69.500C826.744 71.466 826.892 74.130 827.500 76.131C827.648 76.617 828.058 77.004 828.172 77.500C830.239 86.493 832.638 95.478 835.113 104.500C835.687 106.593 835.882 108.808 836.500 110.879C836.668 111.440 837.058 111.927 837.182 112.500C837.347 113.261 837.231 114.084 837.500 114.815L838.020 115.500C838.347 116.457 838.149 117.541 838.471 118.500L839.083 119.500C839.393 120.421 839.203 121.459 839.500 122.384L840.114 123.500C840.332 124.135 840.222 124.839 840.337 125.500C840.472 126.274 840.961 126.679 841.144 127.500C841.972 131.204 843.046 134.788 843.978 138.500C844.730 141.492 845.529 144.499 846.243 147.500C846.398 148.153 846.281 148.862 846.500 149.496L847.063 150.500C847.357 151.465 847.138 152.545 847.463 153.500L848.114 154.500C848.425 155.377 848.275 156.362 848.500 157.265C848.612 157.713 849.010 158.054 849.130 158.500C849.304 159.148 849.253 159.838 849.364 160.500C849.493 161.266 849.995 161.676 850.165 162.500C850.324 163.273 850.240 164.098 850.500 164.843L850.972 165.500C851.296 166.461 851.163 167.537 851.483 168.500L852.059 169.500C852.364 170.380 852.133 171.381 852.500 172.269C852.673 172.687 852.966 173.060 853.075 173.500C853.236 174.153 853.203 174.840 853.331 175.500C853.720 177.512 853.217 174.538 853.859 176.500C854.273 177.768 854.517 179.222 854.871 180.500C855.106 181.349 855.388 183.847 855.500 183.898C856.260 184.245 855.867 182.255 856.224 181.500C857.241 179.354 857.173 176.753 857.936 174.500L858.559 173.500C858.907 172.555 858.615 171.460 859.036 170.500C860.612 166.901 861.049 162.373 862.138 158.500C863.201 154.714 864.073 149.857 865.500 146.328C865.865 145.426 865.650 144.387 865.978 143.500L866.583 142.500C866.923 141.560 866.646 140.451 867.042 139.500C867.470 138.470 867.561 137.621 867.843 136.500C867.959 136.034 868.368 135.680 868.500 135.218C868.752 134.339 868.574 133.364 868.875 132.500L869.509 131.500C869.836 130.544 869.642 129.462 869.952 128.500L870.500 127.611C870.734 126.942 870.601 126.190 870.766 125.500C871.244 123.506 871.986 121.569 872.500 119.585C873.103 117.259 873.389 114.811 874.060 112.500C874.873 109.697 875.723 106.913 876.500 104.134C876.739 103.278 876.636 102.344 876.914 101.500L877.500 100.405C878.284 97.976 878.255 95.194 879.500 92.973C879.894 92.269 879.634 91.257 879.816 90.500C879.932 90.018 880.364 89.656 880.500 89.179C880.747 88.313 880.568 87.354 880.855 86.500L881.500 85.393C881.814 84.469 881.671 83.436 881.948 82.500C883.966 75.693 885.302 68.557 887.500 61.858C887.748 61.103 887.665 60.273 887.850 59.500C888.052 58.659 888.537 58.305 888.678 57.500C888.955 55.919 889.016 55.906 889.500 54.430C889.808 53.490 889.655 52.438 889.968 51.500L890.558 50.500C890.897 49.553 890.638 48.452 891.052 47.500L891.500 46.918C891.758 46.148 891.553 45.273 891.802 44.500L892.500 43.077C892.765 42.252 892.602 41.331 892.849 40.500C893.786 37.354 894.628 34.121 895.500 30.952C895.758 30.014 896.652 24.525 897.500 24.030C898.869 23.231 909.917 23.687 912.274 23.687L945.726 23.692L955.565 23.693C956.876 23.693 958.246 23.310 959.500 23.694C961.130 24.193 959.756 26.209 959.500 26.928C959.207 27.751 959.308 28.682 959.001 29.500C957.215 34.265 956.023 39.435 954.500 44.417C954.192 45.423 954.149 46.501 953.820 47.500C953.037 49.873 952.260 52.380 951.500 54.752C951.214 55.644 951.248 56.624 950.917 57.500C950.295 59.146 950.643 56.982 950.336 58.500C950.203 59.160 950.301 59.872 950.059 60.500L949.424 61.500C949.181 62.128 949.334 62.854 949.144 63.500C949.018 63.929 948.628 64.247 948.500 64.675C948.225 65.594 948.279 66.600 947.947 67.500L947.500 68.052C947.218 68.829 947.391 69.724 947.107 70.500L946.491 71.500C946.250 72.129 946.410 72.861 946.195 73.500C944.470 78.624 943.261 84.043 941.500 89.129C941.237 89.889 941.338 90.744 941.067 91.500L940.500 92.503C940.145 93.457 940.299 94.551 939.864 95.500C939.284 96.766 939.645 94.950 939.314 96.500C939.173 97.160 939.261 97.875 939.007 98.500C938.503 99.743 938.543 98.624 938.379 99.500C938.255 100.161 938.333 100.866 938.108 101.500C935.935 107.613 934.369 113.825 932.500 120.124C931.166 124.619 930.324 129.322 928.500 133.582C928.100 134.517 928.391 134.512 928.190 135.500C928.082 136.031 927.676 136.460 927.500 136.974C927.223 137.784 927.333 138.696 927.038 139.500L926.438 140.500C926.203 141.131 926.388 141.870 926.149 142.500L925.500 143.586C925.037 145.094 925.025 145.652 924.500 147.154C924.238 147.905 924.336 148.751 924.071 149.500L923.500 150.550L923.245 152.500L922.500 154.253C921.737 156.610 921.294 159.024 920.500 161.363C920.267 162.050 920.263 162.797 920.083 163.500C919.394 166.181 918.470 168.936 917.495 171.500C917.255 172.132 917.329 172.845 917.165 173.500C916.457 176.330 917.216 173.469 916.500 174.858C916.084 175.665 916.317 176.679 915.990 177.500C915.495 178.741 915.545 177.637 915.386 178.500C915.264 179.162 915.354 179.872 915.112 180.500L914.476 181.500C914.234 182.128 914.382 182.851 914.204 183.500C914.067 184.002 913.624 184.387 913.500 184.893C913.129 186.405 913.527 186.259 913.031 187.500C911.533 191.243 910.783 195.398 909.500 199.223C909.254 199.956 909.306 200.768 909.059 201.500C908.622 202.791 908.374 204.228 907.904 205.500C907.269 207.221 907.665 204.842 907.329 206.500C907.196 207.159 907.302 207.874 907.057 208.500L906.409 209.500C906.160 210.126 906.341 210.865 906.114 211.500C905.579 212.997 905.031 214.585 904.500 216.035C904.213 216.819 904.349 217.720 904.051 218.500L903.500 219.299C903.235 219.993 903.401 220.800 903.151 221.500L902.500 222.710L902.247 224.500C901.792 226.732 902.137 224.367 901.500 226.312C901.105 227.519 900.894 228.796 900.500 230.019C899.380 233.501 898.698 237.074 897.500 240.503C896.750 242.649 896.629 245.209 895.500 247.157C895.100 247.848 895.402 248.780 895.118 249.500L894.464 250.500C893.950 251.801 894.464 253.671 892.500 254.105ZM1005.500 254.136C1001.024 254.602 996.237 254.127 991.733 254.123L960.267 254.094L950.433 254.085C949.122 254.084 947.783 254.352 946.500 254.082L945.696 253.500C944.645 252.316 945.154 244.490 945.154 242.613L945.156 215.007L945.158 144.021L945.159 120.359C945.159 117.151 944.785 113.683 945.160 110.500C945.347 108.910 945.967 107.309 946.500 105.873C946.779 105.121 946.618 104.251 946.899 103.500L947.518 102.500C947.759 101.871 947.607 101.143 947.810 100.500L948.500 98.841C948.744 98.085 948.708 97.257 948.949 96.500C950.220 92.511 951.242 88.424 952.593 84.500C952.812 83.861 952.682 83.133 952.917 82.500C953.498 80.938 954.343 79.132 954.664 77.500C954.793 76.838 954.723 76.129 954.967 75.500L955.591 74.500C955.831 73.871 955.618 73.126 955.864 72.500L956.500 71.538C956.755 70.900 956.631 70.163 956.812 69.500C956.945 69.011 957.346 68.626 957.500 68.142C957.771 67.289 957.685 66.345 957.981 65.500L958.500 64.652C958.744 63.968 958.611 63.190 958.838 62.500C960.029 58.888 960.919 55.168 961.988 51.500C962.357 50.235 962.637 48.712 963.096 47.500C963.624 46.104 963.406 47.679 963.655 46.500C963.794 45.840 963.718 45.130 963.959 44.500C964.481 43.137 965.093 41.662 965.500 40.269C965.763 39.368 965.681 38.377 966.017 37.500L966.500 36.949C966.948 36.246 966.663 35.250 966.949 34.500L967.563 33.500C967.802 32.870 967.672 32.149 967.851 31.500C967.977 31.040 968.361 30.681 968.500 30.225C968.769 29.341 968.693 28.367 969.013 27.500L969.500 26.844C970.052 25.426 969.481 23.908 971.500 23.653C973.925 23.346 976.609 23.653 979.056 23.653L996.056 23.653C997.881 23.653 1005.284 23.187 1006.500 23.856C1007.742 24.539 1007.200 30.129 1007.200 31.474L1007.203 57.360L1007.211 164.886L1007.217 232.588L1007.218 248.518C1007.218 250.255 1008.089 253.866 1005.500 254.136ZM693.500 196.638C694.329 196.487 693.471 196.473 694.500 196.060C695.131 195.806 695.878 195.935 696.500 195.661L697.500 194.978C700.723 193.531 702.995 192.399 705.500 189.632C707.682 187.222 708.825 184.386 710.046 181.500C711.013 179.217 711.762 176.869 712.505 174.500C712.903 173.231 712.735 171.783 713.090 170.500C713.688 168.339 713.476 170.649 713.694 168.500C713.829 167.172 713.796 165.826 713.942 164.500C714.059 163.440 714.543 162.568 714.612 161.500C714.870 157.495 714.843 153.497 715.246 149.500C715.799 144.036 715.637 138.543 715.634 133.056C715.631 129.297 715.796 125.484 715.500 121.733C715.336 119.652 714.975 117.596 714.868 115.500C714.503 108.370 714.240 100.175 711.916 93.500C711.648 92.732 711.898 91.783 711.500 91.047C711.044 90.205 711.006 89.369 710.622 88.500C708.608 83.935 706.106 79.296 701.694 76.500C695.207 72.389 684.652 71.544 677.167 71.736C671.402 71.884 665.598 72.074 660.003 73.500C655.296 74.700 650.231 77.371 647.410 81.500C643.611 87.062 641.927 93.915 641.090 100.500C640.943 101.650 640.415 102.302 640.308 103.500C639.608 111.374 639.261 119.164 639.145 127.100C639.057 133.180 639.146 139.254 639.217 145.333C639.274 150.120 639.217 154.799 640.001 159.500C640.403 161.910 640.055 164.456 640.500 166.858C640.605 167.426 640.966 167.929 641.054 168.500C641.253 169.777 641.130 171.259 641.484 172.500L642.006 173.500C642.298 174.469 642.157 175.537 642.467 176.500L643.041 177.500C643.280 178.134 643.151 178.871 643.403 179.500C645.625 185.022 648.417 190.111 653.634 193.500C659.824 197.522 668.586 197.788 675.710 198.355C681.609 198.825 687.765 197.686 693.500 196.638Z" fill="#ffffff" fillRule="evenodd" fillOpacity="1" />
        </svg>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-8 z-30 flex justify-center px-4">
        <button
          type="button"
          onClick={handleStart}
          className="pointer-events-auto cursor-pointer rounded-full border border-white/25 bg-[#061c2e]/80 px-7 py-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#e58f68] hover:bg-[#0a2a43] hover:text-[#e58f68] active:scale-95"
        >
          Iniciar apresentação
        </button>
      </div>
    </div>
  );
}