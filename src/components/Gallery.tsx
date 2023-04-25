import "../scss/Gallery.scss";
import Card from "./Card";

import { Ir34Json } from "../Layout";

function Gallery(props: {
  items: Ir34Json[];
  overlayItem: Ir34Json | undefined;
  setOverlayItem: React.Dispatch<React.SetStateAction<Ir34Json | undefined>>;
  isOverlayActive: boolean;
  setOverlayActive: React.Dispatch<React.SetStateAction<boolean>>;
  currImage: string | undefined;
  setCurrImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  overlayClass: string;
  setOverlayClass: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      <main className={`main`}>
        {props.items != undefined &&
          props.items.map((localItem) => {
            return (
              <Card
                key={localItem.id}
                localItem={localItem}
                overlayItem={props.overlayItem}
                setOverlayItem={props.setOverlayItem}
                isOverlayActive={props.isOverlayActive}
                setOverlayActive={props.setOverlayActive}
                currImage={props.currImage}
                setCurrImage={props.setCurrImage}
                overlayClass={props.overlayClass}
                setOverlayClass={props.setOverlayClass}
              />
            );
          })}
      </main>
    </>
  );
}

export default Gallery;
