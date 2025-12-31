import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";
import { Heart } from "lucide-react";

// Asset imports
// Note: In a real environment, we'd use the @assets alias.
// If TypeScript complains, we might need a declaration file, but for now we'll assume it works or use direct paths if needed.
// For this environment, we'll try the @assets alias as instructed.
import letterBg from "@assets/image_1767208023770.png";
import finalBg from "@assets/image_1767208041902.png";
import bgmFile from "@assets/The_Stranglers_~_Golden_Brown_(But_it’s_the_best_part_looped)__1767208187616.mp3";

// Text content
const letterText =
  " Sweeetie ye saal khtm hourha, aur alhamdulillah mere paas tm hou! Thank you, mera din, mera saal, meri life puuri achhi banane ke liye! Meri har subh har shaam har raat banane ke liye! Thank you mere jaise tough insaan ko pyaar krne ke liye! Mera dil tarr hou jaata hai tmse! Mai promise krta hun tmse, mai next year isse bhi zyaada pyaar krnga tmko kyunki honestly mere paas koi aur choice bhi nii hai, jitna dekhta hun jitna Tmhre paas hota hun jitna pyaar krta hun jitna mehsuus krta hun tmko utna hi aur bhi duubta jaata hun Tmhre andr aisa lgta hai! Toh agle saal hi nii, har din aur har saal pehle se bhi zyaada pyaar krnga tmko kyunki tmhi life hou meri jaan! Happy New Year! ";

export default function Home() {
  const [stage, setStage] = useState<
    "initial" | "opening" | "reading" | "final"
  >("initial");
  const [typedText, setTypedText] = useState("");
  const [play, { stop }] = useSound(bgmFile, { loop: true, volume: 0.5 });

  // Typewriter effect
  useEffect(() => {
    if (stage === "reading") {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < letterText.length) {
          setTypedText((prev) => prev + letterText[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => setStage("final"), 3000); // Wait 3s before showing final screen
        }
      }, 50); // Speed of typing

      return () => clearInterval(interval);
    }
  }, [stage]);

  const handleOpen = () => {
    setStage("opening");
    play();

    // Simulate opening animation duration
    setTimeout(() => {
      setStage("reading");
    }, 1500);
  };

  return (
    <div className="min-h-[100dvh] w-full overflow-hidden bg-pink-50 text-foreground relative font-sans">
      <AnimatePresence mode="wait">
        {/* STAGE 1: CLOSED ENVELOPE */}
        {stage === "initial" && (
          <motion.div
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-rose-100 to-pink-200"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="relative"
            >
              <div className="w-64 h-48 bg-white shadow-xl rounded-lg flex items-center justify-center border-t-8 border-rose-300 transform rotate-[-2deg]">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-rose-200 rounded-lg" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleOpen}
                  className="bg-rose-500 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 hover:bg-rose-600 transition-colors z-10"
                >
                  <Heart className="fill-current" /> Click Me
                </motion.button>
              </div>
            </motion.div>
            <p className="mt-8 text-rose-800 font-serif italic text-lg opacity-80">
              A letter for you my sweeetie...
            </p>
          </motion.div>
        )}

        {/* STAGE 2: OPENING ANIMATION (Handled via exit of stage 1 and entry of stage 3 for simplicity, or we could add a specific animation) */}

        {/* STAGE 3: READING THE LETTER */}
        {stage === "reading" && (
          <motion.div
            key="reading"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col p-6 items-center justify-start overflow-y-auto"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${letterBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="max-w-md w-full mt-10 mb-10 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-2xl">
              <p className="text-white text-lg leading-relaxed font-serif whitespace-pre-wrap">
                {typedText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-5 bg-rose-400 ml-1 align-middle"
                />
              </p>
            </div>
          </motion.div>
        )}

        {/* STAGE 4: FINAL REVEAL */}
        {stage === "final" && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 flex flex-col items-center justify-end pb-20"
            style={{
              backgroundImage: `url(${finalBg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="relative z-10 text-center p-6 max-w-sm"
            >
              <h1 className="text-3xl font-bold text-white mb-4 drop-shadow-lg font-serif">
                Happy New Year to us
              </h1>
              <p className="text-xl text-rose-200 font-medium italic">
                Habiba & Safdar Forever
              </p>

              <div className="mt-8 flex justify-center gap-4">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0 }}
                >
                  <Heart className="text-rose-500 fill-rose-500 w-8 h-8" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                >
                  <Heart className="text-rose-400 fill-rose-400 w-6 h-6" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, delay: 0.2 }}
                >
                  <Heart className="text-rose-600 fill-rose-600 w-10 h-10" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
