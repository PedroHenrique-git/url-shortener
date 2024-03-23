import * as uuid from "https://deno.land/std@0.207.0/uuid/mod.ts";

export function shortUUID() {
  return uuid.v1.generate().toString().split("-").at(0) ?? "";
}
