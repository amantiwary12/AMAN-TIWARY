import React, { useState, useEffect } from "react";
import Card from "../../UI/Card/Card";
import mind from "../../Accest/mind.png";
import secure from "../../Accest/secure.png";
// import other images as needed

const MultiC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Mind Strategy",
      description: "Tour Package Website",
      bgImage: mind,
      tags: ["React", "Tailwind", "GSAP"],
      link: "https://mind-strategys.vercel.app/",
      featured: true
    },
    {
      id: 2,
      title: "Secure Sphere",
      description: "Security Solutions Platform",
      bgImage: secure,
      tags: ["React", "Firebase", "CSS"],
      link: "https://secure-sphere-rosy.vercel.app/",
      featured: true
    },
    {
      id: 3,
      title: "Apple Vision Pro",
      description: "UI Clone Experience",
      bgImage: mind, // Replace with actual image
      tags: ["React", "Three.js", "Framer"],
      link: "#",
      featured: false
    },
    {
      id: 4,
      title: "Project Four",
      description: "E-Commerce Solution",
      bgImage: secure, // Replace with actual image
      tags: ["Next.js", "Stripe", "MongoDB"],
      link: "#",
      featured: false
    }
  ];

  return (
    <div className="w-full flex justify-center items-start py-12 bg-gradient-to-b from-transparent to-gray-900/20">
      <div className="w-full max-w-7xl p-4 sm:p-6 lg:p-8">
        {/* Section Header */}
        <div className={`text-center mb-12 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A collection of my recent work showcasing my skills in frontend development and UI/UX design
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`group relative rounded-3xl overflow-hidden transform transition-all duration-700 hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project Card */}
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-blue-500/20 transition-all duration-500">
                <Card 
                  username={project.title} 
                  bgImage={project.bgImage} 
                  template="" 
                />
                
                {/* Overlay on Hover */}
                <div className="absolute hover:bg-black inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* View Project Button */}
                  <a
                    href={project.link}
                    target={project.link !== "#" ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-white text-sm font-medium hover:text-blue-300 transition-colors"
                  >
                    View Project
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>
                
                
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}

      </div>
    </div>
  );
};

export default MultiC;