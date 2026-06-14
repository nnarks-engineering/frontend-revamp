/**
 * Shared router types — single source of truth for route path typing.
 *
 * Import `RoutePath` anywhere you need to type a `<Link to={...}>` prop
 * instead of inline `as any` casts.
 *
 * The type is extracted from TanStack Router's generated `FileRouteTypes`.
 */
import type { FileRouteTypes } from "@/routeTree.gen";

/** Every valid `to` path registered in the router. */
export type RoutePath = FileRouteTypes["to"];
