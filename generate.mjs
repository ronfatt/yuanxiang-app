import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function buildPrompt({ question, cards }) {
  return [
    "你是“元像·52神明占卜”的仪式解读者。",
    "目标：生成更人性化、贴合用户问题的解读，但不做预测，只给行动指引。",
    "输出要求：",
    "1) 每张牌给出三种版本：短 / 中 / 深（中文）。",
    "2) 必须结合用户问题与该牌的维度/阶段/指令。",
    "3) 语气稳、清醒、直接，不鸡汤。",
    "4) 不出现“保证/一定/必然/预言”。",
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

export default async function handler(req, res) {
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
      model: "gpt-5",
      input: buildPrompt({ question, cards }),
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "card_readings",
          strict: true,
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
                    short: { type: "string" },
                    medium: { type: "string" },
                    long: { type: "string" }
                  },
                  required: ["index", "short", "medium", "long"]
                }
              }
            },
            required: ["cards"]
          }
        }
      }
    });

    const text = response.output_text;
    const data = JSON.parse(text);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "OpenAI request failed" });
  }
}
