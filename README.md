# AI Interface Prototype

A frontend-only prototype of an AI chat interface with multi-model support, theme toggle, prompt templates, and interactive chat features. Built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

---

## 1. Research

### Platforms Reviewed
1. **OpenAI Playground**  
   - Real-time AI chat interface with multiple model options.  
   - Standout features: Model selection, parameter controls, and responsive design.

2. **Hugging Face Spaces**  
   - Simplified UI for AI demos and sharing templates.  
   - Standout features: Template saving/loading, clean minimal interface.

3. **Claude UI (Anthropic)**  
   - Multi-model support with a modern chat interface.  
   - Standout features: Context-aware responses, collapsible chat history.

4. **Microsoft Copilot Lab**  
   - AI assistant integrated into workflows with parameter controls.  
   - Standout features: Sidebar panel for settings, responsive layout.

### Selected Features Implemented
- **Model Selector** – Choose between GPT-4, GPT-3.5, Claude-3, Gemini, Other.  
- **Prompt Editor** – Type messages with optional templates (mock JSON).  
- **Parameters Panel** – Sliders for temperature and max tokens (dummy for now).  
- **Chat/Output Area** – Displays messages with copy and JSON download options.  
- **Theme Toggle** – Light/dark mode persisted in `localStorage`.  
- **Responsive Layout** – Mobile through desktop breakpoints.  

---

## 2. Design

### Figma / Mockup
- **Figma Link:** [\[Insert your Figma or XD link here\] ](https://www.figma.com/design/waG7bBQoixgKM399QBGvI7/Untitled?node-id=0-1&m=dev&t=zSDXZjN5hqHocenl-1) 

### Tailwind Mapping
| Element                  | Tailwind Class(es) |
|---------------------------|------------------|
| Background (Light)       | `bg-gray-100`     |
| Background (Dark)        | `bg-gray-900`     |
| Primary Buttons           | `bg-blue-600 hover:bg-blue-700` |
| Chat Bubble (User)        | `bg-blue-500 text-white` |
| Chat Bubble (Assistant)   | `bg-gray-300 dark:bg-gray-800 text-black dark:text-white` |
| Font (Headings)           | `Geist Sans`      |
| Font (Code / Monospace)  | `Geist Mono`      |
| Spacing / Padding         | `p-3`, `p-4`, `gap-3` |

### Design-to-Code Translation
- Header contains **app title, model selector, and theme toggle**.  
- Chat messages dynamically rendered using **React state**, styled with Tailwind classes.  
- Copy / Download buttons appear on hover for assistant messages.  
- Input supports **Enter-to-send** with optional multi-line Shift+Enter.  
- Dark/Light theme toggles via a button, persisting state in `localStorage`.  

---

## 3. Development

### Key Components
| Component          | Description |
|-------------------|-------------|
| `ChatArea.tsx`     | Main chat interface, message rendering, input, send button, copy/download actions, theme toggle. |
| `ModelSelector.tsx` | Optional reusable component; manages model selection. |
| `route.ts`         | Mock API returning AI responses for `/api/models`. |
| `layout.tsx`       | Sets fonts, antialiasing, initial theme for `<html>` element. |

### State Management
- **React `useState`** handles messages, input, theme, and selected model.  
- **Theme persisted** in `localStorage` and applied to `<html>` and components.  
- Messages and selected model are dynamically updated.

### Mock API
- `/api/models` returns a mock AI response based on the last user message.  
- Example response:
```json

## Getting Started First, run the development server:3
bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open with your browser to see the result.
 [http://localhost:3000]

  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "🤖 Mock response to: 'Hello world'"
      }
    }
  ]
}
