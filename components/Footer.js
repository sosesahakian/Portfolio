import React from 'react'
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

function Footer() {
  return (
    <footer>
    <h2>Connect with Me</h2>
    <ul className="footer-links">
      <li>
        <motion.a
          href="https://drive.google.com/file/d/1PgvpHThs5XjTwGZgib9ZTVLa8QbhulWp/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Download Sose's Resume"
        >
          Resume
        </motion.a>
      </li>
      <li>
        <motion.a
          href="https://github.com/sosesahakian"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Go to Sose's GitHub"
        >
          <i className='fab fa-github fa-fw fa-2x'></i>
          <span className="footer-hidden-text">GitHub</span>
        </motion.a>
      </li>
      <li>
        <motion.a
          href="https://www.linkedin.com/in/sose-sahakian/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Connect with Sose on LinkedIn"
        >
          <i className='fab fa-linkedin fa-fw fa-2x'></i>
          <span className="footer-hidden-text">GitHub</span>
        </motion.a>
      </li>
    </ul>
  </footer>
  )
}

export default Footer