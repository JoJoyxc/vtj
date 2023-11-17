import mitt from 'mitt';

export type Emitter = {
  on(type: string, listener: (...args: any[]) => void): void;
  off(type: string, listener: (...args: any[]) => void): void;
  emit(type: string, ...args: any[]): void;
  all: {
    clear(): void;
  };
};

export const emitter = mitt();
