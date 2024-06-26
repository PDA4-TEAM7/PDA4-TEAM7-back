export const removeBackslashesAndQuotes = (value: string) => {
  // 백슬래시와 따옴표를 찾아서 제거
  return value.replace(/\\|"/g, "");
};
