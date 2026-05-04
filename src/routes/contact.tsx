import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/landing/nav/NavBar";
import LandingFooter from "@/components/landing/sections/footer/section";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen font-poppins text-foreground selection:bg-primary/30">
      <Navbar />
      <div className="pt-32 pb-20 px-4 md:px-6 max-w-3xl mx-auto min-h-[70vh]">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <p className="text-foreground/70 mb-8">Get in touch with our team for any inquiries or support.</p>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" className="w-full p-2 border border-foreground/10 rounded-lg bg-background" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full p-2 border border-foreground/10 rounded-lg bg-background" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea className="w-full p-2 border border-foreground/10 rounded-lg bg-background min-h-[150px]"></textarea>
          </div>
          <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium">Send Message</button>
        </form>
      </div>
      <LandingFooter />
    </div>
  );
}
