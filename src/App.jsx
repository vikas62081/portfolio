import { BrowserRouter } from "react-router-dom";

import {
  Contact,
  Achievements,
  Experiences,
  Educations,
  Hero,
  Navbar,
  Skills,
  StarsCanvas,
  Content,
  Projects,
} from "./components";
import { ResumeProvider } from "./context";

const App = () => {
  return (
    <div>
      <ResumeProvider>
        <BrowserRouter>
          <div className="relative z-0 bg-primary">
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
              <Navbar />
              <Hero />
            </div>
            <Content />
            <Educations />
            <Projects />
            <Experiences />
            <Achievements />
            <Skills />
            <div className="relative z-0">
              <Contact />
              <StarsCanvas />
            </div>
          </div>
        </BrowserRouter>
      </ResumeProvider>
    </div>
  );
};

export default App;
