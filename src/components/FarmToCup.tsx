import React, { useState } from 'react';
import { FARM_TO_CUP_STEPS } from '../data/coffeeData.ts';
import { Compass, Check } from 'lucide-react';

export const FarmToCup: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = FARM_TO_CUP_STEPS[activeStepIndex];

  return (
    <section id="journey" className="py-20 bg-[#0d0a08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching reference */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-bold tracking-widest text-[#e0a96d] uppercase flex items-center justify-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#e0a96d]" />
            <span>The Seed to Sip Lifecycle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f7f5ee] tracking-tight font-['Outfit']">
            Explore the Journey of Coffee, From Farm to Cup.
          </h2>
          <p className="text-sm sm:text-base text-[#a89b8c] leading-relaxed">
            Follow the meticulous path our beans travel — from the misty altitude of Karnataka’s Western Ghats to your freshly poured cup in Srinagar.
          </p>

          {/* Interactive Steps Progress Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-6">
            {FARM_TO_CUP_STEPS.map((step, idx) => (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                  activeStepIndex === idx
                    ? 'bg-[#1a1410] border-[#e0a96d] shadow-md'
                    : 'bg-[#130f0c] border-[#29201a] hover:border-[#3d3127]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-mono text-xs font-bold ${
                      activeStepIndex === idx ? 'text-[#e0a96d]' : 'text-[#736353]'
                    }`}
                  >
                    STEP {step.step}
                  </span>
                  {activeStepIndex === idx && (
                    <span className="w-2 h-2 rounded-full bg-[#e0a96d] animate-pulse" />
                  )}
                </div>
                <div
                  className={`text-xs font-semibold truncate ${
                    activeStepIndex === idx ? 'text-[#f7f5ee]' : 'text-[#a69888]'
                  }`}
                >
                  {step.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Stage Showcase */}
        <div className="bg-[#140e0b] border border-[#2b211a] rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Image */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#1a1410] border border-[#382a20] shadow-xl group">
                <img
                  src={activeStep.image}
                  alt={activeStep.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a08]/80 via-transparent to-transparent pointer-events-none" />

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-[#183f25]/90 backdrop-blur-md text-[#f7f5ee] border border-[#2a663d] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow">
                  <Check className="w-3.5 h-3.5 text-[#54c47a]" />
                  <span>{activeStep.badge}</span>
                </div>
              </div>
            </div>

            {/* Description & Metrics */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-4xl font-black text-[#e0a96d]">
                  {activeStep.step}
                </span>
                <span className="text-sm font-semibold text-[#8c7d6e] uppercase tracking-wider">
                  / 04 Journey Phase
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#f7f5ee] font-['Outfit']">
                {activeStep.title}
              </h3>

              <div className="text-xs font-medium text-[#e0a96d] bg-[#1f1712] border border-[#382b20] px-3 py-1.5 rounded-lg inline-block">
                📍 {activeStep.location}
              </div>

              <p className="text-sm sm:text-base text-[#b8aba0] leading-relaxed">
                {activeStep.description}
              </p>

              {/* Progress Step Navigation */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#382b20] bg-[#1a1410] text-[#c9bdaf] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  ← Previous Step
                </button>
                <button
                  disabled={activeStepIndex === FARM_TO_CUP_STEPS.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(FARM_TO_CUP_STEPS.length - 1, prev + 1))}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#e0a96d] text-[#0d0a08] hover:bg-[#ecc089] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Next Step →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
