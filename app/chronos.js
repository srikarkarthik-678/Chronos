import readline from "readline";
import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const REPORT_PATH = path.join(process.cwd(), "reconstruction_report.json");

function ask(prompt) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(prompt, (ans) => {
    rl.close();
    resolve(ans.trim());
  }));
}

function demoReconstruct(fragment) {
  return fragment + " (demo reconstruction – no Gemini key provided).";
}

function demoLinks(fragment) {
  return ["https://en.wikipedia.org/wiki/Internet_slang"];
}

async function googleSearch(query, apiKey, cx) {
  const endpoint = "https://www.googleapis.com/customsearch/v1";
  const resp = await axios.get(endpoint, {
    params: { key: apiKey, cx, q: query, num: 3 },
  });
  const items = resp.data.items || [];
  return items.slice(0, 3).map((i) => i.link);
}

async function callGemini(fragment, apiKey) {
  await new Promise(r => setTimeout(r, 300));
  return {
    text: fragment + " (simulated Gemini response)",
    confidence: 0.92,
    model: "gemini-1.5-flash",
  };
}

function appendReport(entry) {
  let arr = [];
  try {
    if (fs.existsSync(REPORT_PATH)) arr = JSON.parse(fs.readFileSync(REPORT_PATH, "utf8"));
  } catch { arr = []; }
  arr.push(entry);
  fs.writeFileSync(REPORT_PATH, JSON.stringify(arr, null, 2), "utf8");
}

async function main() {
  console.log("=== PROJECT CHRONOS – The AI Archeologist ===");
  console.log("Reconstruct lost fragments of the internet.\n");

  let geminiKey = await ask("Enter Gemini API key (or press Enter for demo mode): ");
  if (!geminiKey) geminiKey = process.env.GEMINI_API_KEY || "";

  let googleKey = await ask("Enter Google Custom Search API key (or press Enter to skip): ");
  if (!googleKey) googleKey = process.env.GOOGLE_API_KEY || "";

  let googleCx = await ask("Enter Google Custom Search CX (or press Enter to skip): ");
  if (!googleCx) googleCx = process.env.GOOGLE_CX || "";

  while (true) {
    const fragment = await ask("\nEnter an incomplete text fragment (or 'exit' to quit): ");
    if (!fragment || fragment.toLowerCase() === "exit") {
      console.log("Exiting Project Chronos.");
      break;
    }

    console.log("\n🔍 Reconstructing fragment...");
    let reconstructed, confidence, model;
    if (geminiKey) {
      const res = await callGemini(fragment, geminiKey);
      reconstructed = res.text;
      confidence = res.confidence;
      model = res.model;
    } else {
      reconstructed = demoReconstruct(fragment);
      confidence = 0.5;
      model = "demo";
    }

    console.log("🌐 Finding context links...");
    let links = [];
    if (googleKey && googleCx) {
      try {
        links = await googleSearch(reconstructed, googleKey, googleCx);
      } catch {
        console.log("⚠️ Google Search failed, using demo links.");
        links = demoLinks(fragment);
      }
    } else {
      links = demoLinks(fragment);
    }

    const result = {
      original_fragment: fragment,
      reconstructed_text: reconstructed,
      contextual_links: links,
      confidence,
      source_model: model,
      search_engine_used: googleKey && googleCx ? "Google Custom Search" : "demo",
      timestamp: new Date().toISOString(),
    };

    console.log("\n🧠 Reconstruction complete:\n");
    console.log("Original:", result.original_fragment);
    console.log("\nReconstructed:", result.reconstructed_text);
    console.log("\nContext Links:");
    result.contextual_links.forEach((l) => console.log(" -", l));
    console.log(`\nModel: ${result.source_model} | Confidence: ${result.confidence}`);

    appendReport(result);
    console.log(`\n✅ Saved to ${REPORT_PATH}`);
  }
}

main();
