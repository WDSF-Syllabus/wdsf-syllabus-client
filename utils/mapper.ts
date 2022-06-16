import { Figure } from "../model/interface/Figure";
import { flattenApiData } from "./flattenApiData";
import { FigureApiResponse } from "../model/interface/FigureApiResponse";

const fromFigureApiResponseToFigure = ({
  id,
  attributes,
}: FigureApiResponse): Figure => ({
  id,
  dance: flattenApiData(attributes.dance.data),
  name: attributes.name,
  startPositions: attributes.startPositions.data.map(flattenApiData),
  endPositions: attributes.endPositions.data.map(flattenApiData),
  timings: attributes.timings.data.map(flattenApiData),
  notes: attributes.notes.data.map((noteApiResponse) => ({
    id: noteApiResponse.id,
    text: noteApiResponse.attributes.text,
    categories: noteApiResponse.attributes.categories.data.map(flattenApiData),
  })),
  slug: attributes.slug,
  startFootPlacements: attributes.startFootPlacements.data.map(flattenApiData),
  endFootPlacements: attributes.endFootPlacements.data.map(flattenApiData),
  startFoot: flattenApiData(attributes.startFoot.data),
  endFoot: flattenApiData(attributes.endFoot.data),
});

export const mapper = {
  fromFigureApiResponseToFigure: fromFigureApiResponseToFigure,
};
