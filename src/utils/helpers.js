import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

export const parseDescription = (description) => {
  return documentToPlainTextString(description);
};