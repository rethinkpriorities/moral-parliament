import * as Plot from "@observablehq/plot";
import { Suspense, useEffect, useRef } from "react";

interface PlotProps {
  options: Plot.PlotOptions;
}

export function ObservablePlot({ options }: PlotProps) {
  // Convenience component for creating a Plot (without handling the container)
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // console.log(options);  // Add this line
    const plot = Plot.plot(options);

    if (containerRef.current) {
      containerRef.current.append(plot);
    }
    return () => plot.remove();
  }, [options]);

  return (
    <Suspense fallback={<div />}>
      <div ref={containerRef} />
    </Suspense>
  );
}
