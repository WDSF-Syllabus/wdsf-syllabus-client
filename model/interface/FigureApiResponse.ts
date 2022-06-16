import { ApiResponse } from "./ApiResponse";
import { ApiData } from "./ApiData";
import { Dance } from "./Dance";
import { Position } from "./Position";
import { Timing } from "./Timing";
import { NoteCategory } from "./NoteCategory";
import { FootPlacement } from "./FootPlacement";
import { Foot } from "./Foot";

export interface FigureApiResponse {
  id: string;
  attributes: {
    dance: ApiResponse<ApiData<Dance>>;
    name: string;
    startPositions: ApiResponse<Array<ApiData<Position>>>;
    endPositions: ApiResponse<Array<ApiData<Position>>>;
    timings: ApiResponse<Array<ApiData<Timing>>>;
    notes: ApiResponse<
      Array<
        ApiData<{
          id: string;
          text: string;
          categories: ApiResponse<Array<ApiData<NoteCategory>>>;
        }>
      >
    >;
    slug: string;
    startFootPlacements: ApiResponse<Array<ApiData<FootPlacement>>>;
    endFootPlacements: ApiResponse<Array<ApiData<FootPlacement>>>;
    startFoot: ApiResponse<ApiData<Foot>>;
    endFoot: ApiResponse<ApiData<Foot>>;
  };
}
