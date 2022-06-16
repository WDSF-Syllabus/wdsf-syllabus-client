import { NoteCategory } from "./NoteCategory";

export interface Note {
  id: string;
  text: string;
  categories: Array<NoteCategory>;
}
