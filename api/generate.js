const OpenAI = require("openai");

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function buildPrompt({ question, cards }) {
  return [
    "你是“元像·52神明占卜”的仪式解读者。",
    "目标：生成更人性化、贴合用户问题的解读，但不做预测，只给行动指引。",
    "输出要求：",
    "1) 每张牌输出四段：",
    "  A) 为什么会出现这张牌·这个神明（必须包含 频率/状态/共振 等词汇，禁止出现“随机/抽到了/因为你抽到”）",
    "  B) 你已经知道的",
    "  C) 你正在经历的（必须出现“正在”）",
    "  D) 你必须面对的（必须包含“如果你继续……”并给出明确行动指令：断 / 看 / 做 / 稳）",
    "2) 必须结合用户问题与该牌的维度/阶段/指令。",
    "3) 额外输出九宫总解读三档：短 / 中 / 深。",
    "4) 语气稳、清醒、直接，不鸡汤。",
    "5) 不出现“保证/一定/必然/预言”。",
    "",
    `用户问题：${question}`,
    "",
    "牌列表（index / 位置 / 维度 / 阶段 / 指令）：",
    ...cards.map(
      (c) =>
        `${c.index} | ${c.position} | ${c.dimension} | ${c.stage} | ${c.directive} | ${c.deity}`
    )
  ].join("\n");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { question, cards } = body;
    if (!question || !Array.isArray(cards) || cards.length === 0) {
      res.status(400).json({ error: "Invalid payload" });
      return;
    }

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: buildPrompt({ question, cards }),
      text: {
        format: {
          type: "json_schema",
          name: "card_readings",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              cards: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    index: { type: "number" },
                    reason: { type: "string" },
                    known: { type: "string" },
                    present: { type: "string" },
                    must: { type: "string" }
                  },
                  required: ["index", "reason", "known", "present", "must"]
                }
              },
              summary: {
                type: "object",
                additionalProperties: false,
                properties: {
                  short: { type: "string" },
                  medium: { type: "string" },
                  long: { type: "string" }
                },
                required: ["short", "medium", "long"]
              }
            },
            required: ["cards", "summary"]
          }
        }
      }
    });

    const text = response.output_text;
    const data = JSON.parse(text);
    res.status(200).json(data);
  } catch (err) {
    console.error("OpenAI error:", err);
    const message =
      err?.error?.message ||
      err?.response?.data?.error?.message ||
      err?.message ||
      "OpenAI request failed";
    res.status(500).json({ error: message });
  }
};
