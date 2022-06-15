import { Usul } from "models/Usul";

const USULS = [
  new Usul("duyek_9_4", "Aksak", 9, 4),
  new Usul("duyek_8_8", "Düyek", 8, 8),
  new Usul("nim_sofyan_2_4", "Nim Sofyan", 2, 4),
  new Usul("nim_sofyan_2_8", "Nim Sofyan", 2, 8),
  new Usul("raks_aksagi_9_8", "Raks Aksağı", 9, 8),
  new Usul("semai_3_4", "Semâî", 3, 4),
  new Usul("semai_3_8", "Semâî", 3, 8),
  new Usul("sofyan_4_8", "Sofyan", 4, 8),
  new Usul("sofyan_4_4", "Sofyan", 4, 4),
  new Usul("sofyan_4_2", "Sofyan", 4, 2),
  new Usul("turk_aksagi_5_4", "Türk Aksağı", 5, 4),
  new Usul("turk_aksagi_5_8", "Türk Aksağı", 5, 8),
];

export const DEFAULT_USUL = USULS.find(usul => usul.id === "sofyan_4_4")!;
export default USULS;