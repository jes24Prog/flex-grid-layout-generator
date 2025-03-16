
import React from 'react';
import GridGenerator from '../components/GridGenerator';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-secondary/30">
      <header className="py-6 px-6 md:px-10 border-b border-border/50 backdrop-blur-sm bg-white/80 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-medium tracking-tight">FLex Grid Layout Generator</h1>
          {/* <div className="hidden md:flex items-center space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </a>
          </div> */}
        </div>
      </header>
      
      <main className="flex-1 px-6 md:px-10 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-medium tracking-tight mb-3">Design Your Layout</h2>
            <p className="text-muted-foreground max-w-3xl">
              Design custom grid or flex layouts and generate code in your preferred format.
            </p>
          </div>
          
          <GridGenerator />
        </div>
      </main>
      
      <footer className="py-6 px-6 md:px-10 border-t border-border/50 backdrop-blur-sm bg-white/80">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-muted-foreground text-center">
            {/* Layout Generator — For creating responsive layouts with Grid and Flex. */}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
