export default function () {
  return Promise.resolve({
    json: () => Promise.resolve({ results: { earth: [[0, 0, 0]], moon: [[0, 0, 1]] } }),
  });
}
