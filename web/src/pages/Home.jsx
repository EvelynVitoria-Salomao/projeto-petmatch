import PreviewPetList from "../components/PreviewPetList";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = ()=>{
    return (
        <main>
          <PreviewPetList/>
          <About />
          <Contact />
          <Footer />
        </main>
      );
}

export default Home