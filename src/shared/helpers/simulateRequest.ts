export const simulateRequest = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const success = Math.random() >= 0.01;
      resolve(success);
    }, 1000);
  });
};
