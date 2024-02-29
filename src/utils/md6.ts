import { createHash } from "crypto";

export function MD6(input: string) {
    return createHash("md5").update(btoa(encodeURIComponent(input))).digest("hex");
}