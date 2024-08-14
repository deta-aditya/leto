import { z } from "zod";
import { RequestHandler } from "express";

import { createGetAccommodations, Option, Result } from "@leto/core";
import {
  getAccommodationsByPattern,
  getMinimumUnitRatesByAccommodationsIds,
  getRandomlyOrderedAccommodations
} from "../../database";
import { 
  sendClientErrorResponse, 
  sendSuccessResponse, 
} from "../common/response-presenter";
import { parseRequest } from "../common/request-parser";
import { getRandomIntegerOfRange } from "../../random";

const getAccommodations = createGetAccommodations({
  getAccommodationsByPattern,
  getMinimumUnitRatesByAccommodationsIds,
  getRandomlyOrderedAccommodations,
  getRandomIntegerOfRange,
});

const RequestSchema = z.object({
  searchQuery: z.string().optional(),
});

export const getAccommodationsHttpController: RequestHandler 
  = async (httpRequest, httpResponse) => {
  const parseResult = parseRequest(RequestSchema, httpRequest, 'query');

  const responseResult = Result.map(parseResult, request => getAccommodations({
    searchQuery: Option.fromNullable(request.searchQuery),
  }));

  Result.match(responseResult, {
    success: async response => 
      sendSuccessResponse(httpResponse, await response),
    failure: async reason => 
      sendClientErrorResponse(httpResponse, reason),
  })
};
