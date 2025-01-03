const chatbotController = {
    conversationHistory: {}, // 사용자별 대화 히스토리 저장
  
    getHealthAdvice: async (req, res) => {
      try {
        console.log("Received request body:", req.body);
        const { userId, message, role } = req.body;
  
        if (!message || !userId) {
          return res.status(400).json({ error: "Message and userId are required" });
        }
  
        // 시스템 메시지 설정
        let systemMessage = "You are a helpful assistant.";
        if (role === "fitness") {
          systemMessage = "You are a fitness trainer. Provide expert advice.";
        } else if (role === "nutrition") {
          systemMessage = "You are a nutrition expert. Help users with meal plans.";
        }
  
        // 사용자 대화 히스토리 초기화
        if (!this.conversationHistory[userId]) {
          this.conversationHistory[userId] = [
            { role: "system", content: systemMessage },
          ];
        }
  
        // 히스토리에 사용자 메시지 추가
        this.conversationHistory[userId].push({ role: "user", content: message });
  
        // OpenAI API 호출
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: this.conversationHistory[userId],
          max_tokens: 150, // 응답 길이 제한
          temperature: 0.7, // 응답의 창의성 조정
        });
  
        const reply = response.data.choices[0].message.content;
  
        // 히스토리에 모델의 응답 추가
        this.conversationHistory[userId].push({ role: "assistant", content: reply });
  
        res.status(200).json({ reply });
      } catch (error) {
        if (error.response) {
          console.error("OpenAI API Response Error:", error.response.data);
          res.status(500).json({ error: error.response.data });
        } else {
          console.error("OpenAI API Request Error:", error.message);
          res.status(500).json({ error: "Failed to fetch response from OpenAI API" });
        }
      }
    },
  };
  
  module.exports = chatbotController;