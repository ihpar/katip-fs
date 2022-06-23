import Usul from "models/Usul";

const USULS = [
  new Usul("aksak_9_4", "Aksak", 9, 4, ["aksak"]),
  new Usul("aksak_semai_10_4", "Aksak Semâî", 10, 4, ["aksak semâî", "aksak semai", "aksak semaî"]),
  new Usul("duyek_8_8", "Düyek", 8, 8, ["düyek", "duyek"]),
  new Usul("nim_sofyan_2_4", "Nim Sofyan", 2, 4, ["nim sofyan"]),
  new Usul("nim_sofyan_2_8", "Nim Sofyan", 2, 8, ["nim sofyan"]),
  new Usul("raks_aksagi_9_8", "Raks Aksağı", 9, 8, ["raks aksağı", "raks aksaği", "raks aksagi"]),
  new Usul("semai_3_4", "Semâî", 3, 4, ["semâî", "semai"]),
  new Usul("semai_3_8", "Semâî", 3, 8, ["semâî", "semai"]),
  new Usul("sofyan_4_8", "Sofyan", 4, 8, ["sofyan"]),
  new Usul("sofyan_4_4", "Sofyan", 4, 4, ["sofyan"]),
  new Usul("sofyan_4_2", "Sofyan", 4, 2, ["sofyan"]),
  new Usul("turk_aksagi_5_4", "Türk Aksağı", 5, 4, ["türk aksağı", "türk aksagi", "turk aksagi"]),
  new Usul("turk_aksagi_5_8", "Türk Aksağı", 5, 8, ["türk aksağı", "türk aksagi", "turk aksagi"]),
];

export const DEFAULT_USUL = USULS.find((usul) => usul.id === "sofyan_4_4")!;
export default USULS;
