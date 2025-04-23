
// AI service for text summarization - in a real app, this would call DeepSeek or another API
export const aiService = {
  summarizeText: async (text: string): Promise<string> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Simple mock summarization
    if (!text || text.length < 20) {
      return "Text is too short to summarize.";
    }
    
    // For demo purposes, we'll create a simplistic summary
    // In a real app, this would call an AI API like DeepSeek
    const sentences = text
      .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
      .split("|");
    
    if (sentences.length <= 2) {
      return sentences[0].trim();
    }
    
    // Take first sentence and one from the middle
    const summary = [
      sentences[0],
      sentences[Math.floor(sentences.length / 2)],
    ]
      .filter(s => s && s.trim().length > 0)
      .map(s => s.trim())
      .join(' ');
    
    return summary;
  },
};
