// fix-imports.js
import fs from "fs";
import path from "path";

const projectRoot = "./src";

// ✅ Map of replacements (fix common bad imports)
const replacements = {
  "motion/react": "framer-motion",
  "class-variance-authority@": "class-variance-authority",
  "react-day-picker@": "react-day-picker",
  "lucide-react@": "lucide-react"
};

function fixImportsInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  // Remove version numbers (e.g. @1.2.3) and apply replacements
  for (const [bad, good] of Object.entries(replacements)) {
    if (content.includes(bad)) {
      content = content.replace(new RegExp(bad + "[0-9.]*", "g"), good);
      modified = true;
    }
  }

  // Also catch any generic "@x.y.z" version suffixes
  content = content.replace(/(["'])((?:@[a-zA-Z0-9-]+\/)?[a-zA-Z0-9-]+)@\d+(\.\d+)*\1/g, (_, quote, pkg) => {
    modified = true;
    return `${quote}${pkg}${quote}`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Fixed imports in: ${filePath}`);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith(".ts") || file.endsWith(".tsx") || file.endsWith(".js") || file.endsWith(".jsx")) {
      fixImportsInFile(filePath);
    }
  });
}

walkDir(projectRoot);
console.log("🎉 All imports checked and fixed!");
