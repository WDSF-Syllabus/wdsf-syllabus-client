import { Dance } from "./Dance";
import { Position } from "./Position";
import { Timing } from "./Timing";
import { Note } from "./Note";
import { FootPlacement } from "./FootPlacement";
import { Foot } from "./Foot";

export interface Figure {
  id: string;
  dance: Dance;
  name: string;
  startPositions: Array<Position>;
  endPositions: Array<Position>;
  timings: Array<Timing>;
  notes: Array<Note>;
  slug: string;
  startFootPlacements: Array<FootPlacement>;
  endFootPlacements: Array<FootPlacement>;
  startFoot: Foot;
  endFoot: Foot;
}
