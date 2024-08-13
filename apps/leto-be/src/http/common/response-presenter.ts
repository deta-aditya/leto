import { Response } from "express";

export function sendSuccessResponse<T>(httpResponse: Response, data: T) {
  httpResponse.status(200).json(data);
}

export function sendClientErrorResponse<T>(httpResponse: Response, error: T) {
  httpResponse.status(400).json(error);
}

export function sendServerErrorResponse<T>(httpResponse: Response, error: T) {
  console.error(error);
  httpResponse.status(500).json(
    'Whoops, an error has occurred when processing your request. Please try again!'
  );
} 
