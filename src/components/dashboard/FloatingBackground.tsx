export const FloatingBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-[0.02] select-none overflow-hidden z-0">
      <div className="absolute top-[5%] left-[8%] text-[10rem] font-light text-foreground whitespace-nowrap animate-float glass-text">
        SERA
      </div>
      <div className="absolute top-[15%] right-[12%] text-[7rem] font-light text-foreground whitespace-nowrap animate-float-delay-1 glass-text">
        AI POWERED
      </div>
      <div className="absolute top-[30%] left-[20%] text-[8rem] font-light text-foreground whitespace-nowrap animate-float-delay-2 glass-text">
        ROUTINES
      </div>
      <div className="absolute top-[50%] right-[5%] text-[6rem] font-light text-foreground whitespace-nowrap animate-float-delay-3 glass-text">
        SERA
      </div>
      <div className="absolute top-[65%] left-[10%] text-[9rem] font-light text-foreground whitespace-nowrap animate-float glass-text">
        AI POWERED
      </div>
      <div className="absolute top-[80%] right-[15%] text-[7rem] font-light text-foreground whitespace-nowrap animate-float-delay-1 glass-text">
        ROUTINES
      </div>
      <div className="absolute top-[40%] left-[40%] text-[8rem] font-light text-foreground whitespace-nowrap animate-float-delay-3 glass-text">
        SERA
      </div>
    </div>
  );
};
