import { z } from "zod";
import { RequestHandler } from "express";
import { createGetAccommodationDetails, Option, Result } from "@leto/core";

import { getAccommodationById, getUnitsByAccommodationId } from "../../database";
import { sendClientErrorResponse, sendServerErrorResponse, sendSuccessResponse } from "../common/response-presenter";
import { parseRequest } from "../common/request-parser";

const getAccommodationDetails = createGetAccommodationDetails({
  getAccommodationById,
  getUnitsByAccommodationId,
});

const RequestSchema = z.object({
  accommodationId: z.coerce.number(),
});

export const getAccommodationDetailsHttpController: RequestHandler
  = async (httpRequest, httpResponse) => {
  const parseResult = parseRequest(RequestSchema, httpRequest, 'params');

  const responseResult = Result.map(parseResult, getAccommodationDetails);

  Result.match(responseResult, {
    success: response => {
      response
        .then(maybeResponse => {
          Option.match(maybeResponse, {
            some: details => sendSuccessResponse(httpResponse, details),
            none: () => sendClientErrorResponse(httpResponse, 'Accommodation not found!'),
          });
        })
        .catch(error => {
          sendServerErrorResponse(httpResponse, error);
        });
    },
    failure: reason =>
      sendClientErrorResponse(httpResponse, reason),
  });
}
