import { z } from "zod";
import { createGetCheckoutDetails, Errors, Result } from "@leto/core";
import { getAccommodationById, getUnitById } from "../../database";
import { RequestHandler } from "express";
import { parseRequest } from "../common/request-parser";
import { sendClientErrorResponse, sendServerErrorResponse, sendSuccessResponse } from "../common/response-presenter";

const getCheckoutDetails = createGetCheckoutDetails({
  getAccommodationById,
  getUnitById,
});

const RequestSchema = z.object({
  unitId: z.coerce.number(),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  rooms: z.coerce.number(),
});

export const getCheckoutDetailsHttpController: RequestHandler
  = async (httpRequest, httpResponse) => {
  const parseResult = parseRequest(RequestSchema, httpRequest, 'query');

  const responseResult = Result.map(parseResult, request => 
    getCheckoutDetails(request)
  );

  // This can be simplified with a function that can flip promise from wrapped
  // into wrapper. Yet to be written.
  Result.match(responseResult, {
    success: promiseResponse => {
      promiseResponse
        .then(response => {
          Result.match(response, {
            success: successValue => 
              sendSuccessResponse(httpResponse, successValue),
            failure: commonError => {
              Errors.match(commonError, {
                validationError: reason =>
                  sendClientErrorResponse(httpResponse, reason),
                unexpectedError: reason =>
                  sendServerErrorResponse(httpResponse, reason),
              })
            }
          });
        })
        .catch(error => sendServerErrorResponse(httpResponse, error))
    },
    failure: reason => 
      sendClientErrorResponse(httpResponse, reason),
  })
};
