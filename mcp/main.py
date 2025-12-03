from typing import Annotated
from fastmcp import FastMCP
from tkinter import simpledialog
import json
import os


mcp = FastMCP("Fate-Another-Pretender-MCP")


def load_skill_data(filename):
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(current_dir, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        return {}


CLASS_SKILLS_DATA = load_skill_data("class_skill_description.json")
PERSONAL_SKILLS_DATA = load_skill_data("personal_skill_description.json")


def get_skill_info(
        data,
        skill_name: str,
        skill_level: int
) -> str:
    target_skill = data.get(skill_name)

    if not target_skill:
        for key, value in data.items():
            if skill_name in value.get("label", ""):
                target_skill = value
                break

    if not target_skill:
        return f"未找到名为 '{skill_name}' 的技能。"

    label = target_skill.get("label", "未知技能")
    description = target_skill.get("description", "无描述")
    ranks = target_skill.get("ranks", [])

    if skill_level < 0:
        return f"技能 {label}: {description}\n - 错误: 等级 EX (-1) 的技能无等级相关描述，请检查从者档案中是否已经给出了描述。"

    if skill_level > 4:
        return f"技能 {label}: {description}\n - 错误：给定的等级 {skill_level} 不是 0-4 之间的整数 (0 = A, 4 = E)。"

    rank_chars = ["A", "B", "C", "D", "E"]

    rank_desc = ""
    for i in range(0, 5 - skill_level):
        rank_char = rank_chars[i]
        rank_info = ranks[i] if i < len(ranks) else ""
        rank_desc += f" - {rank_char} 级: {rank_info}\n"

    return f"技能 {label}: {description}\n{rank_desc.strip()}"


@mcp.tool(
    name = "human_in_the_loop",
    title = "人在回路系统",
    description = "人在回路系统。当遇到无法自行判断的状况时，可以调用此工具向用户提问并获取答案。\n" +
                  "每次请求此工具时，请确保问题简洁明了，可以被简短地回答。\n" +
                  "如果一个问题包含多个子问题，请尝试将其拆分。",
    annotations={"readOnlyHint": True, "openWorldHint": False}
)
def human_in_the_loop(
    question: Annotated[str, "要询问用户的问题"]
) -> str:
    return simpledialog.askstring("人在回路", question) or "用户未提供答案，请自行进行决策。"


@mcp.tool(
    name = "class_skill_description",
    title = "查询标准职阶技能的描述",
    description = "查询指定的职阶技能描述信息。描述中包含技能的一般效果，以及给定具体等级时的效果。\n" +
                  "除非另有说明，高等级的技能通常继承了低等级技能的效果。\n" +
                  "注意：如果从者档案中已经给出了某个技能的描述信息，请优先参考从者档案中的描述；尝试查询非标准的职阶技能（uniqueClassSkills）将不会得到正确结果。此外，查询等级为 EX (-1) 的技能也不会得到正确结果。",
    annotations={"readOnlyHint": True, "openWorldHint": False}
)
def class_skill_description(
    skill_id_or_name: Annotated[str, "职阶技能的 ID 或名称"],
    skill_level: Annotated[int, "技能等级，0-4 之间的整数，0 表示 A 级，4 表示 E 级"]
) -> str:
    return get_skill_info(CLASS_SKILLS_DATA, skill_id_or_name, skill_level)


@mcp.tool(
    name = "personal_skill_description",
    title = "查询标准保有技能的描述",
    description = "查询指定的保有技能描述信息。描述中包含技能的一般效果，以及给定具体等级时的效果。\n" +
                  "除非另有说明，高等级的技能通常继承了低等级技能的效果。\n" +
                  "注意：如果从者档案中已经给出了某个技能的描述信息，请优先参考从者档案中的描述；尝试查询非标准的保有技能（uniquePersonalSkills）将不会得到正确结果。此外，查询等级为 EX (-1) 的技能也不会得到正确结果。",
    annotations={"readOnlyHint": True, "openWorldHint": False}
)
def personal_skill_description(
    skill_id_or_name: Annotated[str, "保有技能的 ID 或名称"],
    skill_level: Annotated[int, "技能等级，0-4 之间的整数，0 表示 A 级，4 表示 E 级"]
) -> str:
    return get_skill_info(PERSONAL_SKILLS_DATA, skill_id_or_name, skill_level)


if __name__ == "__main__":
    mcp.run(transport="streamable-http")
