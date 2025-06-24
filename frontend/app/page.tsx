import Hero from "@/components/hero/Hero";
import Problems from "@/components/problems/Problems";  
import Leaderboard from "@/components/leaderboard/Leaderboard";
import Profile from "@/components/profile/Profile";
import CodeEditor from "@/components/code-editor/CodeEditor";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
        <>
          <Hero />
          <Problems />
          <Leaderboard />
          <Profile />
          <CodeEditor />
          <Footer />
        </>
      );
}
