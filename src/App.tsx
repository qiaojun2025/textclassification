/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  LayoutGrid, 
  MessageSquare, 
  Send,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  FileText
} from 'lucide-react';

type Difficulty = 'Easy' | 'Medium' | 'Complex';

interface Review {
  text: string;
  sentiment: 'Positive' | 'Negative';
}

const REVIEWS: Record<Difficulty, Review[]> = {
  Easy: [
    { text: "Great movie! Highly recommended.", sentiment: "Positive" },
    { text: "Waste of time. Don't watch it.", sentiment: "Negative" },
    { text: "Brilliant acting and great plot.", sentiment: "Positive" },
    { text: "Boring and predictable story.", sentiment: "Negative" },
    { text: "A true masterpiece of cinema.", sentiment: "Positive" },
    { text: "Terrible script and poor direction.", sentiment: "Negative" },
    { text: "Loved every minute of it!", sentiment: "Positive" },
    { text: "Not my cup of tea at all.", sentiment: "Negative" },
    { text: "Fantastic visuals and great sound.", sentiment: "Positive" },
    { text: "I fell asleep halfway through.", sentiment: "Negative" }
  ],
  Medium: [
    { text: "The acting was superb, but the plot felt a bit rushed in the second half. Overall a decent watch for a weekend.", sentiment: "Positive" },
    { text: "I expected more from this director. The visuals are stunning but the story is hollow and unengaging for most of the runtime.", sentiment: "Negative" },
    { text: "A solid performance by the lead actor saves what would otherwise be a very mediocre script. Worth it for the ending.", sentiment: "Positive" },
    { text: "Too many plot holes and unnecessary characters. It tries to be deep but ends up being confusing and frustrating.", sentiment: "Negative" },
    { text: "The chemistry between the leads is electric, making the somewhat predictable romance feel fresh and exciting.", sentiment: "Positive" },
    { text: "While the action sequences are well-choreographed, the lack of character development makes it hard to care about the outcome.", sentiment: "Negative" },
    { text: "A surprisingly touching story that manages to avoid most of the usual genre tropes. A hidden gem for sure.", sentiment: "Positive" },
    { text: "The dialogue is incredibly cheesy and the special effects look dated even for a movie made ten years ago.", sentiment: "Negative" },
    { text: "It starts slow but builds into a powerful climax that will leave you thinking for days. Definitely worth the wait.", sentiment: "Positive" },
    { text: "The pacing is all over the place, and the tonal shifts between comedy and drama are jarring and ineffective.", sentiment: "Negative" }
  ],
  Complex: [
    { text: "A profound exploration of human nature set against a backdrop of cosmic indifference. While some might find the pacing slow, the deliberate unfolding of the narrative allows for deep character development that is rarely seen in modern blockbusters. The ending is particularly haunting and thought-provoking.", sentiment: "Positive" },
    { text: "Despite the high production values and an A-list cast, the film fails to deliver on its promising premise. The dialogue is often clunky and the motivations of the secondary characters are never fully explained, leading to a confusing and ultimately unsatisfying climax that feels earned by none of the preceding events.", sentiment: "Negative" },
    { text: "An intricate tapestry of emotions and visual splendor. The director manages to balance multiple storylines with grace, culminating in a finale that is both emotionally resonant and intellectually stimulating. It's a rare film that demands multiple viewings to fully appreciate its depth.", sentiment: "Positive" },
    { text: "The film attempts to tackle complex philosophical themes but ultimately gets bogged down in its own self-importance. The non-linear structure feels more like a gimmick to hide a thin plot rather than a necessary narrative choice, leaving the audience feeling more exhausted than enlightened by the time the credits roll.", sentiment: "Negative" },
    { text: "A breathtaking cinematic achievement that pushes the boundaries of the medium. The seamless integration of practical effects and CGI creates an immersive world that feels both alien and strangely familiar. It's a testament to the power of visionary storytelling and meticulous craftsmanship.", sentiment: "Positive" },
    { text: "While the cinematography is undeniably beautiful, it cannot compensate for a script that is both derivative and emotionally distant. The characters feel like archetypes rather than real people, and their struggles fail to evoke any genuine empathy, resulting in a cold and sterile viewing experience.", sentiment: "Negative" },
    { text: "A masterclass in suspense and psychological depth. The director uses shadow and silence to create a palpable sense of dread that lingers long after the film has ended. The lead performance is nothing short of transformative, capturing the character's descent into madness with chilling precision.", sentiment: "Positive" },
    { text: "The movie suffers from an identity crisis, unsure if it wants to be a gritty political thriller or a high-octane action flick. This indecision results in a disjointed narrative that fails to satisfy on either front, leaving the viewer with a sense of missed potential and wasted talent.", sentiment: "Negative" },
    { text: "A vibrant and energetic celebration of life and culture. The soundtrack is infectious, and the performances are filled with such genuine joy that it's impossible not to be swept up in the film's infectious spirit. It's a rare example of a movie that is both deeply personal and universally appealing.", sentiment: "Positive" },
    { text: "The plot relies far too heavily on convenient coincidences and illogical character choices to drive the story forward. By the third act, the narrative has completely unraveled, leading to a conclusion that feels forced and unearned, undermining whatever goodwill the film had managed to build up initially.", sentiment: "Negative" }
  ]
};

type View = 'Difficulty' | 'Task';

export default function App() {
  const [view, setView] = useState<View>('Difficulty');
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentReviews = difficulty ? REVIEWS[difficulty] : [];
  const currentReview = currentReviews[currentIndex];
  const totalTasks = currentReviews.length;

  const handleChoice = (choice: string) => {
    if (showFeedback || !currentReview) return;

    const isCorrect = choice === currentReview.sentiment;
    if (isCorrect) {
      setScore(s => s + 1);
      setShowFeedback('correct');
    } else {
      setShowFeedback('incorrect');
    }

    setTimeout(() => {
      setShowFeedback(null);
      if (currentIndex < totalTasks - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  const skipTask = () => {
    if (currentIndex < totalTasks - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const startTask = (diff: Difficulty) => {
    setDifficulty(diff);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setView('Task');
  };

  const reset = () => {
    setView('Difficulty');
    setDifficulty(null);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setShowFeedback(null);
  };

  const goBack = () => {
    if (view === 'Task') setView('Difficulty');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] font-sans flex flex-col overflow-hidden">
      {/* Status Bar Mockup */}
      <div className="px-6 pt-4 pb-2 flex justify-between items-center text-xs opacity-60">
        <span>16:13</span>
        <div className="flex gap-1 items-center">
          <div className="w-4 h-2 bg-white/40 rounded-sm" />
          <span>5G</span>
          <span>32</span>
        </div>
      </div>

      {/* Header */}
      <header className="px-4 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className={`p-1 -ml-1 active:opacity-50 transition-opacity ${view === 'Difficulty' ? 'opacity-0 pointer-events-none' : ''}`}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center">
              <LayoutGrid className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-medium">Data Contribution Center</h1>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <AnimatePresence mode="wait">
          {view === 'Difficulty' && (
            <motion.div 
              key="difficulty"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Chat History */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-end">
                  <div className="bg-[#2C2C2E] text-white px-8 py-3 rounded-full text-sm font-medium border border-white/5 opacity-50">
                    Text
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex-shrink-0 flex items-center justify-center">
                    <LayoutGrid className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-[#1C1C1E] rounded-2xl p-4 max-w-[85%] shadow-xl">
                    <p className="text-[15px] leading-relaxed">Please select a difficulty level.</p>
                  </div>
                </div>
              </div>

              {/* Difficulty Options */}
              <div className="flex flex-col gap-3 pt-4">
                <button 
                  onClick={() => startTask('Easy')}
                  className="w-full bg-[#1C1C1E] text-white py-4 rounded-2xl font-medium border border-white/5 active:bg-[#2C2C2E] transition-colors"
                >
                  Easy
                </button>
                <button 
                  onClick={() => startTask('Medium')}
                  className="w-full bg-[#1C1C1E] text-white py-4 rounded-2xl font-medium border border-white/5 active:bg-[#2C2C2E] transition-colors"
                >
                  Medium
                </button>
                <button 
                  onClick={() => startTask('Complex')}
                  className="w-full bg-[#1C1C1E] text-white py-4 rounded-2xl font-medium border border-white/5 active:bg-[#2C2C2E] transition-colors"
                >
                  Complex
                </button>
                <button 
                  className="w-full bg-[#1C1C1E] text-white py-4 rounded-2xl font-medium border border-white/5 active:bg-[#2C2C2E] transition-colors opacity-60"
                >
                  Back to previous level
                </button>
              </div>
            </motion.div>
          )}

          {view === 'Task' && (
            <motion.div
              key="task"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {!isFinished ? (
                <div className="bg-[#1C1C1E] rounded-3xl p-6 border border-white/5 shadow-2xl relative overflow-hidden">
                  {/* Progress */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs opacity-40 uppercase tracking-wider font-medium">
                        Task Progress {currentIndex + 1}/{totalTasks}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 bg-brand/20 text-brand rounded-full font-bold">
                        {difficulty}
                      </span>
                    </div>
                    <button onClick={() => setView('Difficulty')}>
                      <X className="w-5 h-5 opacity-40" />
                    </button>
                  </div>

                  <h2 className="text-lg font-medium mb-6 text-center">
                    Please judge the sentiment of this sentence (select one).
                  </h2>

                  {/* Review Text Area */}
                  <div className="bg-[#2C2C2E] rounded-2xl p-6 mb-8 min-h-[140px] flex items-center justify-center text-center">
                    <p className="text-[17px] leading-relaxed italic text-white/90">
                      "{currentReview?.text}"
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <button
                      onClick={() => handleChoice('Positive')}
                      disabled={!!showFeedback}
                      className={`flex flex-col items-center justify-center gap-2 py-5 rounded-2xl transition-all active:scale-95 ${
                        showFeedback === 'correct' && currentReview?.sentiment === 'Positive'
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                          : showFeedback === 'incorrect' && currentReview?.sentiment !== 'Positive'
                          ? 'bg-rose-500/10 border-rose-500/30 opacity-50'
                          : 'bg-[#2C2C2E] border border-white/5 hover:bg-[#3A3A3C]'
                      }`}
                    >
                      <ThumbsUp className="w-6 h-6" />
                      <span className="text-sm font-medium">Positive</span>
                    </button>
                    <button
                      onClick={() => handleChoice('Negative')}
                      disabled={!!showFeedback}
                      className={`flex flex-col items-center justify-center gap-2 py-5 rounded-2xl transition-all active:scale-95 ${
                        showFeedback === 'correct' && currentReview?.sentiment === 'Negative'
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                          : showFeedback === 'incorrect' && currentReview?.sentiment !== 'Negative'
                          ? 'bg-rose-500/10 border-rose-500/30 opacity-50'
                          : 'bg-[#2C2C2E] border border-white/5 hover:bg-[#3A3A3C]'
                      }`}
                    >
                      <ThumbsDown className="w-6 h-6" />
                      <span className="text-sm font-medium">Negative</span>
                    </button>
                  </div>

                  {/* Skip Link */}
                  <div className="text-center">
                    <button 
                      onClick={skipTask}
                      className="text-sm text-[#3B82F6] hover:underline opacity-80"
                    >
                      Skip this task
                    </button>
                  </div>

                  {/* Feedback Overlay */}
                  <AnimatePresence>
                    {showFeedback && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-[#1C1C1E]/80 backdrop-blur-sm z-10"
                      >
                        <div className="flex flex-col items-center gap-3">
                          {showFeedback === 'correct' ? (
                            <>
                              <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                              <span className="text-xl font-bold text-emerald-500">Correct</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-16 h-16 text-rose-500" />
                              <span className="text-xl font-bold text-rose-500">Incorrect</span>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#1C1C1E] rounded-3xl p-8 border border-white/5 shadow-2xl text-center"
                >
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Task Completed!</h2>
                  <p className="opacity-60 mb-8">
                    You have completed the <span className="text-brand font-bold">{difficulty}</span> set.
                    <br />
                    Accuracy: <span className="text-white font-bold">{Math.round((score / totalTasks) * 100)}%</span>
                  </p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => startTask(difficulty!)}
                      className="w-full bg-[#3B82F6] text-white py-4 rounded-2xl font-bold active:scale-95 transition-transform"
                    >
                      Restart Level
                    </button>
                    <button 
                      onClick={reset}
                      className="w-full bg-[#2C2C2E] text-white py-4 rounded-2xl font-bold opacity-60"
                    >
                      Back to Home
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-[11px] text-center opacity-30 mt-4">
          All uploaded content requires dual manual and AI review.
        </p>
      </main>

      {/* Bottom Input Area Mockup */}
      <div className="px-4 py-4 border-t border-white/5 bg-[#0A0A0A]">
        <div className="bg-[#1C1C1E] rounded-full px-5 py-3 flex items-center gap-3 shadow-lg">
          <MessageSquare className="w-5 h-5 opacity-40" />
          <input 
            type="text" 
            placeholder="How can I help you?" 
            className="flex-1 bg-transparent border-none outline-none text-sm placeholder:opacity-40"
            disabled
          />
          <div className="flex items-center gap-3">
            <MoreHorizontal className="w-5 h-5 opacity-40" />
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <Send className="w-4 h-4 opacity-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
