export interface TweenVars {
  duration?: number;
  ease?: string;
  onComplete?: () => void;
  [key: string]: unknown;
}

export interface GsapTween {
  kill: () => void;
}

export const gsap = {
  to: (_target: unknown, _vars: TweenVars): GsapTween => ({ kill: () => undefined }),
  fromTo: (_target: unknown, _from: TweenVars, _to: TweenVars): GsapTween => ({ kill: () => undefined }),
};

export default gsap;
