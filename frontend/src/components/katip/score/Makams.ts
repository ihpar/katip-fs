import Makam from "models/Makam";

const MAKAMS: Makam[] = [
  new Makam(
    "acem_asiran",
    "Acemaşîran",
    "acemasiran.svg",
    "acemasiran_dark.svg",
    ["si+4-b:5"],
    ["acemaşîran", "acemaşiran", "acemasiran"],
  ),
  new Makam(
    "acem_kurdi",
    "Acemkürdî",
    "acemkurdi.svg",
    "acemkurdi_dark.svg",
    ["si+4-b:5"],
    ["acemkürdî", "acemkürdi", "acemkurdi"],
  ),
  new Makam(
    "bestenigar",
    "Bestenigâr",
    "bestenigar.svg",
    "bestenigar_dark.svg",
    ["si+4-b:1", "re+5-b:4"],
    ["bestenigâr", "bestenigar"],
  ),
  new Makam(
    "beyati",
    "Beyâtî",
    "beyati.svg",
    "beyati_dark.svg",
    ["si4-b:1"],
    ["beyâtî", "beyatî", "beyati"],
  ),
  new Makam(
    "beyati_araban",
    "Beyâtî Araban",
    "beyati-araban.svg",
    "beyati-araban_dark.svg",
    ["si+4-b:1", "mi+5-b:4", "fa+5-d:4"],
    ["beyâtî araban", "beyati araban"],
  ),
  new Makam(
    "hicaz",
    "Hicaz",
    "hicaz.svg",
    "hicaz_dark.svg",
    ["si+4-b:4", "fa+5-d:4", "do+5-d:4"],
    ["hicaz"],
  ),
  new Makam(
    "nihavent",
    "Nihâvent",
    "nihavent.svg",
    "nihavent_dark.svg",
    ["si+4-b:5", "mi+5-b:5"],
    ["nihâvent", "nihavent"],
  ),
  new Makam(
    "ussak",
    "Uşşak",
    "ussak.svg",
    "ussak_dark.svg",
    ["si+4-b:1"],
    ["uşşak", "ussak"],
  ),
];
export const DEFAULT_MAKAM = MAKAMS.find((makam) => makam.id === "hicaz")!;
export default MAKAMS;
