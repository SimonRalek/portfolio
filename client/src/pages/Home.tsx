import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeSection from "@/components/HomeSection";
import AboutSection from "@/components/AboutSection";
import ResumeSection from "@/components/ResumeSection";
import ProjectsSection from "@/components/ProjectsSection";
import ScrollToTop from "@/components/ScrollToTop";
import { Helmet } from "react-helmet";

export default function Home() {
  // Add smooth scroll behavior for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Jane Doe | Professional Portfolio</title>
        <meta name="description" content="Professional portfolio of Jane Doe, a software developer specializing in web development and data analytics." />
        <meta property="og:title" content="Jane Doe | Professional Portfolio" />
        <meta property="og:description" content="Professional portfolio of Jane Doe, a software developer specializing in web development and data analytics." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <Header />
      
      <main className="pt-20">
        <HomeSection />
        <AboutSection />
        <ResumeSection />
        <ProjectsSection />
      </main>
      
      <Footer />
      <ScrollToTop />
    </>
  );
}
