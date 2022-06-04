import { useEffect, useState, useRef } from "react";
import { projectsList } from "../components/data";
import Head from "next/head";
import IntroOverlay from "../components/introOverlay";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home({ project }) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const projectsRef = useRef(null);

  const completeAnimation = () => {
    setAnimationComplete(true);
    document.body.style.overflowY = "auto";
  };

  const executeScroll = () => projectsRef.current.scrollIntoView();

  const scrollToProject = () => {
    if (typeof window !== "undefined") {
      if (project) {
        // Use the hash to find the first element with that id
        const element = document.getElementById(project);

        if (element) {
          // Smooth scroll to that elment
          element.scrollIntoView();
        }
      }
    }
  };

  useEffect(() => {
    // Inner Page height for mobile devices
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // GSAP animation
    gsap.registerPlugin(ScrollTrigger);
    let tl = gsap.timeline();
    let projects = gsap.utils.toArray(".project");
    let mediaQuery = window.matchMedia("(min-width: 967px)");

    const homeAnimation = (animation) => {
      if (!project) {
        tl.to(".ball", {
          duration: 2,
          y: "100vh",
          ease: "bounce.out",
        })
          .to(".ball", {
            duration: 1,
            scale: 30,
            ease: "power3.out",
            onComplete: animation,
          })
          .from(".after-animation", {
            duration: 0.8,
            opacity: 0,
            ease: "power3.out",
          })
          .from(".title", {
            duration: 0.5,
            y: 100,
            delay: 0.2,
            opacity: 0,
            ease: "power3.out",
          })
          .from(".peep-image", {
            duration: 0.5,
            y: 100,
            opacity: 0,
            ease: "power3.out",
          })
          .from(".job-title", {
            duration: 0.5,
            y: 100,
            opacity: 0,
            ease: "power3.out",
          })
          .from(".scroll-indicator", {
            duration: 0.5,
            y: 100,
            opacity: 0,
            ease: "power3.out",
          });
      } else {
        completeAnimation();
        scrollToProject();
      }

      if (mediaQuery.matches) {
        projects.forEach((project) => {
          let tlProject = gsap.timeline({
            scrollTrigger: {
              trigger: project,
              start: "top center",
              end: "center center",
              scrub: 1,
            },
          });
          let projectImage = project.querySelector("img");
          let projectInfo = project.querySelector(".project-info");

          tlProject
            .from(projectImage, {
              x: -300,
              opacity: 0,
            })
            .from(projectInfo, {
              x: 300,
              opacity: 0,
            });
        });
      } else {
        projects.forEach((project) => {
          let tlProject = gsap.timeline({
            scrollTrigger: {
              trigger: project,
              start: "top center",
              end: "center center",
              scrub: 1,
            },
          });
          let projectImage = project.querySelector("img");
          let projectInfo = project.querySelector(".project-info");

          tlProject
            .from(projectImage, {
              y: 100,
              opacity: 0,
            })
            .from(projectInfo, {
              y: 100,
              opacity: 0,
            });
        });
      }

      let tlFooter = gsap.timeline({
        scrollTrigger: {
          trigger: "footer",
          start: "top center",
          end: "top top",
          scrub: 1,
        },
      });

      tlFooter
        .from("footer h2", {
          y: 100,
          opacity: 0,
          duration: 0.6,
        })
        .from("footer .footer-links", {
          y: 100,
          opacity: 0,
          duration: 0.6,
        });
    };

    homeAnimation(completeAnimation);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container"
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Portfolio for Sose Sahakian"
        ></meta>
        <meta property="og:url" content="https://agrattan.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        <meta property="og:image" content="/agrattan_OG.png" />
        <title>Sose Sahakian | Software Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {animationComplete === false && <IntroOverlay />}
      <div className="after-animation">
      <Header />

        <main className="main-home">
          <div className="cta">
            <h1 className="title">
              I create<span className="playful"> playful </span> experiences.
            </h1>
            <img
              src="/images/My_Peep.png"
              alt="My Peep"
              className="peep-image"
            />
          </div>

          <p className="job-title">
            <span className="text-reveal">
              Sose Sahakian / Software Developer
            </span>
          </p>
          <button className="scroll-indicator" onClick={executeScroll}>
            <span>Projects</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </main>
        <div className="project-container" ref={projectsRef}>
          {projectsList.map(
            ({
              name,
              description,
              longDescription,
              image,
              mobileImage,
              link,
              project,
              GitHub,
              tools,
              i,
            }) => (
              <div className="project" key={i} id={project}>
                <Link href={project}>
                  <picture>
                    <source srcSet={image} media="(min-width: 1280px)" />
                    <img
                      className="project-image"
                      src={mobileImage}
                      alt={name}
                    />
                  </picture>
                </Link>
                <div className="project-info">
                  <Link href={project}>
                    <h2>{name}</h2>
                  </Link>
                  {description.split("\n").map((str, index) => (
                    <p key={index}>{str}</p>
                  ))}
                  {longDescription && (
                    <Link href={project}>
                      <button className="project-read-more">
                        <span>Read More</span>{" "}
                        <div className="read-more-arrow">
                          {/* <FontAwesomeIcon icon={faChevronRight} /> */}
                        </div>
                      </button>
                    </Link>
                  )}
                  <h3>Tools used:</h3>
                  <ul className="tools-list">
                    {tools.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <motion.div className="project-btns">
                    <motion.a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={`Open site of ${name}`}
                      className="project-btn"
                    >
                      Open Site
                    </motion.a>
                    {GitHub && (
                      <motion.a
                        href={GitHub}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={`View Code for ${name}`}
                        className="project-btn"
                      >
                        View Code
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </div>
            )
          )}
        </div>
        <Footer />
      </div>
    </motion.div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  const project = query?.project ?? false;

  return {
    props: {
      project,
    }, // will be passed to the page component as props
  };
}
