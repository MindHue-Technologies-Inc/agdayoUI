/// <reference types="astro/client" />

// This file extends the Astro `App.Locals` interface to include your custom user type.

declare namespace App {
  interface Locals {
    // Define the shape of your authenticated user object
    user: {
      uid: string;
      email: string;
      displayName: string;
      photoURL: string;
    } | null; // The user can also be null if unauthenticated

    // You can also add other custom properties here if your middleware sets them
    // isAuthenticated: boolean;
  }
}
