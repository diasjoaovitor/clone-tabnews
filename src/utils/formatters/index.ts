export const formatUsername = (text: string) =>
  text.normalize('NFD').replace(/[^a-zA-Z0-9]/g, '')
