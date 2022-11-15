declare global {
  interface Window {
    Sk: any;
  }
}

const getSkulpt = () => {
  if (typeof window !== "undefined") {
    return window.Sk;
  }
  return null;
};

export default getSkulpt;
