import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import secure from "../../Accest/secure.png";
import { SkeletonImage } from "../../Component/Skeleton/Skeleton";

const SecureSphere = () => {
  const project = {
    title: "Secure Sphere",
    description: "Security Solutions Platform",
    fullDescription: "Secure Sphere is a comprehensive security solutions platform that provides real-time monitoring, threat detection, and security analytics. Built with React and Firebase, it offers a seamless experience for managing security operations.",
    image: secure,
    tags: ["React", "Firebase", "TailwindCSS", "Real-time"],
    link: "https://secure-sphere-rosy.vercel.app/",
    github: "https://github.com/yourusername/secure-sphere",
    features: [
      "Real-time security monitoring",
      "Threat detection algorithms",
      "User authentication & authorization",
      "Dashboard with analytics",
      "Alert system for threats",
      "Historical data tracking"
    ],
    technologies: [
      { name: "React", description: "Frontend framework for dynamic UI" },
      { name: "Firebase", description: "Backend services including auth and real-time database" },
      { name: "TailwindCSS", description: "Styling and responsive design" },
      { name: "Chart.js", description: "Data visualization and analytics" }
    ],
    challenges: [
      {
        title: "Real-time Data Synchronization",
        description: "Ensuring all users see live updates without performance degradation"
      },
      {
        title: "Security Implementation",
        description: "Implementing robust authentication and data protection"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d0c0a] via-[#131210] to-[#0d0c0a] pt-24 pb-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[50vh] overflow-hidden"
      >
        <SkeletonImage
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-[#0d0c0a]/50 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300"
          >
            {project.description}
          </motion.p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Overview */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Overview</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            {project.fullDescription}
          </p>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Technologies Used</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.technologies.map((tech, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
              >
                <h3 className="text-xl font-semibold text-[#e0b464] mb-2">{tech.name}</h3>
                <p className="text-gray-400">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 10 }}
                className="flex items-center space-x-3 text-gray-300"
              >
                <svg className="w-5 h-5 text-[#8fb27c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-[#ee5b2e] text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
          >
            View Code
          </a>
          <Link
            to="/projects"
            className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
          >
            Back to Projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default SecureSphere;