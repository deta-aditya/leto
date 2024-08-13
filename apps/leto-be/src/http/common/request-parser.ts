import { Request } from "express";
import { ZodError, ZodSchema } from "zod";
import { Result } from "@leto/core";

export function parseRequest<T>(
  schema: ZodSchema<T>, 
  httpRequest: Request,
  field: 'body' | 'query' | 'params'
): Result.Result<T, string>  {
  const parseResult = schema.safeParse(httpRequest[field]);
    
  if (!parseResult.success) {
    return Result.Failure(serializeError(parseResult.error)); 
  }

  return Result.Success(parseResult.data);
}

function serializeError<T>(zodError: ZodError<T>) {
  const issue = zodError.issues[0];
  return `Error on field "${issue.path.join('.')}": ${issue.message}`;
}
