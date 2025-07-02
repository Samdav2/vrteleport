// src/app/page.js

// We import our new client component.
import VrTeleportClient from "./components/vrGallery";

export default function Home() {
  return (
    // The main container takes up the full screen.
    <main className="w-full h-screen">
      {/*
        We simply render our VrTeleportClient component.
        This component now handles all the client-side logic for loading
        the A-Frame scene, keeping our main page clean and compliant
        with Next.js rules.
      */}
      <VrTeleportClient />
    </main>
  );
}
