// services/navigation.ts
// Type-safe route helpers for Expo Router navigation.
// These avoid TS errors when navigating to routes that Expo Router's
// type system doesn't know about yet.

import { router, Href } from 'expo-router';

type RouteParams = Record<string, string | number | boolean | undefined>;

/**
 * Navigate to a route with optional params.
 * Uses type assertion to avoid strict route type checks for dynamic routes.
 */
export function navigateTo(route: string, params?: RouteParams) {
  if (params) {
    const paramString = Object.entries(params)
      .filter(([_, v]) => v !== undefined)
      .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
      .join('&');

    const href = paramString ? `${route}?${paramString}` : route;
    router.push(href as Href);
  } else {
    router.push(route as Href);
  }
}

/**
 * Replace the current route (no back navigation).
 */
export function replaceTo(route: string, params?: RouteParams) {
  if (params) {
    const paramString = Object.entries(params)
      .filter(([_, v]) => v !== undefined)
      .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
      .join('&');

    const href = paramString ? `${route}?${paramString}` : route;
    router.replace(href as Href);
  } else {
    router.replace(route as Href);
  }
}