from fastmcp import FastMCP
from tkinter import simpledialog

mcp = FastMCP("Fate-Another-Pretender-MCP")

@mcp.tool(
    name = "human_in_the_loop",
    description = "人在回路系统。当遇到无法自行判断的状况时，可以调用此工具向用户提问并获取答案。\n" +
                  "每次请求此工具时，请确保问题简洁明了，可以被简短地回答。\n" +
                  "如果一个问题包含多个子问题，请尝试将其拆分。\n"
)
def human_in_the_loop(question: str) -> str:
    return simpledialog.askstring("人在回路", question) or ""

if __name__ == "__main__":
    mcp.run(transport="streamable-http")
