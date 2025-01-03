const chatbotController = {
    conversationHistory: {}, // 사용자별 대화 히스토리 저장
  
    getHealthAdvice: async (req, res) => {
      try {
        console.log("Received request body:", req.body);
        const { userId, message, role } = req.body;
  
        // 요청 데이터 검증
        if (!userId || typeof userId !== "string") {
          return res.status(400).json({ error: "Valid userId is required." });
        }
        if (!message || typeof message !== "string") {
          return res.status(400).json({ error: "Valid message is required." });
        }
        if (!role || (role !== "fitness" && role !== "nutrition")) {
          return res.status(400).json({ error: "Valid role (fitness or nutrition) is required." });
        }
  
        // 시스템 메시지 설정
        const systemMessage =
          role === "fitness"
            ? "You are a fitness trainer. Provide expert advice."
            : "You are a nutrition expert. Help users with meal plans.";
  
        // 사용자 대화 히스토리 초기화
        if (!chatbotController.conversationHistory[userId]) {
          chatbotController.conversationHistory[userId] = [
            { role: "system", content: systemMessage },
          ];
        }
  
        // 히스토리에 사용자 메시지 추가
        chatbotController.conversationHistory[userId].push({ role: "user", content: message });
  
        // OpenAI API 호출 전 디버깅
        console.log("Sending to OpenAI API:", {
          model: "gpt-3.5-turbo",
          messages: chatbotController.conversationHistory[userId],
          max_tokens: 150,
          temperature: 0.7,
        });
  
        // OpenAI API 호출
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: chatbotController.conversationHistory[userId],
          max_tokens: 150,
          temperature: 0.7,
        });
  
        let reply = "No response received.";
        if (
          response.data &&
          response.data.choices &&
          response.data.choices[0] &&
          response.data.choices[0].message &&
          response.data.choices[0].message.content
        ) {
          reply = response.data.choices[0].message.content;
        }
  
        // 히스토리에 모델의 응답 추가
        chatbotController.conversationHistory[userId].push({ role: "assistant", content: reply });
  
        // 히스토리 길이 제한
        const MAX_HISTORY_LENGTH = 10;
        if (chatbotController.conversationHistory[userId].length > MAX_HISTORY_LENGTH) {
          chatbotController.conversationHistory[userId] = chatbotController.conversationHistory[userId].slice(-MAX_HISTORY_LENGTH);
        }
  
        res.status(200).json({ reply });
      } catch (error) {
        console.error("Error with OpenAI API:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch response from OpenAI API" });
      }
    },
  };
  
  module.exports = chatbotController;