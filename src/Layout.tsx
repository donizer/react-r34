import "./scss/Layout.scss";
import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Gallery from "./components/Gallery";
import Overlay from "./components/Overlay";
import placeholder from "./assets/giphy.gif";

export interface Ir34Json {
  preview_url: string;
  sample_url: string;
  file_url: string;
  directory: number;
  hash: string;
  width: number;
  height: number;
  id: number;
  image: string;
  change: number;
  owner: string;
  parent_id: number;
  rating: string;
  sample: boolean;
  sample_height: number;
  sample_width: number;
  score: number;
  tags: string;
  source: string;
  status: string;
  has_notes: boolean;
  comment_count: number;
}

const baseURL =
  "https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=ai_generated+rating:safe";

function Layout() {
  const [json, setJson] = useState<Ir34Json[]>([]);
  const [isOverlayActive, setOverlayActive] = useState(false);
  const [overlayClass, setOverlayClass] = useState<string>("");
  const [currImage, setCurrImage] = useState<string | undefined>(placeholder);
  const [timer, setTimer] = useState(0);
  const [overlayItem, setOverlayItem] = useState<Ir34Json | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchJson() {
      const response = await fetch(baseURL);
      const result = await response.json();
      setJson(result);
    }
    fetchJson();
    const intervalId = setInterval(() => {
      setTimer(timer + 1);
    }, (1000 * 60) / 4);
    return () => clearInterval(intervalId);
  }, [timer]);

  useEffect(() => {
    document.querySelector("body")!.classList.toggle("stop-scrolling");
  }, [isOverlayActive]);

  return (
    <div className={`wrapper `}>
      <Navigation />
      <Gallery
        items={json}
        overlayItem={overlayItem}
        setOverlayItem={setOverlayItem}
        isOverlayActive={isOverlayActive}
        setOverlayActive={setOverlayActive}
        currImage={currImage}
        setCurrImage={setCurrImage}
        overlayClass={overlayClass}
        setOverlayClass={setOverlayClass}
      />
      <Overlay
        currImage={currImage}
        setCurrImage={setCurrImage}
        overlayItem={overlayItem}
        setOverlayItem={setOverlayItem}
        isOverlayActive={isOverlayActive}
        setOverlayActive={setOverlayActive}
        overlayClass={overlayClass}
        setOverlayClass={setOverlayClass}
      />
    </div>
  );
}

export default Layout;
