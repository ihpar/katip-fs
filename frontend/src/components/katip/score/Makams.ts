import Makam from "models/Makam";

const MAKAMS: Makam[] = [
  new Makam("acem_asiran", "Acemaşîran", "acemasiran.svg", "acemasiran_dark.svg", ["si+4-b:5"]),
  new Makam("acem_kurdi", "Acemkürdî", "acemkurdi.svg", "acemkurdi_dark.svg", ["si+4-b:5"]),
  new Makam("bestenigar", "Bestenigâr", "bestenigar.svg", "bestenigar_dark.svg", ["si+4-b:1", "re+5-b:4"]),
  new Makam("beyati", "Beyâtî", "beyati.svg", "beyati_dark.svg", ["si4-b:1"]),
  new Makam("beyati_araban", "Beyâtî Araban", "beyati-araban.svg", "beyati-araban_dark.svg", ["si+4-b:1", "mi+5-b:4", "fa+5-d:4"]),
  new Makam("hicaz", "Hicaz", "hicaz.svg", "hicaz_dark.svg", ["si+4-b:4", "fa+5-d:4", "do+5-d:4"]),
  new Makam("nihavent", "Nihâvent", "nihavent.svg", "nihavent_dark.svg", ["si+4-b:5", "mi+5-b:5"]),
  new Makam("ussak", "Uşşak", "ussak.svg", "ussak_dark.svg", ["si+4-b:1"]),
];
export const DEFAULT_MAKAM = MAKAMS.find((makam) => makam.id === "hicaz")!;
export default MAKAMS;
